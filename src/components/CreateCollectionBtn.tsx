"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSidebar from "./CreateCollectionSidebar";

function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 via-red-500 p-[1px]">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="dark:text-white w-full h-12 text-base dark:bg-neutral-950 dark:hover:bg-neutral-900 bg-white"
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Create Collection
        </span>
      </Button>
      <CreateCollectionSidebar
        open={open}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
}

export default CreateCollectionBtn;
