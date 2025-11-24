import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const UserZipFormItem = ({
  setUserZipSelected,
}: {
  setUserZipSelected: (zip: string) => void;
}) => {
  return (
    <FormField
      name="zip"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            Please enter your ZIP code.
          </span>
          <FormControl>
            <Input
              placeholder="ZIP Code"
              {...field}
              className="w-full"
              onChangeCapture={(e) => {
                setUserZipSelected(e.currentTarget.value);
              }}
            />
          </FormControl>
          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default UserZipFormItem;
