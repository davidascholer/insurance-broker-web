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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sendEmail } from "@/lib/api";
import type { ContactFormType } from "@/lib/types";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

const phoneRegex = /(^$)|(^\d{10}$)/; // 10 digits or empty

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z.email("Invalid email address"), // This validates the email format
  // validate
  phone: z.string().regex(phoneRegex, "Invalid phone number format").optional(),
  message: z
    .string()
    .min(2, "Message must be at least 2 characters long")
    .max(1000, "Message cannot exceed 1000 characters"),
});

const ContactForm = ({ type }: { type: "investor" | "partner" }) => {
  const [sentMsg, setSentMsg] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ) => {
    const contactFormData: ContactFormType = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || "",
      message: data.message,
      email: data.email,
      type: type,
    };
    const response = await sendEmail(contactFormData);
    setSentMsg(response.msg);
    if (response.success) form.reset();
  };

  useEffect(() => {
    if (sentMsg) {
      const timer = setTimeout(() => {
        setSentMsg("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sentMsg]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-0.5">
          <label className="text-(--primary-teal-dark)">Name (required)</label>
          <div className="flex flex-col min-[500px]:flex-row gap-4 w-full">
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-(--primary-teal-dark)">First Name</label>

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="border border-(--primary-teal-dark) p-2 rounded-lg h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-(--primary-teal-dark)">Last Name</label>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className="border border-(--primary-teal-dark) p-2 rounded-lg h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-(--primary-teal-dark)">Email (required)</label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="email@domain.com"
                    {...field}
                    className="border border-(--primary-teal-dark) p-2 rounded-lg h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-(--primary-teal-dark)">Number</label>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="10 digit phone number"
                    {...field}
                    className="border border-(--primary-teal-dark) p-2 rounded-lg h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label className="text-(--primary-teal-dark)">
            Message (required)
          </label>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder=""
                    className="border border-(--primary-teal-dark) p-2 rounded-lg"
                    rows={4}
                    required
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="bg-(--primary-teal-dark) text-white p-2 rounded-lg hover:bg-(--primary-teal-dark-transparent) transition-colors duration-300 cursor-pointer"
        >
          Send Message!
        </Button>
        <p className="w-full bold sansita-regular text-(--primary-teal-dark-transparent) text-center">
          {sentMsg}
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
