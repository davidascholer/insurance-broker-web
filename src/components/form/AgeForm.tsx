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
import { ageList } from "@/lib/data";

const AgeForm = ({ onSubmit }: { onSubmit: Function }) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({ value: 0, label: "" });

  const handleSubmit = () => {
    onSubmit(item);
  };

  return (
    <div className="flex flex-col py-4 gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="max-w-[200px] justify-between"
          >
            {item.label
              ? ageList.find((age) => age.label === item.label)?.label
              : "Select age..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search ages..." className="h-9" />
            <CommandList>
              <CommandEmpty>No matching age found.</CommandEmpty>
              <CommandGroup>
                {ageList.map((age) => (
                  <CommandItem
                    key={age.label}
                    value={age.label}
                    onSelect={(currentLabel) => {
                      if (currentLabel === item.label) {
                        setItem({ value: 0, label: "" });
                      } else {
                        const selectedAge = ageList.find((a) => a.label === currentLabel);
                        if (selectedAge) setItem(selectedAge);
                      }
                      setOpen(false);
                    }}
                  >
                    {age.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        item.label === age.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="cursor-pointer w-[200px]"
        onClick={handleSubmit}
        disabled={!item.label}
      >
        Set Age
      </Button>
    </div>
  );
};

export default AgeForm;
