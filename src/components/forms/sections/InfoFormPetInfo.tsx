import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import { TypewriterEffect } from "../../ui/TypewriterEffect";
// import { formatArray } from "@/lib/utils";
import PetNameFormItem from "../../form/PetNameFormItem";
import PetAgeFormItem from "../../form/PetAgeFormItem";
import type { AnswersType } from "@/lib/types";
import { useEffect, useState } from "react";
import PetBreedFormItem from "../../form/PetBreedFormItem";
import PetAnimalFormItem from "../../form/PetAnimalFormItem";
import PetGenderFormItem from "../../form/PetGenderFormItem";
import PetWeightFormItem from "../../form/PetWeightFormItem";

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
  age: z
    .number({
      error: "Please select an age.",
    })
    .min(1, {
      message: "Please select an age.",
    }),
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
}: {
  onSubmit: SubmitHandler<FormSchemaType>;
  answers: AnswersType;
}) => {
  const [animalSelected, setAnimalSelected] = useState<
    "dog" | "cat" | undefined
  >(answers.animal || undefined);
  const [genderSelected, setGenderSelected] = useState<
    "male" | "female" | undefined
  >(answers.gender || undefined);
  const [weightSelected, setWeightSelected] = useState<number | undefined>(
    answers.weight ? Number(answers.weight) : undefined
  );
  const [ageSelected, setAgeSelected] = useState<number | undefined>(
    answers.age ? Number(answers.age) : undefined
  );
  const [breedSelected, setBreedSelected] = useState<string | undefined>(
    answers.breed || undefined
  );
  const [formValid, setFormValid] = useState<boolean>(false);

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
    let valid = true;
    if (
      !answers.petName ||
      answers.petName === "" ||
      !answers.animal ||
      !answers.gender ||
      !answers.age ||
      answers.age.value === 0 ||
      !answers.weight ||
      answers.weight === "" ||
      !answers.breed ||
      answers.breed === ""
    )
      valid = false;
    setFormValid(valid);
  }, [answers]);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="h-auto flex-1 font-bold sansita-bold text-sm min-[500px]:text-lg sm:text-2xl text-(--text-dark)">
        {`Hi! Thank you for trusting PIPA Broker to help find the right pet insurance policy for you and your furry family member. Let’s get started...`}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 mb-2 w-full"
        >
          <div className="flex flex-col justify-evenly items-center gap-12 rounded-lg w-full mt-12">
            <div className="flex flex-col w-full justify-start items-center max-w-sm">
              <PetNameFormItem />
            </div>
            <div className="flex flex-row w-full flex-wrap justify-center items-center gap-8">
              <div className="flex-1 flex justify-center items-center min-w-[150px]">
                <PetAnimalFormItem
                  setAnimalSelected={setAnimalSelected}
                  animalSelected={animalSelected}
                />
              </div>
              <div className="flex-1 flex justify-center items-center min-w-[150px]">
                <PetGenderFormItem
                  genderSelected={genderSelected}
                  setGenderSelected={setGenderSelected}
                />
              </div>
            </div>
            <div className="flex flex-row w-full flex-wrap justify-evenly items-center gap-4">
              <div className="flex flex-col w-[200px] justify-start items-center max-w-sm">
                <PetWeightFormItem
                  weightSelected={weightSelected}
                  setWeightSelected={setWeightSelected}
                />
              </div>
              <div className="flex flex-col w-[200px] justify-start items-center max-w-sm">
                <PetAgeFormItem
                  ageSelected={ageSelected}
                  setAgeSelected={setAgeSelected}
                />
              </div>
              <div className="flex flex-col w-[200px] justify-start items-center max-w-sm">
                <PetBreedFormItem
                  animal={animalSelected}
                  setBreedSelected={setBreedSelected}
                  breedSelected={breedSelected}
                />
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <Button
              type="submit"
              disabled={false}
              className="cursor-pointer mx-auto w-full max-w-xl"
            >
              Save Pet Information
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InfoFormPetInfo;
