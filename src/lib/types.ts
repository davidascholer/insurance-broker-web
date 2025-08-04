import type { catBreeds, dogBreeds } from "./data";

export type NameType = { firstName: string; lastName: string };
export type AgeType = { value: number; label: string };

export type AnswersType = {
  name: NameType;
  email: string;
  zip: string;
  petName: string;
  animal: "cat" | "dog" | "";
  gender: "male" | "female" | "";
  age: AgeType;
  breed: (typeof catBreeds)[number] | (typeof dogBreeds)[number] | "";
  reference: string;
};

export type Quote = { provider: string; price: string };
