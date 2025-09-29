/// <reference types="vite/client" />

import type { ProviderIdTypes } from "./types";

export const DEV = import.meta.env.DEV;
export const PIPA_STORAGE_PREFIX = "pipa-";
export const PIPA_COLOR_THEME_KEY = PIPA_STORAGE_PREFIX + "color-theme";
export const PIPA_USER_ID_KEY = PIPA_STORAGE_PREFIX + "user-id";
export const PIPA_PET_KEY = PIPA_STORAGE_PREFIX + "pet";

export const DEDUCTIBLE_OPTIONS = [
  { value: 0, label: "up to $100" },
  { value: 100, label: "$100 - $250" },
  { value: 250, label: "$250 - $500" },
  { value: 500, label: "$500 - $750" },
  { value: 750, label: "$750 - $1,000" },
  { value: 1000, label: "$1,000 and up" },
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
    // { label: "pets best", providerId: "petsbest" },
    { label: "fetch", providerId: "fetch" },
    // { label: "pumpkin", providerId: "pumpkin" },
    // { label: "metlife", providerId: "metlife" },
    { label: "embrace", providerId: "embrace" },
    { label: "prudent", providerId: "prudent" },
  ];
