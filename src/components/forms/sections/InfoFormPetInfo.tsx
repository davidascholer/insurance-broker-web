import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
// import { TypewriterEffect } from "../../ui/TypewriterEffect";
// import { formatArray } from "@/lib/utils";
import PetNameFormItem from "../../form/PetNameFormItem";
import PetAgeFormItem from "../../form/PetAgeFormItem";
import type { AgeType, AnswersType } from "@/lib/types";
import { useEffect, useState } from "react";
import PetBreedFormItem from "../../form/PetBreedFormItem";
import PetAnimalFormItem from "../../form/PetAnimalFormItem";
import PetGenderFormItem from "../../form/PetGenderFormItem";
import PetWeightFormItem from "../../form/PetWeightFormItem";

const ageSchema = z.object({
  label: z.string().trim().min(1, {
    message: "Please select an age.",
  }),
  value: z
    .number({
      error: "Please select an age.",
    })
    .min(1, {
      message: "Please select an age.",
    }),
});

const formSchema = z.object({
  petName: z.string().trim().min(1, {
    message: "Pet name must be at least 1 character.",
  }),
  animal: z.enum(["dog", "cat"] as const, {
    message: "Please select an animal type.",
  }),
  gender: z.enum(["male", "female"] as const, {
    message: "Please select a gender.",
  }),
  weight: z
    .number({
      error: "Please select a weight.",
    })
    .min(1, {
      message: "Please select a weight.",
    }),
  age: ageSchema,
  breed: z
    .string({
      error: "Please select a breed.",
    })
    .trim()
    .min(1, {
      message: "Please enter a breed.",
    }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const InfoFormPetInfo = ({
  onSubmit,
  answers,
  submitButton,
  setPetFormValid,
}: {
  onSubmit: SubmitHandler<FormSchemaType>;
  answers: AnswersType;
  submitButton: React.ReactNode;
  setPetFormValid: (valid: boolean) => void;
}) => {
  const [petNameSelected, setPetNameSelected] = useState<string>(
    answers.petName || ""
  );
  const [animalSelected, setAnimalSelected] = useState<
    "dog" | "cat" | undefined
  >(answers.animal || undefined);
  const [genderSelected, setGenderSelected] = useState<
    "male" | "female" | undefined
  >(answers.gender || undefined);
  const [weightSelected, setWeightSelected] = useState<number | undefined>(
    answers.weight ? Number(answers.weight) : undefined
  );
  const [ageSelected, setAgeSelected] = useState<AgeType | undefined>(
    answers.age ? answers.age : undefined
  );
  const [breedSelected, setBreedSelected] = useState<string | undefined>(
    answers.breed || undefined
  );

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: answers.petName || "",
      animal: animalSelected as "dog" | "cat",
      gender: genderSelected as "male" | "female",
      weight: weightSelected ?? undefined,
      age: ageSelected ?? undefined,
      breed: breedSelected ?? undefined,
    },
  });

  useEffect(() => {
    // Check all of the answer to make sure every property has a value
    const currentValues = form.getValues();

    try {
      const parsedUser = formSchema.parse(currentValues);
      if (parsedUser) setPetFormValid(true);
      else setPetFormValid(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPetFormValid(false);
      } else {
        throw error;
      }
    }
  }, [
    form,
    setPetFormValid,
    petNameSelected,
    animalSelected,
    genderSelected,
    weightSelected,
    ageSelected,
    breedSelected,
  ]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="h-auto flex-1 font-bold sansita-bold text-sm min-[500px]:text-lg sm:text-2xl text-(--text-dark)">
        {`Hi! Thank you for trusting PIPA Broker to help find the right pet insurance policy for you and your furry family member. Let’s get started...`}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mb-2 w-full"
        >
          <div className="flex flex-row flex-wrap justify-start items-center gap-12 rounded-lg w-full mt-12">
            <div className="flex flex-col w-full justify-start items-center">
              <PetNameFormItem setPetNameSelected={setPetNameSelected} />
            </div>
            <div className="w-full">
              <PetAnimalFormItem
                setAnimalSelected={setAnimalSelected}
                animalSelected={animalSelected}
              />
            </div>
            <div className="w-full">
              <PetGenderFormItem
                genderSelected={genderSelected}
                setGenderSelected={setGenderSelected}
              />
            </div>
            <div className="w-full">
              <PetWeightFormItem
                weightSelected={weightSelected}
                setWeightSelected={setWeightSelected}
              />
            </div>
            <div className="w-full">
              <PetAgeFormItem
                ageSelected={ageSelected}
                setAgeSelected={setAgeSelected}
              />
            </div>
            <div className="w-full">
              <PetBreedFormItem
                animal={animalSelected}
                setBreedSelected={setBreedSelected}
                breedSelected={breedSelected}
              />
            </div>
          </div>
          <div className="w-full text-center mt-12">{submitButton}</div>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormPetInfo;
