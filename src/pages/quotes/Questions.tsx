import { useEffect, useRef, useState } from "react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import TextBlock from "./TextBlock";
import { formatArray } from "@/lib/utils";
import PipaIcon from "@/components/icons/PipaIcon";
import type { AnswersType } from "@/lib/types";

type QuestionsProps = {
  answers: AnswersType;
  currentQuestion: string;
  children?: React.ReactNode;
};

const Questions = ({ answers, currentQuestion, children }: QuestionsProps) => {
  const [iconMarginTop, setIconMarginTop] = useState<number>(0);

  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const zipRef = useRef<HTMLDivElement>(null);
  const petNameRef = useRef<HTMLDivElement>(null);
  const animalRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLDivElement>(null);
  const breedRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const initialRender = useRef(true);

  const setNewMargin = () => {
    let newMargin: number = 0;
    if (currentQuestion === "name") {
      newMargin = nameRef.current?.offsetTop || 0;
    } else if (currentQuestion === "email") {
      newMargin = emailRef.current?.offsetTop || 0;
    } else if (currentQuestion === "zip") {
      newMargin = zipRef.current?.offsetTop || 0;
    } else if (currentQuestion === "petName") {
      newMargin = petNameRef.current?.offsetTop || 0;
    } else if (currentQuestion === "animal") {
      newMargin = animalRef.current?.offsetTop || 0;
    } else if (currentQuestion === "gender") {
      newMargin = genderRef.current?.offsetTop || 0;
    } else if (currentQuestion === "age") {
      newMargin = ageRef.current?.offsetTop || 0;
    } else if (currentQuestion === "breed") {
      newMargin = breedRef.current?.offsetTop || 0;
    } else if (currentQuestion === "reference") {
      newMargin = referenceRef.current?.offsetTop || 0;
    } else if (currentQuestion === "finish") {
      newMargin = finishRef.current?.offsetTop || 0;
    }
    const iconHeight = iconRef.current?.offsetHeight ?? 0;
    newMargin = newMargin - iconHeight;
    setIconMarginTop(newMargin);
  };

  window.addEventListener("resize", () => {
    setTimeout(() => {
      initialRender.current = false;
      setNewMargin();
    }, 2000);
  });

  useEffect(() => {
    // Animate the icon
    if (initialRender.current) {
      setTimeout(() => {
        initialRender.current = false;
        setNewMargin();
      }, 2000);
    } else {
      setNewMargin();
    }
  }, [currentQuestion]);

  return (
    <div className="flex flex-row justify-start items-start p-2 gap-4 h-full w-full">
      <PipaIcon
        className="min-w-[40px]"
        style={{
          transform: `translate(0, ${iconMarginTop}px)`,
          transition: "transform 1s ease",
        }}
        ref={iconRef}
      />
      <div>
        <div ref={nameRef} className="mt-4">
          <TypewriterEffect
            cursorClassName="hidden"
            className="h-auto flex-1 font-bold"
            words={formatArray(
              `Hi! Thank you for trusting PiPA Broker to help find the right pet insurance policy for you and your furry family member. So let’s get started... What is your name?`
            )}
          />
        </div>

        {answers.name &&
          answers.name.firstName !== "" &&
          answers.name.lastName !== "" && (
            <TextBlock
              ref={emailRef}
              prevAnswer={answers.name.firstName + " " + answers.name.lastName}
              nextQuestion={`Great to meet you, ${answers.name.firstName}! What’s your email address? We’ll use it to send you your quotes and keep you updated on the process.`}
            />
          )}

        {answers.email && answers.email !== "" && (
          <TextBlock
            ref={zipRef}
            prevAnswer={answers.email}
            nextQuestion={`To help get the most accurate quote, what is your 5-digit ZIP code?`}
          />
        )}

        {answers.zip && answers.zip !== "" && (
          <TextBlock
            ref={petNameRef}
            prevAnswer={answers.zip}
            nextQuestion={`Great! Now for your pet baby. What's your pet's name?`}
          />
        )}

        {answers.petName && answers.petName !== "" && (
          <TextBlock
            ref={animalRef}
            prevAnswer={answers.petName}
            nextQuestion={`So cute! Love the name :) And is ${answers.petName} a dog or a cat?`}
          />
        )}

        {answers.animal && (
          <TextBlock
            ref={genderRef}
            prevAnswer={answers.animal}
            nextQuestion={`${
              answers.animal === "cat"
                ? "MEOW!"
                : answers.animal === "dog"
                ? "RUFF RUFF!"
                : ""
            }  Adorable! Is ${answers.petName} male or a female?`}
          />
        )}

        {answers.gender && (
          <TextBlock
            ref={ageRef}
            prevAnswer={answers.gender}
            nextQuestion={`OK, and how old is ${answers.petName}? If you're not sure, give us your best guess.`}
          />
        )}

        {answers.age && answers.age?.value !== 0 ? (
          <TextBlock
            ref={breedRef}
            prevAnswer={answers.age.label}
            nextQuestion={`OK, and what breed of ${
              answers.animal === "cat"
                ? "cat 🐱"
                : answers.animal === "dog"
                ? "dog 🐶"
                : ""
            } is ${
              answers.petName
            }? If you do not know the breed, just type in Mixed.`}
          />
        ) : null}

        {answers.breed && (
          <TextBlock
            ref={referenceRef}
            prevAnswer={answers.breed}
            nextQuestion={
              "Great! Just one last thing. How did you hear about us?"
            }
          />
        )}

        {answers.reference && (
          <TextBlock
            ref={finishRef}
            prevAnswer={answers.reference}
            nextQuestion={
              "Awesome! Thanks for sharing that info with us. We’ll get to work finding the best pet insurance quotes for you and your furry friend."
            }
          />
        )}

        {children}
      </div>
    </div>
  );
};

export default Questions;
