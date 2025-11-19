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

const PetBreedFormItem = ({
  animal,
  setBreedSelected,
}: {
  animal: "cat" | "dog" | undefined;
  setBreedSelected: (breed: string | undefined) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [breed, setBreed] = useState<string | undefined>(undefined);
  const [breedList, setBreedList] = useState<string[]>([]);

  useEffect(() => {
    setBreed(undefined);
    if (animal === "cat") {
      setBreedList(clientCatBreeds);
    } else if (animal === "dog") {
      setBreedList(dogBreeds);
    } else {
      setBreedList([]);
    }
  }, [animal]);

  useEffect(() => {
    setBreedSelected(breed);
  }, [breed, setBreedSelected]);

  return (
    <div className="flex flex-col py-4 gap-4 sansita-sans">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={animal === undefined}
            aria-expanded={open}
            className="justify-between max-w-[200px]"
          >
            {breed || "Select breed..."}
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
                        setBreed(undefined);
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
    </div>
  );
};

export default PetBreedFormItem;
