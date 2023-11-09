import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  CollectionSchema,
  collectionValidator,
} from "@/schemas/createCollection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { CollectionColor, CollectionColors } from "@/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CreateCollectionSidebar({ onOpenChange, open }: Props) {
  const router = useRouter();

  const form = useForm<CollectionSchema>({
    resolver: zodResolver(collectionValidator),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const onSubmit = async (values: CollectionSchema) => {
    try {
      await createCollection(values);
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Collection created successfully.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const openChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChange}>
      <SheetContent className="dark:border-neutral-800 w-full">
        <SheetHeader>
          <SheetTitle>Add New Collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            className="py-4 space-y-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>

                  <Select
                    onValueChange={(color) => field.onChange(color)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "w-full text-white font-bold capitalize",
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-[335px] bg-white dark:bg-black">
                      {Object.keys(CollectionColors).map((color) => (
                        <SelectItem
                          key={color}
                          value={color}
                          className={cn(
                            "w-full rounded-md my-1 capitalize hover:cursor-pointer font-bold text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white",
                            CollectionColors[color as CollectionColor]
                          )}
                        >
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-1">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
            className={cn("font-semibold mt-2")}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateCollectionSidebar;
