import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const OtherReferenceFormItem = () => {
  return (
    <FormField
      name="reference"
      render={({ field }) => (
        <FormItem className="w-full">
          <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
            How did you hear about us?
          </span>
          <FormControl>
            <Input
              placeholder="e.g. Google, LinkedIn, etc."
              {...field}
              className="w-full"
            />
          </FormControl>

          <FormMessage className="text-center" />
        </FormItem>
      )}
    />
  );
};

export default OtherReferenceFormItem;
