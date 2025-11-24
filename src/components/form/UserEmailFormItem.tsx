import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserEmailFormItem = ({
  setUserEmailSelected,
}: {
  setUserEmailSelected: (email: string) => void;
}) => {
  return (
    <FormField
      name="email"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your email.
          </span>
          <FormControl>
            <Input
              placeholder="Email"
              {...field}
              className="w-full"
              onChangeCapture={(e) => {
                setUserEmailSelected(e.currentTarget.value);
              }}
            />
          </FormControl>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserEmailFormItem;
