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
  const [currentQuestion, setCurrentQuestion] = useState<string>("petName");

  useEffect(() => {
    setCurrentQuestion(findCurrentQuestionProperty(answers));
    // Save answers to localStorage
    localStorage.setItem("pipa-quote", JSON.stringify(answers));
  }, [answers]);

  return (
    <div className="flex bg-(--light-pink) min-h-screen">
      <aside className="flex flex-col items-center justify-start p-4 h-screen max-w-48 ">
        <a href="https://www.pipabroker.com" className="nunito-sans-medium">
          <img src="./logo.png" alt="PiPA Broker" className="w-full" />
        </a>
      </aside>
      <main className="flex-1 min-w-[200px] py-8">
        <div
          id="current-question"
          className="overflow-y-scroll no-scrollbar pb-32"
        >
          <Questions answers={answers} currentQuestion={currentQuestion}>
            <FormSelections
              currentQuestion={currentQuestion}
              answers={answers}
              setAnswers={setAnswers}
            />
          </Questions>
        </div>
      </main>
      <div className="p-4">
        <Popover>
          <PopoverTrigger className="nunito-sans-medium flex items-center text-center text-2xl tracking-widest cursor-pointer">
            ...
          </PopoverTrigger>
          <PopoverClose asChild>
            <PopoverContent className="z-100 bg-white p-2 cursor-pointer m-1">
              <div className="flex flex-col gap-4 p-1">
                <button
                  onClick={() => {
                    setAnswers(defaultAnswers);
                  }}
                  className="cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                >
                  <EditIcon />
                  &nbsp;&nbsp;Start over
                </button>
              </div>
            </PopoverContent>
          </PopoverClose>
        </Popover>
      </div>
    </div>
  );
};

export default InfoForm;
