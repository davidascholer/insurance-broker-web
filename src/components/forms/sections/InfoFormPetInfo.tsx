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
  const [animalSelected, setAnimalSelected] = useState<
    "dog" | "cat" | undefined
  >(undefined);
  const [genderSelected, setGenderSelected] = useState<
    "male" | "female" | undefined
  >(undefined);
  const [weightSelected, setWeightSelected] = useState<number | undefined>(
    undefined
  );
  const [ageSelected, setAgeSelected] = useState<number | undefined>(undefined);
  const [breedSelected, setBreedSelected] = useState<string | undefined>(
    undefined
  );
  const [petName, setPetName] = useState<string | undefined>(undefined);

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
            <div className="flex flex-row w-full flex-wrap justify-center items-center gap-8 bg-blue-200">
              <div className="flex-1 flex justify-center items-center">
                <PetAnimalFormItem
                  setAnimalSelected={setAnimalSelected}
                  animalSelected={animalSelected}
                />
              </div>
              <div className="flex-1 flex justify-center items-cente bg-purple-400">
                <PetGenderFormItem
                  genderSelected={genderSelected}
                  setGenderSelected={setGenderSelected}
                />
              </div>
            </div>
            <div className="flex flex-row w-full flex-wrap justify-evenly items-center gap-4">
              <div className="flex flex-col w-[200px] justify-start items-center max-w-sm">
                <PetWeightFormItem />
                <span className="nunito-sans-light text-sm text-[--primary-teal-dark]">
                  What is your pet's weight?
                </span>
              </div>
              <div className="flex flex-col w-[200px] justify-start items-center max-w-sm">
                <PetAgeFormItem />
                <span className="nunito-sans-light text-sm text-[--primary-teal-dark]">
                  What is your pet's age?
                </span>
              </div>
              <div className="flex flex-col w-[200px] justify-start items-center max-w-sm">
                <PetBreedFormItem
                  animal={animalSelected}
                  setBreedSelected={setBreedSelected}
                  breedSelected={breedSelected}
                />
                <span className="nunito-sans-light text-sm text-[--primary-teal-dark]">
                  What breed is your pet?
                </span>
              </div>
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
