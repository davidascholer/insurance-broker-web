import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import type { AnswersType } from "@/lib/types";
import UserFirstNameFormItem from "@/components/form/UserFirstNameFormItem";
import UserLastNameFormItem from "@/components/form/UserLastNameFormItem";
import UserEmailFormItem from "@/components/form/UserEmailFormItem";
import UserZipFormItem from "@/components/form/UserZipFormItem";
import { useEffect, useState } from "react";
import { CarouselCustomNextButton } from "@/components/ui/modified/carousel";
import OtherReferenceFormItem from "@/components/form/OtherReferenceFormItem";
import { Link } from "react-router-dom";

const MESSAGE = "Fetch my Quotes!";

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
  reference: z.optional(z.string()),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const InfoFormUserInfo = ({
  onSubmit,
  answers,
  setUserFormValid,
  isValid = true,
}: {
  onSubmit: SubmitHandler<FormSchemaType>;
  isValid?: boolean;
  answers: AnswersType;
  setUserFormValid: (valid: boolean) => void;
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: answers.name?.firstName || "",
      lastName: answers.name?.lastName || "",
      email: answers.email || "",
      zip: answers.zip || "",
      reference: answers.reference || "",
    },
  });

  const [firstNameSelected, setUserFirstNameSelected] = useState<string>(
    answers.name?.firstName || ""
  );
  const [lastNameSelected, setUserLastNameSelected] = useState<string>(
    answers.name?.lastName || ""
  );
  const [emailSelected, setUserEmailSelected] = useState<string>(
    answers.email || ""
  );
  const [zipSelected, setUserZipSelected] = useState<string>(answers.zip || "");

  useEffect(() => {
    // Check all of the answer to make sure every property has a value
    const currentValues = form.getValues();

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
  }, [
    form,
    setUserFormValid,
    firstNameSelected,
    lastNameSelected,
    emailSelected,
    zipSelected,
  ]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="h-auto flex-1 font-bold sansita-bold text-sm min-[500px]:text-lg sm:text-2xl text-(--text-dark)">
        {`Perfect. Now, let's get to know you a bit better.`}
      </p>
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-8 mb-2 w-full"
        >
          <div className="flex flex-col justify-evenly items-center gap-4 rounded-lg w-full mt-12">
            <div className="flex flex-col w-full justify-start items-center">
              <UserFirstNameFormItem
                setUserFirstNameSelected={setUserFirstNameSelected}
              />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <UserLastNameFormItem
                setUserLastNameSelected={setUserLastNameSelected}
              />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <UserEmailFormItem setUserEmailSelected={setUserEmailSelected} />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <UserZipFormItem setUserZipSelected={setUserZipSelected} />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <OtherReferenceFormItem />
            </div>
          </div>
          <div className="w-full text-center">
            <CarouselCustomNextButton
              type="submit"
              disabled={!isValid}
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data as FormSchemaType)
              )}
              className="cursor-pointer mx-auto w-full max-w-xl text-lg sansita-regular py-6 px-4"
            >
              {MESSAGE}
            </CarouselCustomNextButton>
          </div>
          <span>
            By clicking "{MESSAGE}" you agree to our{" "}
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-(--primary-coral) font-semibold"
            >
              Terms Of Service
            </Link>
            {" "}and{" "}
            <Link
              to="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-(--primary-coral) font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormUserInfo;
