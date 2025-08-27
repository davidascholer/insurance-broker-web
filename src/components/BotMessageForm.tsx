import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CommentBox from "./CommentBox";

const formSchema = z.object({
  botMessage: z
    .string().trim()
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
  scrollRef,
  populatedText,
}: {
  onSubmit: SubmitHandler<{ botMessage: string }>;
  submitDisabled?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  populatedText?: string;
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
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
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
                <CommentBox
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="bg-(--light-pink) mt-auto nunito-sans pr-10 b-0 outline-color-green-200"
                  submitDisabled={submitDisabled}
                  populatedText={populatedText}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BotMessageForm;
