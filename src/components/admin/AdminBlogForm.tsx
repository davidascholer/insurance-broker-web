"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
//   FormControl,
  FormField,
  FormItem,
//   FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Link } from "react-router-dom";
import { useState } from "react";

const item = {
  id: "terms",
};

const FormSchema = z.object({
  item: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please agree to the terms of service.",
  }),
});

function AdminBlogForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ item: string[] }>;
}) {
  const [formValid] = useState(false);
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
                render={() => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center gap-2"
                    >Not implemented. In progress...</FormItem>
                  );
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !form.formState.isValid || form.formState.isSubmitting || !formValid
          }
          className="cursor-pointer"
        >
          Save Blog
        </Button>
      </form>
    </Form>
  );
}

export default AdminBlogForm;
