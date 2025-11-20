import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import { TypewriterEffect } from "../../ui/TypewriterEffect";
// import { formatArray } from "@/lib/utils";
import type { AnswersType } from "@/lib/types";
import UserFirstNameFormItem from "@/components/form/UserFirstNameFormItem";
import UserLastNameFormItem from "@/components/form/UserLastNameFormItem";
import UserEmailFormItem from "@/components/form/UserEmailFormItem";
import UserZipFormItem from "@/components/form/UserZipFormItem";
import { useEffect, useState } from "react";

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
  email: z.email("Invalid email address"),
  zip: z.string().regex(/^\d{5}$/, "Invalid 5-digit ZIP code."),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const InfoFormUserInfo = ({
  onSubmit,
  answers,
}: {
  onSubmit: SubmitHandler<FormSchemaType>;
  answers: AnswersType;
}) => {
  const [formValid, setFormValid] = useState<boolean>(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: answers.name?.firstName || "",
      lastName: answers.name?.lastName || "",
      email: answers.email || "",
      zip: answers.zip || "",
    },
  });

  useEffect(() => {
    // Check all of the answer to make sure every property has a value
    let valid = true;
    if (
      !answers.name ||
      answers.name.firstName === "" ||
      !answers.name ||
      answers.name.lastName === "" ||
      !answers.email ||
      answers.email === "" ||
      !answers.zip ||
      answers.zip === ""
    )
      valid = false;
    setFormValid(valid);
  }, [answers]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="h-auto flex-1 font-bold sansita-bold text-sm min-[500px]:text-lg sm:text-2xl text-(--text-dark)">
        {`Perfect. Now, let's get to know you a bit better.`}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 mb-2 w-full"
        >
          <div className="flex flex-col justify-evenly items-center gap-4 rounded-lg w-full mt-12">
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <UserFirstNameFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <UserLastNameFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <UserEmailFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <UserZipFormItem />
            </div>
          </div>
          <div className="w-full text-center">
            <Button
              type="submit"
              disabled={false}
              className="cursor-pointer mx-auto w-full max-w-xl"
            >
              Save Your Information
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormUserInfo;
