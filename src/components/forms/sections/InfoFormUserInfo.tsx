import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import type { AnswersType } from "@/lib/types";
import UserFirstNameFormItem from "@/components/form/UserFirstNameFormItem";
import UserLastNameFormItem from "@/components/form/UserLastNameFormItem";
import UserEmailFormItem from "@/components/form/UserEmailFormItem";
import UserZipFormItem from "@/components/form/UserZipFormItem";
import { useEffect } from "react";

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
  submitButton,
  setUserFormValid,
}: {
  onSubmit: SubmitHandler<FormSchemaType>;
  answers: AnswersType;
  submitButton?: React.ReactNode;
  setUserFormValid: (valid: boolean) => void;
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: answers.name?.firstName || "",
      lastName: answers.name?.lastName || "",
      email: answers.email || "",
      zip: answers.zip || "",
    },
  });

  const currentValues = form.getValues();
  useEffect(() => {
    try {
      const parsedUser = formSchema.parse(currentValues);
      if (parsedUser) setUserFormValid(true);
      else setUserFormValid(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUserFormValid(false);
      } else {
        throw error;
      }
    }
  }, [currentValues, setUserFormValid]);

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
            <div className="flex flex-col w-full justify-start items-center">
              <UserFirstNameFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <UserLastNameFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <UserEmailFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <UserZipFormItem />
            </div>
          </div>
          <div className="w-full text-center">{submitButton}</div>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormUserInfo;
