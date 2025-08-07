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
import { catBreeds } from "@/data/catBreeds";
import { dogBreeds } from "@/data/dogBreeds";

const BreedForm = ({
  onSubmit,
  animal,
}: {
  onSubmit: (breed: string) => void;
  animal: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [breed, setBreed] = useState<string>("");

  const breedList =
    animal === "cat" ? catBreeds : animal === "dog" ? dogBreeds : [];

  const handleSubmit = () => {
    onSubmit(breed);
  };

  return (
    <div className="flex flex-col py-4 gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between max-w-[200px]"
          >
            {breed ? breedList.find((b) => b === breed) : "Select breed..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search breeds..." className="h-9" />
            <CommandList>
              <CommandEmpty>No matching breed found.</CommandEmpty>
              <CommandGroup>
                {breedList.map((breedItem) => (
                  <CommandItem
                    key={breedItem}
                    value={breedItem}
                    onSelect={(currentBreed) => {
                      if (currentBreed === breed) {
                        setBreed("");
                      } else {
                        const selectedBreed = breedList.find(
                          (b) => b === currentBreed
                        );
                        if (selectedBreed) setBreed(selectedBreed);
                      }
                      setOpen(false);
                    }}
                  >
                    {breedItem}
                    <Check
                      className={cn(
                        "ml-auto",
                        breedItem === breed ? "opacity-100" : "opacity-0"
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
        className="cursor-pointer max-w-[200px]"
        onClick={handleSubmit}
        disabled={!breed}
      >
        Set Breed
      </Button>
    </div>
  );
};

export default BreedForm;
