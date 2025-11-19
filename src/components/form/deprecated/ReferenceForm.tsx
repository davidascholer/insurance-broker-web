import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  referenceInput: z.string().min(2, {
    message: "Please enter in at least 2 characters.",
  }),
});

const ReferenceForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ referenceInput: string }>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referenceInput: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full my-8 p-2"
      >
        <FormField
          control={form.control}
          name="referenceInput"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="e.g. Google, LinkedIn, etc." {...field} className="max-w-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ReferenceForm;
