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
import { useState } from "react";

const PetWeightFormItem = () => {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState(0);

  return (
    <div className="flex flex-col py-4 gap-4 sansita-sans">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="max-w-[200px] justify-between"
          >
            Select weight...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search weight..." className="h-9" />
            <CommandList>
              <CommandEmpty>No matching weight found.</CommandEmpty>
              <CommandGroup>
                {Array.from({ length: 120 }).map((_, index) => (
                  <CommandItem
                    key={index + 1}
                    value={(index + 1).toString()}
                    onSelect={(currentLabel) => {
                      if (currentLabel === weight.toString()) {
                        setWeight(0);
                      } else {
                        setWeight(parseInt(currentLabel, 10));
                      }
                      setOpen(false);
                    }}
                  >
                    {index + 1} lbs
                    <Check
                      className={cn(
                        "ml-auto",
                        weight === index + 1 ? "opacity-100" : "opacity-0"
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
  );
};

export default PetWeightFormItem;
