"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";

const item = {
  id: "terms",
};

const FormSchema = z.object({
  item: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please agree to the terms and conditions.",
  }),
});

function FinishForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ item: string[] }>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      item: ["terms"],
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="item"
          render={() => (
            <FormItem>
              <div className="mb-4"></div>
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center gap-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        <span>
                          Agree to the{" "}
                          <Link
                            to="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer text-(--primary-coral) font-semibold"
                          >
                            terms of service
                          </Link>
                        </span>
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="cursor-pointer"
        >
          Fetch my quotes!
        </Button>
      </form>
    </Form>
  );
}

export default FinishForm;
