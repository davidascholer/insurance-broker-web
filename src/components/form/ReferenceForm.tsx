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
                <Input placeholder="e.g. Google, LinkedIn, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="nunito-sans-medium bg-(--primary-teal) hover:bg-(--primary-teal-dark) cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 tracking-wide"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ReferenceForm;
