import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { dogBreeds } from "@/data/dogBreeds";
import clientCatBreeds from "@/data/catBreeds";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const PetBreedFormItem = ({
  animal,
  breedSelected,
  setBreedSelected,
}: {
  animal: "cat" | "dog" | undefined;
  breedSelected: string | undefined;
  setBreedSelected: (breed: string | undefined) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [breedList, setBreedList] = useState<string[]>([]);
  const form = useFormContext();

  useEffect(() => {
    if (animal === "cat") {
      setBreedList(clientCatBreeds);
      const breed = clientCatBreeds.find((b) => b === breedSelected);
      if (!breed) {
        setBreedSelected(undefined);
      }
    } else if (animal === "dog") {
      setBreedList(dogBreeds);
      const breed = dogBreeds.find((b) => b === breedSelected);
      if (!breed) {
        setBreedSelected(undefined);
      }
    } else {
      setBreedList([]);
      setBreedSelected(undefined);
    }
  }, [animal, breedSelected, setBreedSelected]);

  return (
    <FormField
      control={form?.control}
      name="breed"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            What breed is your pet?
          </span>
          <FormControl>
            <div className="flex flex-col gap-4 sansita-sans">
              {/* Hidden input registers the field with react-hook-form */}
              <input type="hidden" {...field} value={breedSelected ?? ""} />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={animal === undefined}
                    aria-expanded={open}
                    className="w-full hover:bg-(--light-pink)"
                  >
                    {breedSelected || "Select breed..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search breeds..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No matching breed found.</CommandEmpty>
                      <CommandGroup>
                        {breedList.map((breedItem) => (
                          <CommandItem
                            key={breedItem}
                            value={breedItem}
                            onSelect={(selected) => {
                              if (breedSelected !== selected) {
                                setBreedSelected(selected);
                                if (form?.setValue) {
                                  form.setValue("breed", selected, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  });
                                } else if (field?.onChange) {
                                  field.onChange(selected);
                                }
                              }
                              setOpen(false);
                            }}
                          >
                            {breedItem}
                            <Check
                              className={cn(
                                "ml-auto",
                                breedItem === breedSelected
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage className="text-center w-full" />
        </FormItem>
      )}
    />
  );
};

export default PetBreedFormItem;
