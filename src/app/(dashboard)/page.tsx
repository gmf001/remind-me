import SadIcon from "@/components/icons/SadIcon";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeLoader />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMessage() {
  const user = await currentUser();
  await wait(500);

  if (!user) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold dark:text-neutral-200">
        <span className="dark:text-neutral-400 text-neutral-500 text-3xl">
          Welcome,
        </span>{" "}
        <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

function WelcomeLoader() {
  return (
    <div className="flex w-full mb-12">
      <div className="text-4xl font-bold dark:text-neutral-200 flex flex-col space-y-2">
        <span className="dark:text-neutral-400 text-neutral-500 text-3xl">
          Welcome,
        </span>
        <div className="flex space-x-2">
          <Skeleton className="w-[150px] h-[36px]" />
          <Skeleton className="w-[150px] h-[36px]" />
        </div>
      </div>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadIcon />
          <AlertTitle>You have no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollectionButton />
      </div>
    );
  }
}
