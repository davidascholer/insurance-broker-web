import type {
  AnswersType,
  BotRequestType,
  ContactFormType,
  ProviderIdTypes,
  QuotesResultType,
} from "../lib/types";
import {
  PIPA_AUTH_URL,
  PIPA_ANALYTICS_URL,
  PIPA_BOT_URL,
  PIPA_EMAIL_URL,
  PIPA_FALLBACK_QUOTES_URL,
  PIPA_QUOTES_URL,
} from "./constants";

export const getQuotes = async (
  answers: AnswersType,
  insurer: ProviderIdTypes,
  isFallback = false
): Promise<QuotesResultType> => {
  const quotesUrl = isFallback ? PIPA_FALLBACK_QUOTES_URL : PIPA_QUOTES_URL;
  const response = await fetch(quotesUrl + "/" + insurer, {
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
  return { quotes: options, success: true };
};

export const getPrudentQuote = async (data?: unknown): Promise<unknown> => {
  const response = await fetch(PIPA_QUOTES_URL + "/prudent/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quoteData: data }),
  });
  if (!response.ok) {
    return {
      success: false,
      error: `Error: ${response.status} ${response.statusText}`,
    };
  }
  const formattedResponse = await response.json();
  return { success: true, ...formattedResponse };
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
  console.log("chatWithBot botInfo:", botInfo);
  console.log("PIPA_BOT_URL:", PIPA_BOT_URL);
  const response = await fetch(PIPA_BOT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(botInfo),
  });
  console.log("chatWithBot response:", response);
  if (!response.ok) {
    return {
      success: false,
      msg: "I'm having trouble connecting to the server. Please try again.",
    };
  }
  const data = await response.json();
  console.log("chatWithBot response data:", data);
  if (!data.response.messages) {
    return {
      success: false,
      msg: "I'm having trouble understanding the question. Please try again.",
    };
  }
  return {
    success: true,
    msg: String(data.response.messages.replace("msg 0: ", "")),
  };
};

export const formSubmitted = async (petObject: AnswersType) => {
  const data = await fetch(PIPA_ANALYTICS_URL + "/form-submitted", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify({ petObject }),
  });
  if (!data.ok) {
    throw new Error(`Error: ${data.status} ${data.statusText}`);
  }
  const parsedData = await data.json();
  return parsedData.data;
};

export const getUserObjects = async (token: string) => {
  const data = await fetch(PIPA_ANALYTICS_URL + "/get-user-pet-objects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify({ token }),
  });
  console.log("getHits token:", token);
  if (!data.ok) {
    throw new Error(`Error: ${data.status} ${data.statusText}`);
  }
  const parsedData = await data.json();
  return parsedData.data;
};

export const adminEmailPassword = async (email: string) => {
  const data = await fetch(PIPA_AUTH_URL + "/send-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify({ email: email }),
  });
  if (!data.ok) {
    return "Error: " + data.statusText;
  }
  return "Email sent successfully!";
};
