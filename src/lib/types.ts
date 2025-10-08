import type clientCatBreeds from "@/data/catBreeds";
import type { dogBreeds } from "@/data/dogBreeds";

export type NameType = { firstName: string; lastName: string };
export type AgeType = { value: number; label: string };

export type ThemeProviderStateType = {
  theme: ColorThemeType;
  changeTheme: () => void;
};

export type AnswersType = {
  name: NameType;
  email: string;
  zip: string;
  petName: string;
  animal: "cat" | "dog" | "";
  gender: "male" | "female" | "";
  age: AgeType;
  weight: string;
  breed: (typeof clientCatBreeds)[number] | (typeof dogBreeds)[number] | "";
  reference: string;
};

export type ProviderIdTypes = "figo" | "embrace" | "fetch" | "prudent";

export type PrudentExtrasType = {
  planDesc: string;
  planCode: string;
  precheckoutUrl: string;
  checkoutUrl: string;
  relatedPlans?: DataQuoteItem[];
};

// Type for individual quote data item on the server
export type DataQuoteItem = {
  deductibleOption: number;
  reimbursementPercentageOption: number;
  reimbursementLimitOption: number;
  monthlyPrice: number;
  extras?: PrudentExtrasType;
};

// Full object type on the server
export type DataResponse = {
  quotes: DataQuoteItem[];
};

export type QuotesResultType = {
  success: boolean;
  quotes?: {
    coverageOptions: DataQuoteItem[];
  };
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

export type BotRequestType = {
  message: string;
  sessionId: string;
};

export type InsurerOptionsType = { label: string; providerId: ProviderIdTypes };
export type FilterOptionType = {
  value: number;
  label: string;
};

export type SortItemType = "price";

export type ColorThemeType = "light" | "dark" | "system";

export type HitsDataType = {
  referrer: string;
  origin: string;
  ip: string;
  timestamp: string;
};
export type LinksClickedType = {
  animal: string;
  breed: string;
  weight: string;
  email: string;
  insurer: string;
  timestamp: string;
};
export type UserPetInfoType = AnswersType & {
  id: string;
};
