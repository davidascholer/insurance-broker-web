import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

const PetGenderFormItem = ({
  genderSelected,
  setGenderSelected,
}: {
  genderSelected: "male" | "female" | undefined;
  setGenderSelected: (gender: "male" | "female") => void;
}) => {
  const form = useFormContext();

  const handleSelect = (gender: "male" | "female") => {
    setGenderSelected(gender);
    // Keep react-hook-form in sync whenever selection changes
    if (form?.setValue) {
      form.setValue("gender", gender, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <FormField
      control={form?.control}
      name="gender"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            {/* Hidden input ensures the field is registered & participates in form submission */}
            <div className="flex py-4 gap-4 sansita-sans">
              <Input type="hidden" {...field} value={genderSelected ?? ""} />
              <Button
                type="button"
                className={`cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 ${
                  genderSelected === "female" ? "opacity-60" : ""
                }`}
                onClick={() => handleSelect("male")}
              >
                Male
              </Button>
              <Button
                type="button"
                className={`cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 ${
                  genderSelected === "male" ? "opacity-60" : ""
                }`}
                onClick={() => handleSelect("female")}
              >
                Female
              </Button>
            </div>
          </FormControl>
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark]">
            What gender is your pet?
          </span>
          <FormMessage className="text-start w-full" />
        </FormItem>
      )}
    />
  );
};

export default PetGenderFormItem;
