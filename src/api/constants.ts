import { DEV } from "@/lib/constants";

export const PIPA_API_URL = DEV
  ? "http://localhost:3000/"
  : "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
export const PIPA_QUOTES_URL = PIPA_API_URL + "api/v1/quotes";
export const PIPA_FALLBACK_QUOTES_URL = PIPA_API_URL + "api/v1/quotes/fallback";
export const PIPA_EMAIL_URL = PIPA_API_URL + "api/v1/email";
export const PIPA_LOGGER_URL = PIPA_API_URL + "api/v1/logger";
export const PIPA_BOT_URL = PIPA_API_URL + "api/v1/bot";
export const PIPA_ANALYTICS_URL = PIPA_API_URL + "api/v1/analytics";
export const PIPA_AUTH_URL = PIPA_API_URL + "api/v1/auth";
