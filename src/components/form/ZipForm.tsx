"use client";

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
import { zips } from "@/lib/data";

const FormSchema = z.object({
  zip: z.string().regex(/^\d{5}$/, "Invalid 5-digit ZIP code."),
});

function ZipForm({ onSubmit }: { onSubmit: SubmitHandler<{ zip: string }> }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      zip: "",
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    const zipExists = zips.some((zipcode) => zipcode === data.zip);
    if (zipExists) {
      onSubmit(data);
      console.log("Zip exists:", data.zip);
      return;
    }
    // If zip does not exist, set a manual error
    form.setError("zip", {
      type: "manual",
      message: "That zip code is not a valid US zip code.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full my-4 p-2"
      >
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="5-digit zipcode" {...field} />
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
          Here's our stomping ground
        </Button>
      </form>
    </Form>
  );
}

export default ZipForm;
