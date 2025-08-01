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
  email: z.email("Invalid email address"), // This validates the email format
});

const EmailForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ email: string }>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full my-4 p-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email Address" {...field}/>
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
          Here ya go!
        </Button>
      </form>
    </Form>
  );
};

export default EmailForm;
