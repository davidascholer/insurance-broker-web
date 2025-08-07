import { useState, useEffect } from "react";
import EditIcon from "@/components/icons/EditIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import Questions from "./Questions";
import FormSelections from "./FormSelections";

import { findCurrentQuestionProperty } from "@/lib/utils";
import type { AnswersType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import AppDialog from "@/components/AppDialog";
import ProgressGrid from "@/components/ProgressGrid";
import { useNavigate } from "react-router-dom";

const defaultAnswers: AnswersType = {
  name: { firstName: "", lastName: "" },
  email: "",
  zip: "",
  petName: "",
  animal: "",
  gender: "",
  age: { value: 0, label: "" },
  weight: "",
  breed: "",
  reference: "",
};

const resetDialogConfig = {
  title: "Start new quote?",
  description:
    "Clicking yes will require you to re-answer all of the questions.",
  confirmText: "Yes, start new quote.",
  onConfirmSubmit: () => {},
};

const editDialogConfig = {
  title: "Edit answers?",
  description:
    "Clicking yes will require you to re-answer all questions that follow it.",
  confirmText: "Yes, edit answers",
  onConfirmSubmit: () => {},
};

const InfoForm = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("pipa-quote");
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers) as AnswersType;
      return parsedAnswers;
    } else {
      return defaultAnswers;
    }
  });
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    findCurrentQuestionProperty(answers)
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogConfig, setDialogConfig] = useState<{
    title: string;
    description: string;
    confirmText: string;
    onConfirmSubmit: () => void;
  }>(resetDialogConfig);

  useEffect(() => {
    const currentQ = findCurrentQuestionProperty(answers);
    setCurrentQuestion(currentQ);
    // Save answers to localStorage
    localStorage.setItem("pipa-quote", JSON.stringify(answers));
  }, [answers]);

  const handleResetDialog = () => {
    setDialogConfig({
      ...resetDialogConfig,
      onConfirmSubmit: handleResetConfirmed,
    });
    setDialogOpen(true);
  };

  const handleEditDialog = (selectedQuestion: string) => {
    // Reset all answers that follow the current question including the current question
    setDialogConfig({
      ...editDialogConfig,
      onConfirmSubmit: () => handleEditConfirmed(selectedQuestion),
    });
    setDialogOpen(true);
  };

  const handleResetConfirmed = () => {
    setAnswers(defaultAnswers);
    setDialogOpen(false);
  };

  const handleEditConfirmed = (currentQuestion: string) => {
    const newAnswers = { ...answers };

    switch (currentQuestion) {
      case "name":
        setAnswers(defaultAnswers);
        break;
      case "email":
        newAnswers.email = "";
        newAnswers.zip = "";
        newAnswers.petName = "";
        newAnswers.animal = "";
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.weight = "";
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "zip":
        newAnswers.zip = "";
        newAnswers.petName = "";
        newAnswers.animal = "";
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.weight = "";

        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "petName":
        newAnswers.petName = "";
        newAnswers.animal = "";
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.weight = "";

        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "animal":
        newAnswers.animal = "";
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.weight = "";
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "gender":
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.weight = "";
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "age":
        newAnswers.age = { value: 0, label: "" };
        newAnswers.weight = "";
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "weight":
        newAnswers.weight = "";
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "breed":
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "reference":
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppDialog
        {...dialogConfig}
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
      />

      <div className="flex flex-col bg-(--light-pink) min-h-screen overflow-hidden w-full">
        <header className="flex flex-row gap-8 flex-wrap items-center justify-between p-8 w-full fixed top-0 z-100 pb-18 mask-b-from-65% bg-(--light-pink)">
          <button
            onClick={() => navigate("/")}
            className="nunito-sans-medium cursor-pointer"
          >
            <img
              src="./logo_vert.webp"
              alt="PiPA Broker"
              className="w-[50px] ml-4"
            />
          </button>
          <div className="p-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5 flex flex-col items-center justify-center text-(--primary-coral) hover:text-(--primary-coral) px-4 text:xs rounded-full hover:shadow-lg hover:bg-neutral-50"
                  onClick={handleResetDialog}
                >
                  start new quote
                </Button>
              </PopoverTrigger>
              <PopoverClose asChild>
                <PopoverContent className="z-100 bg-white p-2 cursor-pointer m-1">
                  <div className="flex flex-col gap-4 p-1">
                    <Button
                      variant="ghost"
                      className="cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                      onClick={handleResetDialog}
                    >
                      <EditIcon />
                      &nbsp;&nbsp;Start over
                    </Button>
                  </div>
                </PopoverContent>
              </PopoverClose>
            </Popover>
          </div>
          <div className="flex items-center justify-center h-full flex-4 max-w-10/12 w-full mx-auto">
            <ProgressGrid answers={answers} />
          </div>
        </header>
        <main className="flex-1 w-full my-4 p-8 overflow-scroll scrollbar-theme-color min-h-[400px] ">
          <Questions
            answers={answers}
            currentQuestion={currentQuestion}
            onEditClicked={handleEditDialog}
          >
            <FormSelections
              currentQuestion={currentQuestion}
              answers={answers}
              setAnswers={setAnswers}
            />
          </Questions>
        </main>
      </div>
    </>
  );
};

export default InfoForm;
