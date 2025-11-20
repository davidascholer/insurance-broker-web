import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { AnswersType } from "@/lib/types";
import OtherReferenceFormItem from "@/components/form/OtherReferenceFormItem";
import OtherTermsFormItem from "@/components/form/OtherTermsFormItem";

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

  return (
    <div className="flex flex-col items-center w-full">
      <p className="h-auto flex-1 font-bold sansita-bold text-sm min-[500px]:text-lg sm:text-2xl text-(--text-dark)">
        {`Great! Just one last thing. How did you hear about us?`}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 mb-2 w-full"
        >
          <div className="flex flex-col justify-evenly items-center gap-4 rounded-lg w-full mt-12">
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <OtherReferenceFormItem />
            </div>
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <OtherTermsFormItem />
            </div>
          </div>
          <div className="w-full text-center">
            <Button
              type="submit"
              disabled={!formValid}
              className="cursor-pointer mx-auto w-full max-w-xl"
            >
              Fetch my quotes!
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormAdditionalInfo;
