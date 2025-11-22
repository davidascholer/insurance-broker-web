import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserEmailFormItem = () => {
  return (
    <FormField
      name="email"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="Email" {...field} className="w-full" />
          </FormControl>
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your email.
          </span>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserEmailFormItem;
