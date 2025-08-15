import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

/*
Todo: allow for spaces
*/
const formSchema = z.object({
  petName: z
    .string().trim()
    .min(1, {
      message: "Pet name must be at least 1 character.",
    })
});

const PetNameForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ petName: string }>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 my-8 p-2"
      >
        <FormField
          control={form.control}
          name="petName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Pet Name" {...field} className="max-w-[200px]" />
              </FormControl>
              <FormDescription>Enter your pet's name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer" 
        >
          Confirm my pet's name
        </Button>
      </form>
    </Form>
  );
};

export default PetNameForm;
