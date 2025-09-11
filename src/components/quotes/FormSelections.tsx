import { useRef, useEffect } from "react";
import PetNameForm from "@/components/form/PetNameForm";
import AnimalForm from "@/components/form/AnimalForm";
import GenderForm from "@/components/form/GenderForm";
import type { AnswersType, NameType } from "@/lib/types";
import AgeForm from "@/components/form/AgeForm";
import BreedForm from "@/components/form/BreedForm";
import ReferenceForm from "@/components/form/ReferenceForm";
import FinishForm from "@/components/form/FinishForm";
import NameForm from "@/components/form/NameForm";
import EmailForm from "@/components/form/EmailForm";
import ZipForm from "@/components/form/ZipForm";
import WeightForm from "@/components/form/WeightForm";

const FormSelections = ({
  currentQuestion,
  answers,
  setAnswers,
  handleSubmit,
}: {
  currentQuestion: string;
  answers: AnswersType;
  setAnswers: React.Dispatch<React.SetStateAction<AnswersType>>;
  handleSubmit: () => void;
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the form
    optionsRef.current?.classList.remove("animate-fade-in");
    setTimeout(() => {
      optionsRef.current?.classList.add("animate-fade-in");
    }, 1000);
  }, [answers]);

  // Form handlers
  const handleNameSubmit = (data: NameType) => {
    setAnswers((prev) => ({
      ...prev,
      name: { firstName: data.firstName, lastName: data.lastName },
    }));
  };

  const handleEmailSubmit = (data: { email: string }) => {
    const updatedAnswers = { ...answers, email: data.email };
    setAnswers(updatedAnswers);
  };

  const handleZipSubmit = (data: { zip: string }) => {
    setAnswers((prev) => ({
      ...prev,
      zip: data.zip,
    }));
  };

  const handlePetNameSubmit = (data: { petName: string }) => {
    setAnswers((prev) => ({
      ...prev,
      petName: data.petName,
    }));
  };

  const handleAnimalSubmit = (animal: "cat" | "dog") => {
    setAnswers((prev) => ({
      ...prev,
      animal,
    }));
  };

  const handleGenderSubmit = (gender: "male" | "female") => {
    setAnswers((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleAgeSubmit = (age: AnswersType["age"]) => {
    setAnswers((prev) => ({
      ...prev,
      age,
    }));
  };

  const handleWeightSubmit = (data: { weight: string }) => {
    setAnswers((prev) => ({
      ...prev,
      weight: data.weight,
    }));
  };

  const handleBreedSubmit = (breed: AnswersType["breed"]) => {
    setAnswers((prev) => ({
      ...prev,
      breed,
    }));
  };

  const handleReferenceSubmit = (data: { referenceInput: string }) => {
    setAnswers((prev) => ({
      ...prev,
      reference: data.referenceInput,
    }));
  };

  const handleFinishSubmit = () => {
    handleSubmit();
  };

  return (
    <div ref={optionsRef} className="opacity-0">
      {currentQuestion === "name" && <NameForm onSubmit={handleNameSubmit} />}
      {currentQuestion === "email" && (
        <EmailForm onSubmit={handleEmailSubmit} />
      )}
      {currentQuestion === "zip" && <ZipForm onSubmit={handleZipSubmit} />}
      {currentQuestion === "petName" && (
        <PetNameForm onSubmit={handlePetNameSubmit} />
      )}
      {currentQuestion === "animal" && (
        <AnimalForm onSubmit={handleAnimalSubmit} />
      )}
      {currentQuestion === "gender" && (
        <GenderForm onSubmit={handleGenderSubmit} />
      )}
      {currentQuestion === "age" && <AgeForm onSubmit={handleAgeSubmit} />}
      {currentQuestion === "weight" && (
        <WeightForm onSubmit={handleWeightSubmit} petName={answers.petName} />
      )}
      {currentQuestion === "breed" && (
        <BreedForm onSubmit={handleBreedSubmit} animal={answers.animal} />
      )}
      {currentQuestion === "reference" && (
        <ReferenceForm onSubmit={handleReferenceSubmit} />
      )}
      {currentQuestion === "finish" && (
        <FinishForm onSubmit={handleFinishSubmit} />
      )}
    </div>
  );
};

export default FormSelections;
