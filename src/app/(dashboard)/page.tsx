import { CollectionCard } from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadIcon from "@/components/icons/SadIcon";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeLoader />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense
        fallback={<div className="text-neutral-500">Loading...</div>}
      >
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMessage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  return (
    <div className="flex w-full mb-12">
      <div className="flex flex-col space-y-2">
        <span className="text-neutral-500 font-bold text-3xl">
          Welcome,
        </span>{" "}
        <h1 className="text-4xl font-bold dark:text-neutral-200">
          {user.firstName} {user.lastName}
        </h1>
      </div>
    </div>
  );
}

function WelcomeLoader() {
  return (
    <div className="flex w-full mb-12">
      <div className="text-4xl font-bold dark:text-neutral-200 flex flex-col space-y-2">
        <span className="text-neutral-500 text-3xl">Welcome,</span>
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
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
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
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 w-full mt-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
