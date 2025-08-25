import { DEV } from "@/lib/constants";

export const PIPA_API_URL = DEV
  ? "http://localhost:3002/"
  : "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
export const PIPA_QUOTES_URL = PIPA_API_URL + "api/quotes";
export const PIPA_FALLBACK_QUOTES_URL = PIPA_API_URL + "api/quotes/fallback";
export const PIPA_EMAIL_URL = PIPA_API_URL + "api/email";
export const PIPA_BOT_URL = PIPA_API_URL + "api/bot";
export const PIPA_ANALYTICS_URL = PIPA_API_URL + "api/analytics";
export const PIPA_ADMIN_URL = PIPA_API_URL + "api/admin";
