import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const OtherTermsFormItem = () => {
    const [formValid, setFormValid] = useState(false);
  
  return (
    <FormField
      // control={form.control}
      name="item"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-center gap-2">
            <FormControl>
              <Checkbox
                // checked={field.value?.includes(item.id)}
                defaultChecked={false}
                onCheckedChange={(checked) => {
                  setFormValid(!!checked);
                  return checked
                    ? field.onChange([...field.value, "terms"])
                    : field.onChange(
                        field.value?.filter((value) => value !== "terms")
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
