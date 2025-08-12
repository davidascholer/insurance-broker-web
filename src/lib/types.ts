import type { catBreeds } from "@/data/catBreeds";
import type { dogBreeds } from "@/data/dogBreeds";

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
  weight: string;
  breed: (typeof catBreeds)[number] | (typeof dogBreeds)[number] | "";
  reference: string;
};

export type ProviderIdTypes =
  | "figo"
  | "pumpkin"
  | "petsbest"
  | "embrace"
  | "fetch"
  | "metlife";

// Type for individual quote data item on the server
export type DataQuoteItem = {
  deductible: number;
  reimbursementPercentage: number;
  coverageLimit: number;
  monthlyPrice: number;
};

// Full object type on the server
export type DataResponseItem = {
  providerId: ProviderIdTypes;
  providerName: string;
  quotes: DataQuoteItem[];
};

// Data response type from the server
export type DataResponse = DataResponseItem[];

// Local parsing type mutated from the server types
export type QuoteItem = DataQuoteItem & { providerId: ProviderIdTypes };

export type ContactFormType = {
  firstName: string;
  lastName: string;
  phone?: string;
  message: string;
  email: string;
  type: "investor" | "partner";
};