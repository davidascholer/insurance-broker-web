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
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  botMessage: z
    .string()
    .min(1, {
      message: "Message must be at least 1 character.",
    })

    .max(1000, {
      message: "Message must be at most 1000 characters.",
    }),
});

const BotMessageForm = ({
  onSubmit,
  submitDisabled = false,
}: {
  onSubmit: SubmitHandler<{ botMessage: string }>;
  submitDisabled?: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      botMessage: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col w-full gap-4"
      >
        <FormField
          control={form.control}
          name="botMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="bg-(--light-pink) mt-auto min-h-24 nunito-sans"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={submitDisabled}
          className="nunito-sans-bold cursor-pointer mx-auto bg-(--primary-teal-dark) hover:bg-(--primary-teal) text-(--light-pink) w-full"
        >
          Send!
        </Button>
      </form>
    </Form>
  );
};

export default BotMessageForm;
