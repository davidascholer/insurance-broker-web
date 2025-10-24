import { getPrudentQuote } from "./api";

export const getPrudentLink = async (quoteReq: unknown) => {
  const quoteResult = (await getPrudentQuote(quoteReq)) as {
    success: boolean;
    quote?: { url: string };
    error?: string;
  };

  if (!quoteResult.success || !quoteResult.quote || !quoteResult.quote?.url) {
    throw new Error(
      `Failed to fetch prudent quote: ${quoteResult.error || "Unknown error"}`
    );
  }
  console.log("Redirecting to prudent quote URL:", quoteResult.quote.url);
  return quoteResult.quote.url;
};
