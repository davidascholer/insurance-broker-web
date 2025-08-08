export const DEV = true;
export const PIPA_API_URL = DEV
  ? "http://localhost:3000/"
  : "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
export const PIPA_QUOTES_URL = PIPA_API_URL + "api/quotes";
