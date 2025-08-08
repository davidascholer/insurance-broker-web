import { PIPA_QUOTES_URL } from "./constants";
import type { AnswersType, DataResponse } from "./types";

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
