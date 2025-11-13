import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import type { FormSchemaType } from "../forms/sections/InfoFormPetInfo";

const PetNameFormItem = ({form}:{form: FormSchemaType}) => {

  return (
    <FormField
      // control={form.control}
      name="petName"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Pet Name"
              {...field}
              className="max-w-[200px]"
            />
          </FormControl>
          {/* <FormDescription>Enter your pet's name</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PetNameFormItem;
