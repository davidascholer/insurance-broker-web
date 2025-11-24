import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserFirstNameFormItem = ({
  setUserFirstNameSelected,
}: {
  setUserFirstNameSelected: (name: string) => void;
}) => {
  return (
    <FormField
      name="firstName"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your first name.
          </span>
          <FormControl>
            <Input
              placeholder="First Name"
              {...field}
              className="w-full"
              onChangeCapture={(e) => {
                setUserFirstNameSelected(e.currentTarget.value);
              }}
            />
          </FormControl>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserFirstNameFormItem;
