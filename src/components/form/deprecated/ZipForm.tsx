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
import { zips } from "@/data/zips";
import { useState } from "react";

const FormSchema = z.object({
  zip: z.string().regex(/^\d{5}$/, "Invalid 5-digit ZIP code."),
});

function ZipForm({ onSubmit }: { onSubmit: SubmitHandler<{ zip: string }> }) {
  const [formValid, setFormValid] = useState(true);
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
      return;
    }
    // If zip does not exist, set a manual error
    form.setError("zip", {
      type: "manual",
      message: "That zip code is not a valid US zip code.",
    });
  }

  function handlZipChange(value: string) {
    if (value.length !== 5) {
      form.clearErrors("zip");
      return;
    }
    const zipExists = zips.some((zipcode) => zipcode === value);
    if (!zipExists) {
      // If zip does not exist, set a manual error
      setFormValid(false);
      form.setError("zip", {
        type: "manual",
        message: "That zip code is not a valid US zip code.",
      });
    } else {
      setFormValid(true);
      form.clearErrors("zip");
    }
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
                <Input
                  placeholder="5-digit zipcode"
                  {...field}
                  className="max-w-[200px]"
                  onChange={(e) => {
                    // Only allow numeric input
                    if (/\D/.test(e.target.value)) return;
                    handlZipChange(String(e.target.value));
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={!form.formState.isValid || !formValid}
        >
          Here's our stomping ground
        </Button>
      </form>
    </Form>
  );
}

export default ZipForm;
