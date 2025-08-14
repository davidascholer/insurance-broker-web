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
export type DataResponse = {
  quotes: DataQuoteItem[];
};

export type QuotesResultType = {
  success: boolean;
  quotes?: DataQuoteItem[];
  error?: string;
};

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

export type ChatMessageType = {
  from: "client" | "bot";
  message: string;
};

export type InsurerOptionsType = { label: string; providerId: ProviderIdTypes };
export type DeductibleOptionType = { value: number; label: string };
export type ReimbursementRateOptionType = {
  value: number | "unlimited";
  label: string;
};
export type AnnualLimitOptionType = { value: number; label: string };

export type SortItemType = "deductible" | "reimbursement" | "limit" | "price";
