import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserLastNameFormItem = ({
  setUserLastNameSelected,
}: {
  setUserLastNameSelected: (name: string) => void;
}) => {
  return (
    <FormField
      name="lastName"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your last name.
          </span>
          <FormControl>
            <Input
              placeholder="Last Name"
              {...field}
              className="w-full"
              onChangeCapture={(e) => {
                setUserLastNameSelected(e.currentTarget.value);
              }}
            />
          </FormControl>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserLastNameFormItem;
