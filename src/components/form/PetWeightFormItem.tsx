import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const PetWeightFormItem = ({
  weightSelected,
  setWeightSelected,
}: {
  weightSelected: number | undefined;
  setWeightSelected: (weight: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();

  return (
    <FormField
      control={form?.control}
      name="weight"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            What is your pet's weight?
          </span>
          <FormControl>
            {/* Hidden input keeps react-hook-form registration in sync */}
            <div className="flex flex-col gap-4 sansita-sans">
              <input type="hidden" {...field} value={weightSelected ?? ""} />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full hover:bg-(--light-pink)"
                  >
                    {weightSelected
                      ? `${weightSelected} lbs`
                      : "Select weight..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <Command>
                    <CommandInput
                      placeholder="Search weight..."
                      className="h-9"
                    />
                    <CommandList className="w-full">
                      <CommandEmpty>No matching weight found.</CommandEmpty>
                      <CommandGroup>
                        {Array.from({ length: 120 }).map((_, index) => {
                          const value = index + 1;
                          return (
                            <CommandItem
                              key={value}
                              value={value.toString()}
                              onSelect={(currentLabel) => {
                                const selected = parseInt(currentLabel, 10);
                                if (weightSelected !== selected) {
                                  setWeightSelected(selected);
                                  if (form?.setValue) {
                                    form.setValue("weight", selected, {
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
                              {value} lbs
                              <Check
                                className={cn(
                                  "ml-auto",
                                  weightSelected === value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          );
                        })}
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

export default PetWeightFormItem;
