import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const PetNameFormItem = ({
  setPetNameSelected,
}: {
  setPetNameSelected: (name: string) => void;
}) => {
  return (
    <FormField
      // control={form.control}
      name="petName"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your pet's name.
          </span>
          <FormControl>
            <Input
              placeholder="Pet Name"
              {...field}
              className="w-full"
              onChangeCapture={(e) => {
                setPetNameSelected(e.currentTarget.value);
              }}
            />
          </FormControl>
          {/* <FormDescription>Enter your pet's name</FormDescription> */}
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default PetNameFormItem;
