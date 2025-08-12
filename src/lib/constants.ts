export const DEV = true;
export const PIPA_API_URL = DEV
  ? "http://localhost:3000/"
  : "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
export const PIPA_QUOTES_URL = PIPA_API_URL + "api/quotes";
export const PIPA_EMAIL_URL = PIPA_API_URL + "api/email";

export const deductibleOptions = [
  { value: 100, label: "$100" },
  { value: 250, label: "$250" },
  { value: 500, label: "$500" },
  { value: 750, label: "$750" },
  { value: 1000, label: "$1000" },
];
export const annualLimitOptions = [
  { value: 2000, label: "$2,000" },
  { value: 5000, label: "$5,000" },
  { value: 10000, label: "$10,000" },
  { value: 15000, label: "$15,000" },
  { value: Infinity, label: "unlimited" },
];
