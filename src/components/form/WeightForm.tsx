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

const formSchema = z.object({
  weight: z.string().min(1, {
    message: "Pet weight must be at least 1 pound.",
  }),
});

const WeightForm = ({
  onSubmit,
  petName,
}: {
  onSubmit: SubmitHandler<{ weight: string }>;
  petName: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "",
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
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Weight"
                  {...field}
                  className="max-w-[100px]"
                  onChange={(e) => {
                    if (/[^0-9]/.test(e.target.value)) return;
                    if (e.target.value !== "" && Number(e.target.value) <= 0) return;
                    // const value = parseInt(e.target.value);
                    // console.log(
                    //   "tupeog e.target.value:",
                    //   typeof e.target.value
                    // );
                    // if (isNaN(value) || value < 1) {
                    //   field.onChange("");
                    //   return;
                    // }
                    // console.log("tupeog value", typeof value);
                    // console.log(" value", value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter your pet's weight (in pounds)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          {`Confirm ${petName}'s weight`}
        </Button>
      </form>
    </Form>
  );
};

export default WeightForm;
