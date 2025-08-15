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
  firstName: z
    .string()
    .min(1, {
      message: "First name must be at least 1 character.",
    })
    .regex(/^[a-zA-Z ]+$/, {
      message: "String must contain only letters.",
    })
    .max(30, {
      message: "First name must be at most 30 characters.",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "Last name must be at least 1 character.",
    })
    .regex(/^[a-zA-Z ]+$/, {
      message: "String must contain only letters.",
    })
    .max(30, {
      message: "Last name must be at most 30 characters.",
    }),
});

const NameForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ firstName: string; lastName: string }>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} className="max-w-[200px]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last Name" {...field} className="max-w-[200px]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer" 
        >
          Let's begin!
        </Button>
      </form>
    </Form>
  );
};

export default NameForm;
