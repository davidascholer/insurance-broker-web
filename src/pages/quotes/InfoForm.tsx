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
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressGrid from "@/components/ProgressGrid";

const defaultAnswers: AnswersType = {
  name: { firstName: "", lastName: "" },
  email: "",
  zip: "",
  petName: "",
  animal: "",
  gender: "",
  age: { value: 0, label: "" },
  breed: "",
  reference: "",
};

const resetDialogConfig = {
  title: "Start over?",
  description:
    "Clicking yes will require you to re-answer all of the questions.",
  confirmText: "Yes, start over",
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
    console.debug("Answers updated:", answers);
    const currentQ = findCurrentQuestionProperty(answers);
    console.debug("newCurrentQuestion:", currentQ);
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
    console.debug("Editing from question:", currentQuestion);
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
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "petName":
        newAnswers.petName = "";
        newAnswers.animal = "";
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "animal":
        newAnswers.animal = "";
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "gender":
        newAnswers.gender = "";
        newAnswers.age = { value: 0, label: "" };
        newAnswers.breed = "";
        newAnswers.reference = "";
        setAnswers(newAnswers);
        break;
      case "age":
        newAnswers.age = { value: 0, label: "" };
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

      <div className="flex bg-(--light-pink) h-screen overflow-hidden w-full relative">
        <aside className="flex flex-col items-center justify-start p-4 h-screen max-w-48 fixed left-[10px] top-[10px] w-[140px]">
          <a href="https://www.pipabroker.com" className="nunito-sans-medium">
            <img src="./logo.png" alt="PiPA Broker" className="w-full" />
          </a>
          <div className="w-full">
            <ProgressGrid answers={answers} />
          </div>
        </aside>
        <main className="flex-1 w-full ml-[150px] mr-[50px] py-8 overflow-scroll no-scrollbar mask-y-from-85% mask-y-to-90%">
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
        <div className="p-4 fixed top-[10px] right-[10px] w-[40px]">
          <Popover>
            <PopoverTrigger className="nunito-sans-medium flex items-center text-center text-2xl tracking-widest cursor-pointer">
              ...
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
      </div>
    </>
  );
};

export default InfoForm;
