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
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { petAges } from "@/data/petAges";
import { useFormContext } from "react-hook-form";
import type { AgeType } from "@/lib/types";

const PetAgeFormItem = ({
  ageSelected,
  setAgeSelected,
}: {
  ageSelected: AgeType | undefined;
  setAgeSelected: (age: AgeType | undefined) => void;
}) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form?.control}
      name="age"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            What is your pet's age?
          </span>
          <FormControl>
            {/* Hidden input keeps react-hook-form registration in sync */}
            <div className="flex flex-col gap-4 sansita-sans">
              <input
                type="hidden"
                {...field}
                value={ageSelected?.toString() ?? ""}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full hover:bg-(--light-pink)"
                  >
                    {ageSelected?.label
                      ? petAges.find((age) => age.label === ageSelected.label)
                          ?.label
                      : "Select age..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search ages..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No matching age found.</CommandEmpty>
                      <CommandGroup>
                        {petAges.map((age) => (
                          <CommandItem
                            key={age.label}
                            value={age.label}
                            onSelect={(currentLabel) => {
                              const selectedAge = petAges.find(
                                (a) => a.label === currentLabel
                              );
                              console.log("Selected age :", selectedAge);
                              if (selectedAge) {
                                setAgeSelected(selectedAge);
                                if (form?.setValue) {
                                  form.setValue("age", selectedAge, {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  });
                                } else if (field?.onChange) {
                                  field.onChange(selectedAge);
                                }
                              }
                              setOpen(false);
                            }}
                          >
                            {age.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                ageSelected?.label === age.label
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

export default PetAgeFormItem;
