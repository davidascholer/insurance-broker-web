import { useEffect, useRef, useState } from "react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import TextBlock from "./TextBlock";
import { formatArray } from "@/lib/utils";
import PipaIcon from "@/components/icons/PipaIcon";
import type { AnswersType } from "@/lib/types";

type QuestionsProps = {
  answers: AnswersType;
  currentQuestion: string;
  onEditClicked: (currentQuestion: string) => void;
  children?: React.ReactNode;
};

const Questions = ({
  answers,
  currentQuestion,
  onEditClicked,
  children,
}: QuestionsProps) => {
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
    console.debug("currentQuestion:", currentQuestion);
    if (currentQuestion === "name") {
      nameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = nameRef.current?.offsetTop || 0;
    } else if (currentQuestion === "email") {
      emailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = emailRef.current?.offsetTop || 0;
    } else if (currentQuestion === "zip") {
      zipRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = zipRef.current?.offsetTop || 0;
    } else if (currentQuestion === "petName") {
      petNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = petNameRef.current?.offsetTop || 0;
    } else if (currentQuestion === "animal") {
      animalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = animalRef.current?.offsetTop || 0;
    } else if (currentQuestion === "gender") {
      genderRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = genderRef.current?.offsetTop || 0;
    } else if (currentQuestion === "age") {
      ageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = ageRef.current?.offsetTop || 0;
    } else if (currentQuestion === "breed") {
      breedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = breedRef.current?.offsetTop || 0;
    } else if (currentQuestion === "reference") {
      referenceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = referenceRef.current?.offsetTop || 0;
    } else if (currentQuestion === "finish") {
      finishRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      newMargin = finishRef.current?.offsetTop || 0;
    }
    newMargin = newMargin;
    setTimeout(() => {
      setIconMarginTop(newMargin);
    }, 500);
  };

  const setNewMarginDebounced = () => {
    setTimeout(() => {
      initialRender.current = false;
      setNewMargin();
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener("resize", setNewMarginDebounced);
    window.addEventListener("visibilitychange", setNewMarginDebounced);

    return () => {
      window.removeEventListener("resize", setNewMarginDebounced);
      window.removeEventListener("visibilitychange", setNewMarginDebounced);
    };
  }, []);

  useEffect(() => {
    // Animate the icon
    if (initialRender.current) {
      setNewMarginDebounced();
    } else {
      setNewMargin();
    }
  }, [currentQuestion]);

  const handleEditClicked = (currentQuestion: string) => {
    onEditClicked(currentQuestion);
  };

  return (
    <div className=" min-h-[300px] overflow-scroll no-scrollbar border-none">
      <div className="flex flex-row justify-start items-start gap-4 pt-24 pb-36 min-h-2/3">
        <PipaIcon
          className="min-w-[40px] -mt-28"
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
                onEditClicked={() => handleEditClicked("name")}
                ref={emailRef}
                prevAnswer={
                  answers.name.firstName + " " + answers.name.lastName
                }
                nextQuestion={`Great to meet you, ${answers.name.firstName}! What’s your email address? We’ll use it to send you your quotes and keep you updated on the process.`}
              />
            )}

          {answers.email && answers.email !== "" && (
            <TextBlock
              onEditClicked={() => handleEditClicked("email")}
              ref={zipRef}
              prevAnswer={answers.email}
              nextQuestion={`To help get the most accurate quote, what is your 5-digit ZIP code?`}
            />
          )}

          {answers.zip && answers.zip !== "" && (
            <TextBlock
              onEditClicked={() => handleEditClicked("zip")}
              ref={petNameRef}
              prevAnswer={answers.zip}
              nextQuestion={`Great! Now for your pet baby. What's your pet's name?`}
            />
          )}

          {answers.petName && answers.petName !== "" && (
            <TextBlock
              onEditClicked={() => handleEditClicked("petName")}
              ref={animalRef}
              prevAnswer={answers.petName}
              nextQuestion={`So cute! Love the name :) And is ${answers.petName} a dog or a cat?`}
            />
          )}

          {answers.animal && (
            <TextBlock
              onEditClicked={() => handleEditClicked("animal")}
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
              onEditClicked={() => handleEditClicked("gender")}
              ref={ageRef}
              prevAnswer={answers.gender}
              nextQuestion={`OK, and how old is ${answers.petName}? If you're not sure, give us your best guess.`}
            />
          )}

          {answers.age && answers.age?.value !== 0 ? (
            <TextBlock
              onEditClicked={() => handleEditClicked("age")}
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
              onEditClicked={() => handleEditClicked("breed")}
              ref={referenceRef}
              prevAnswer={answers.breed}
              nextQuestion={
                "Great! Just one last thing. How did you hear about us?"
              }
            />
          )}

          {answers.reference && (
            <TextBlock
              onEditClicked={() => handleEditClicked("reference")}
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
    </div>
  );
};

export default Questions;
