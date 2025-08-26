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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  token: z
    .string()
    .trim()
    .min(6, {
      message: "Token must be at least 6 characters.",
    })
    .max(100, {
      message: "Token must be at most 100 characters.",
    }),
});

const AdminTokenForm = ({
  onSubmit,
  className,
}: {
  onSubmit: SubmitHandler<{ token: string }>;
  className?: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6 w-full my-4 p-2", className)}
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Token"
                  {...field}
                  className="max-w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={!form.formState.isValid}
        >
          Set Token
        </Button>
      </form>
    </Form>
  );
};

export default AdminTokenForm;
