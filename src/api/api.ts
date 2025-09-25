import { PIPA_STORAGE_PREFIX } from "@/lib/constants";
import type {
  AnswersType,
  BotRequestType,
  ContactFormType,
  ProviderIdTypes,
  QuoteItem,
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
  // console.debug("getQuotes response:", response);
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

export const getHits = async (token: string) => {
  const data = await fetch(PIPA_ANALYTICS_URL + "/get-hits", {
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

export const getLinksClicked = async (token: string) => {
  const data = await fetch(PIPA_ANALYTICS_URL + "/get-links-clicked", {
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

export const gatherQuotesFromInsurer = async (
  insurer: ProviderIdTypes,
  answers: AnswersType,
  isFallback = false
) => {
  const fetchedQuotes: QuoteItem[] = [];
  const quoteResult: QuotesResultType = await getQuotes(
    answers,
    insurer,
    isFallback
  );

  if (quoteResult.success && quoteResult.quotes) {
    localStorage.setItem(
      PIPA_STORAGE_PREFIX + insurer + "-quotes",
      JSON.stringify({
        coverageOptions: quoteResult.quotes.coverageOptions,
        timestamp: Date.now(),
      })
    );
    const insurerQuotes: QuoteItem[] = quoteResult.quotes.coverageOptions.map(
      (option) => ({
        ...option,
        providerId: insurer,
      })
    );
    if (insurerQuotes) {
      fetchedQuotes.push(...insurerQuotes);
    }
  }

  return fetchedQuotes;
};
