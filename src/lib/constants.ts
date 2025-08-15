/// <reference types="vite/client" />

import type { ProviderIdTypes } from "./types";

export const DEV = import.meta.env.DEV;
export const PIPA_API_URL = DEV
  ? "http://localhost:3000/"
  : "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
export const PIPA_QUOTES_URL = PIPA_API_URL + "api/quotes";
export const PIPA_EMAIL_URL = PIPA_API_URL + "api/email";
export const PIPA_BOT_URL = PIPA_API_URL + "api/bot";

export const DEDUCTIBLE_OPTIONS = [
  { value: 100, label: "up to $100" },
  { value: 250, label: "$250" },
  { value: 500, label: "$500" },
  { value: 750, label: "$750" },
  { value: 1000, label: "$1,000" },
];
export const REIMBURSEMENT_RATE_OPTIONS = [
  { value: 90, label: "90%" },
  { value: 80, label: "80%" },
  { value: 70, label: "70%" },
];
export const ANNUAL_LIMIT_OPTIONS = [
  { value: 999999, label: "UNLIMITED" },
  { value: 15000, label: "$15,000" },
  { value: 10000, label: "$10,000" },
  { value: 5000, label: "$5,000" },
];

export const INSURER_OPTIONS: { label: string; providerId: ProviderIdTypes }[] =
  [
    { label: "figo", providerId: "figo" },
    { label: "pets best", providerId: "petsbest" },
    { label: "fetch", providerId: "fetch" },
    { label: "pumpkin", providerId: "pumpkin" },
    { label: "metlife", providerId: "metlife" },
    { label: "embrace", providerId: "embrace" },
  ];
