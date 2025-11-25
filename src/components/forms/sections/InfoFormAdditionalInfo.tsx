import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import type { AnswersType } from "@/lib/types";
import OtherReferenceFormItem from "@/components/form/OtherReferenceFormItem";
import OtherTermsFormItem from "@/components/form/OtherTermsFormItem";
import { CarouselCustomNextButton } from "@/components/ui/modified/carousel";
import { useEffect, useState } from "react";

const formSchema = z.object({
  reference: z.string().min(2, {
    message: "Please enter in at least 2 characters.",
  }),
  item: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please agree to the terms of service.",
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const InfoFormAdditionalInfo = ({
  onSubmit,
  answers,
  formValid,
}: {
  onSubmit: SubmitHandler<FormSchemaType>;
  answers: AnswersType;
  formValid: boolean;
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reference: answers.reference || "",
      item: [],
    },
  });
  const [referenceSelected, setReferenceSelected] = useState<string>(
    answers.reference || ""
  );
  const [termsSelected, setTermsSelected] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(formValid);

  useEffect(() => {
    // Check all of the answer to
    //  make sure every property has a value
    const currentValues = form.getValues();

    try {
      const parsedUser = formSchema.parse(currentValues);
      if (parsedUser) setIsValid(true);
      else setIsValid(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setIsValid(false);
      } else {
        throw error;
      }
    }
  }, [form, formValid, isValid, referenceSelected, termsSelected]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="h-auto flex-1 font-bold sansita-bold text-sm min-[500px]:text-lg sm:text-2xl text-(--text-dark)">
        {`Great! Just one last thing. How did you hear about us?`}
      </p>
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-8 mt-8 mb-2 w-full"
        >
          <div className="flex flex-col justify-evenly items-center gap-4 rounded-lg w-full">
            <div className="flex flex-col w-full justify-start items-center">
              <OtherReferenceFormItem
                setReferenceSelected={setReferenceSelected}
              />
            </div>
            <div className="flex flex-col w-full justify-start items-center">
              <OtherTermsFormItem setTermsSelected={setTermsSelected} />
            </div>
          </div>
          <div className="w-full text-center">
            <CarouselCustomNextButton
              type="submit"
              disabled={!isValid || !formValid || !termsSelected}
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data as FormSchemaType)
              )}
              className="cursor-pointer mx-auto w-full max-w-xl text-lg sansita-regular py-6 px-4"
            >
              Fetch my Quotes!
            </CarouselCustomNextButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormAdditionalInfo;
