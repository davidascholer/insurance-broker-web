import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

const PetAnimalFormItem = ({
  animalSelected,
  setAnimalSelected,
}: {
  animalSelected: "dog" | "cat" | undefined;
  setAnimalSelected: (animal: "dog" | "cat") => void;
}) => {
  const form = useFormContext();

  const handleSelect = (animal: "dog" | "cat") => {
    setAnimalSelected(animal);
    // Keep react-hook-form in sync whenever selection changes
    if (form?.setValue) {
      form.setValue("animal", animal, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <FormField
      control={form?.control}
      name="animal"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Is your pet a dog or a cat?
          </span>
          <FormControl>
            {/* Hidden input ensures the field is registered & participates in form submission */}
            <div className="flex gap-4 sansita-sans flex-row flex-wrap justify-start w-full">
              <Input type="hidden" {...field} value={animalSelected ?? ""} />

              <Button
                type="button"
                className={`cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 flex-1 ${
                  animalSelected === "cat" ? "opacity-60" : ""
                }`}
                onClick={() => handleSelect("dog")}
              >
                Dog
                <img
                  className="mr-2 contain size-8 p-1"
                  alt="Dog"
                  src="/icons/dog.svg"
                />
              </Button>
              <Button
                type="button"
                className={`cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 flex-1 ${
                  animalSelected === "dog" ? "opacity-60" : ""
                }`}
                onClick={() => handleSelect("cat")}
              >
                Cat
                <img
                  className="mr-2 contain size-7 p-1"
                  alt="Cat"
                  src="/icons/cat.svg"
                />
              </Button>
            </div>
          </FormControl>

          <FormMessage className="text-center w-full" />
        </FormItem>
      )}
    />
  );
};

export default PetAnimalFormItem;
