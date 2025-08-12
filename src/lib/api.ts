import { PIPA_EMAIL_URL, PIPA_QUOTES_URL } from "./constants";
import type { AnswersType, ContactFormType, DataResponse } from "./types";

export const getQuotes = async (
  answers: AnswersType
): Promise<DataResponse> => {
  console.debug("Fetching quotes with answers:", answers);
  const response = await fetch(PIPA_QUOTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
    },
    body: JSON.stringify(answers),
  });
  if (!response.ok) {
    return Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }
  const { quotes } = await response.json();
  return quotes;
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
