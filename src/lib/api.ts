import {
  PIPA_BOT_URL,
  PIPA_EMAIL_URL,
  PIPA_FALLBACK_QUOTES_URL,
} from "./constants";
import type {
  AnswersType,
  BotRequestType,
  ContactFormType,
  ProviderIdTypes,
  QuotesResultType,
} from "./types";

export const getQuotes = async (
  answers: AnswersType,
  insurer: ProviderIdTypes
): Promise<QuotesResultType> => {
  const response = await fetch(PIPA_FALLBACK_QUOTES_URL + "/" + insurer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify(answers),
  });
  if (!response.ok) {
    return {
      success: false,
      error: `Error: ${response.status} ${response.statusText}`,
    };
  }
  const formattedResponse = await response.json();
  const options = formattedResponse.data;
  console.log("RESPONSE FROM options", insurer, options);
  return { quotes: options, success: true };
};

export const sendEmail = async (
  contactInfo: ContactFormType
): Promise<{ success: boolean; msg: string }> => {
  const response = await fetch(PIPA_EMAIL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactInfo),
  });
  if (!response.ok) {
    return {
      success: false,
      msg: `Error: ${response.statusText}`,
    };
  }
  return { success: true, msg: "Email sent successfully!" };
};

export const chatWithBot = async (
  botInfo: BotRequestType
): Promise<{ success: boolean; msg: string }> => {
  const response = await fetch(PIPA_BOT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(botInfo),
  });
  if (!response.ok) {
    return {
      success: false,
      msg: `Error: ${response.statusText}`,
    };
  }
  const data = await response.json();
  return { success: true, msg: data.message };
};
