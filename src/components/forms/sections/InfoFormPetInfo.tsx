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
  weight: z.number().min(1, {
    message: "Please select a weight.",
  }),
  age: z.number().min(1, {
    message: "Please select an age.",
  }),
  breed: z.string().trim().min(1, {
    message: "Please enter a breed.",
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const InfoFormPetInfo = ({
  onSubmit,
  answers,
}: {
  onSubmit: SubmitHandler<{ petName: string }>;
  answers: AnswersType;
}) => {
  const [animalSelected, setAnimalSelected] = useState<"dog" | "cat" | null>(
    null
  );
  const [genderSelected, setGenderSelected] = useState<
    "male" | "female" | null
  >(null);
  const [weightSelected, setWeightSelected] = useState<number | null>(null);
  const [ageSelected, setAgeSelected] = useState<number | null>(null);
  const [breedSelected, setBreedSelected] = useState<string | null>(null);
  const [petName, setPetName] = useState<string | null>(null);

  useEffect(() => {
    console.log("Current Answers:", answers);
    console.log("Animal Selected:", animalSelected);
    console.log("Gender Selected:", genderSelected);
    console.log("Weight Selected:", weightSelected);
    console.log("Age Selected:", ageSelected);
    console.log("Breed Selected:", breedSelected);
    console.log("Pet Name:", petName);
  }, [
    answers,
    animalSelected,
    genderSelected,
    weightSelected,
    ageSelected,
    breedSelected,
    petName,
  ]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: petName || "",
      animal: animalSelected as "dog" | "cat",
      gender: genderSelected as "male" | "female",
      weight: weightSelected ?? undefined,
      age: ageSelected ?? undefined,
      breed: breedSelected ?? undefined,
    },
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mt-4 w-full flex flex-col gap-8 items-center justify-center">
        <p className="h-auto flex-1 font-bold min-h-[130px] min-[610px]:min-h-[100px] sansita-bold text-xl sm:text-2xl text-(--text-dark)">
          {`Hi! Thank you for trusting PIPA Broker to help find the right pet insurance policy for you and your furry family member. Let’s get started...`}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 my-8 p-2 w-full"
        >
          <div className="flex flex-col justify-center items-center gap-4 p-4 rounded-lg w-full bg-green-200">
            <div className="flex flex-row w-full flex-wrap justify-start items-center gap-16">
              <PetNameFormItem form={form.getValues()} />
            </div>
            <div className="flex flex-row w-full flex-wrap justify-start items-center gap-16">
              <PetAnimalFormItem setAnimalSelected={setAnimalSelected} />
              <PetGenderFormItem setGenderSelected={setGenderSelected} />
            </div>
            <div className="flex flex-row w-full flex-wrap justify-start items-center gap-16">
              <PetWeightFormItem />
              <PetAgeFormItem />
              <PetBreedFormItem animal={animalSelected} />
            </div>
          </div>
          <div className="w-full text-center">
            <Button
              type="submit"
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
