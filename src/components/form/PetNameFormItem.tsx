import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const PetNameFormItem = () => {
  return (
    <FormField
      // control={form.control}
      name="petName"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="Pet Name" {...field} className="w-full" />
          </FormControl>
          {/* <FormDescription>Enter your pet's name</FormDescription> */}
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark]">
            Please enter your pet's name
          </span>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PetNameFormItem;
