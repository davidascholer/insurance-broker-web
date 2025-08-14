import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AnswersType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatArray = (str: string) => {
  const returnArray = [];
  for (const s of str.split(" ")) {
    returnArray.push({
      text: s,
      className: "text-(--text-dark) text-md",
    });
  }
  return returnArray;
};

export const formatNumberToPrice = (num: number, decimal: boolean = false) => {
  if (decimal) return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  return `$${Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatNumberToPercent = (num: number) => {
  return `${Math.round(num)}%`;
};

export const findCurrentQuestionProperty = (
  answers: AnswersType | undefined
) => {
  if (!answers) return "name";
  if (!answers.name.firstName || !answers.name.lastName) return "name";
  if (!answers.email) return "email";
  if (!answers.zip) return "zip";
  if (!answers.petName) return "petName";
  if (!answers.animal) return "animal";
  if (!answers.gender) return "gender";
  if (!answers.age || answers.age?.value === 0) return "age";
  if (!answers.weight) return "weight";
  if (!answers.breed) return "breed";
  if (!answers.reference) return "reference";
  return "finish";
};

export const findCurrentQuestionIndex = (answers: AnswersType | undefined) => {
  if (!answers) return 0;
  if (!answers.name.firstName || !answers.name.lastName) return 0;
  if (!answers.email) return 1;
  if (!answers.zip) return 2;
  if (!answers.petName) return 3;
  if (!answers.animal) return 4;
  if (!answers.gender) return 5;
  if (!answers.age || answers.age?.value === 0) return 6;
  if (!answers.weight) return 7;
  if (!answers.breed) return 8;
  if (!answers.reference) return 9;
  return 10; // finish
};

export const findAgeString = (ageInDays: number) => {
  if (ageInDays < 7) {
    return `${ageInDays} day${ageInDays === 1 ? "" : "s"}`;
  } else if (ageInDays < 60) {
    const weeks = Math.floor(ageInDays / 7);
    return `${weeks} week${weeks === 1 ? "" : "s"}`;
  } else if (ageInDays < 365) {
    const months = Math.floor(ageInDays / 30);
    return `${months} month${months === 1 ? "" : "s"}`;
  } else {
    const years = Math.floor(ageInDays / 365);
    return `${years} year${years === 1 ? "" : "s"}`;
  }
};

export const verifyAnswers = (answers: AnswersType | undefined) => {
  if (
    !answers ||
    !answers.name.firstName ||
    !answers.name.lastName ||
    !answers.email ||
    !answers.zip ||
    !answers.petName ||
    !answers.animal ||
    !answers.gender ||
    !answers.age ||
    answers.age?.value === 0 ||
    !answers.weight ||
    !answers.breed ||
    !answers.reference
  )
    return false;
  return true;
};

export const generateRandomAlphanumeric = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
