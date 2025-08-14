import { useEffect, useRef, useState } from "react";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import TextBlock from "./TextBlock";
import { findCurrentQuestionIndex, formatArray } from "@/lib/utils";
import PipaIcon from "@/components/icons/PipaIcon";
import type { AnswersType } from "@/lib/types";

type QuestionsProps = {
  answers: AnswersType;
  currentQuestion: string;
  onEditClicked: (currentQuestion: string) => void;
  children?: React.ReactNode;
};

const Questions = ({ answers, onEditClicked, children }: QuestionsProps) => {
  const [iconMarginTop, setIconMarginTop] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(
    findCurrentQuestionIndex(answers)
  );

  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const zipRef = useRef<HTMLDivElement>(null);
  const petNameRef = useRef<HTMLDivElement>(null);
  const animalRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);
  const breedRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const initialRender = useRef(true);

  const setNewMargin = (curIndex: number) => {
    let newMargin: number = 0;

    if (curIndex <= 0) {
      newMargin = nameRef.current?.offsetTop || 0;
    } else if (curIndex === 1) {
      newMargin = emailRef.current?.offsetTop || 0;
    } else if (curIndex === 2) {
      newMargin = zipRef.current?.offsetTop || 0;
    } else if (curIndex === 3) {
      newMargin = petNameRef.current?.offsetTop || 0;
    } else if (curIndex === 4) {
      newMargin = animalRef.current?.offsetTop || 0;
    } else if (curIndex === 5) {
      newMargin = genderRef.current?.offsetTop || 0;
    } else if (curIndex === 6) {
      newMargin = ageRef.current?.offsetTop || 0;
    } else if (curIndex === 7) {
      newMargin = weightRef.current?.offsetTop || 0;
    } else if (curIndex === 8) {
      newMargin = breedRef.current?.offsetTop || 0;
    } else if (curIndex === 9) {
      newMargin = referenceRef.current?.offsetTop || 0;
    } else if (curIndex >= 10) {
      newMargin = finishRef.current?.offsetTop || 0;
    }
    setTimeout(() => {
      setIconMarginTop(newMargin);
    }, 750);
  };

  const scrollIntoView = () => {
    if (currentIndex <= 0) {
      nameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 1) {
      emailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 2) {
      zipRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 3) {
      petNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 4) {
      animalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 5) {
      genderRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 6) {
      ageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 7) {
      weightRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 8) {
      breedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex === 9) {
      referenceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (currentIndex >= 10) {
      finishRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // const setNewMargin = () => {
  //   let newMargin: number = 0;
  //   const currentIndex = findCurrentQuestionIndex(answers);

  //   if (currentIndex <= 0) {
  //     newMargin = nameRef.current?.offsetTop || 0;
  //     nameRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 1) {
  //     newMargin = emailRef.current?.offsetTop || 0;
  //     emailRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 2) {
  //     newMargin = zipRef.current?.offsetTop || 0;
  //     zipRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 3) {
  //     newMargin = petNameRef.current?.offsetTop || 0;
  //     petNameRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 4) {
  //     newMargin = animalRef.current?.offsetTop || 0;
  //     animalRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 5) {
  //     newMargin = genderRef.current?.offsetTop || 0;
  //     genderRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 6) {
  //     newMargin = ageRef.current?.offsetTop || 0;
  //     ageRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 7) {
  //     newMargin = weightRef.current?.offsetTop || 0;
  //     weightRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 8) {
  //     newMargin = breedRef.current?.offsetTop || 0;
  //     breedRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex === 9) {
  //     newMargin = referenceRef.current?.offsetTop || 0;
  //     referenceRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   } else if (currentIndex >= 10) {
  //     newMargin = finishRef.current?.offsetTop || 0;
  //     finishRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  //   setTimeout(() => {
  //     setIconMarginTop(newMargin);
  //   }, 750);
  // };

  useEffect(() => {
    window.addEventListener("resize", () => setNewMargin(currentIndex));
    // window.addEventListener("visibilitychange", () =>
    //   setNewMargin(currentIndex)
    // );

    return () => {
      window.removeEventListener("resize", () => setNewMargin(currentIndex));
      // window.removeEventListener("visibilitychange", () =>
      //   setNewMargin(currentIndex)
      // );
    };
    // disable exhaustive-deps rule as we only wnat this to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollIntoView();
    }, 1000);
    setCurrentIndex(findCurrentQuestionIndex(answers));
  }, [answers]);

  useEffect(() => {
    // Animate the icon
    if (initialRender.current) {
      setTimeout(() => {
        initialRender.current = false;
        setNewMargin(currentIndex);
      }, 2000);
    } else {
      setNewMargin(currentIndex);
    }
  }, [currentIndex]);

  const handleEditClicked = (currentQuestion: string) => {
    onEditClicked(currentQuestion);
  };

  return (
    <div className=" min-h-[300px] no-scrollbar border-none">
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
          {/* Current Question: firstName/lastName */}
          <div ref={nameRef} className="mt-4">
            <TypewriterEffect
              cursorClassName="hidden"
              className="h-auto flex-1 font-bold"
              words={formatArray(
                `Hi! Thank you for trusting PIPA Broker to help find the right pet insurance policy for you and your furry family member. So let’s get started... What is your name?`
              )}
            />
          </div>

          {/* Current Question: email */}
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

          {/* Current Question: zip */}
          {answers.email && answers.email !== "" && (
            <TextBlock
              onEditClicked={() => handleEditClicked("email")}
              ref={zipRef}
              prevAnswer={answers.email}
              nextQuestion={`To help get the most accurate quotes, what is your 5-digit ZIP code?`}
            />
          )}

          {/* Current Question: petName */}
          {answers.zip && answers.zip !== "" && (
            <TextBlock
              onEditClicked={() => handleEditClicked("zip")}
              ref={petNameRef}
              prevAnswer={answers.zip}
              nextQuestion={`Great! Now for your pet baby. What's your pet's name?`}
            />
          )}

          {/* Current Question: breed */}
          {answers.petName && answers.petName !== "" && (
            <TextBlock
              onEditClicked={() => handleEditClicked("petName")}
              ref={animalRef}
              prevAnswer={answers.petName}
              nextQuestion={`So cute! Love the name :) And is ${answers.petName} a dog or a cat?`}
            />
          )}

          {/* Current Question: gender */}
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

          {/* Current Question: age */}
          {answers.gender && (
            <TextBlock
              onEditClicked={() => handleEditClicked("gender")}
              ref={ageRef}
              prevAnswer={answers.gender}
              nextQuestion={`OK, and how old is ${answers.petName}? If you're not sure, give us your best guess.`}
            />
          )}

          {/* Current Question: weight */}
          {answers.age && answers.age?.value !== 0 && (
            <TextBlock
              onEditClicked={() => handleEditClicked("age")}
              ref={weightRef}
              prevAnswer={answers.age.label}
              nextQuestion={
                "Alright. Now, how much does " +
                answers.petName +
                " weigh? If you don't know, just give us your best guess."
              }
            />
          )}

          {/* Current Question: breed */}
          {answers.weight && answers.weight !== "" ? (
            <TextBlock
              onEditClicked={() => handleEditClicked("age")}
              ref={breedRef}
              prevAnswer={String(answers.weight) + " lbs"}
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

          {/* Current Question: reference */}
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

          {/* Current Question: finish */}
          {answers.reference && (
            <TextBlock
              onEditClicked={() => handleEditClicked("reference")}
              ref={finishRef}
              prevAnswer={answers.reference}
              nextQuestion={`Awesome! Thanks for sharing that info with us. We’ll get to work finding the best pet insurance quotes for ${answers.petName}.`}
            />
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Questions;
