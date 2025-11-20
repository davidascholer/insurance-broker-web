import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserFirstNameFormItem = () => {
  return (
    <FormField
      name="firstName"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="First Name" {...field} className="w-full" />
          </FormControl>
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-center">
            Please enter your first name.
          </span>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserFirstNameFormItem;
