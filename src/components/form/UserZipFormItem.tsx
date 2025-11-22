import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserZipFormItem = () => {
  return (
    <FormField
      name="zip"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="ZIP Code" {...field} className="w-full" />
          </FormControl>
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your ZIP code.
          </span>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserZipFormItem;
