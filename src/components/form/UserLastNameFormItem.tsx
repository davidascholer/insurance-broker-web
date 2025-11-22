import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserLastNameFormItem = () => {
  return (
    <FormField
      name="lastName"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="Last Name" {...field} className="w-full" />
          </FormControl>
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your last name.
          </span>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserLastNameFormItem;
