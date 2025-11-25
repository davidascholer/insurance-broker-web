import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";

const OtherTermsFormItem = ({
  setTermsSelected,
}: {
  setTermsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <FormField
      // control={form.control}
      name="item"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-center w-full justify-start gap-2">
            <FormControl>
              <Checkbox
                // checked={field.value?.includes(item.id)}
                defaultChecked={false}
                onCheckedChange={(checked) => {
                  setTermsSelected(!!checked);
                  return checked
                    ? field.onChange([...field.value, "terms"])
                    : field.onChange(
                        field.value?.filter(
                          (value: string) => value !== "terms"
                        )
                      );
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal">
              <span>
                Agree to the{" "}
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-(--primary-coral) font-semibold"
                >
                  terms of service
                </Link>
              </span>
            </FormLabel>
          </FormItem>
        );
      }}
    />
  );
};

export default OtherTermsFormItem;
