import { PIPA_QUOTES_URL } from "@/api/constants";

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