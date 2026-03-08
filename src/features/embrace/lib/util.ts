import { getEmbraceQuote } from "./api";

export const getEmbraceLink = async (quoteReq: unknown) => {
  const quoteResult = (await getEmbraceQuote(quoteReq)) as {
    success: boolean;
    premiumSummary?: { quoteLinkUrl: string };
    error?: string;
  };

  if (
    !quoteResult.success ||
    !quoteResult.premiumSummary ||
    !quoteResult.premiumSummary?.quoteLinkUrl
  ) {
    throw new Error(
      `Failed to fetch embrace quote: ${quoteResult.error || "Unknown error"}`,
    );
  }
  console.log(
    "Redirecting to embrace quote URL:",
    quoteResult.premiumSummary.quoteLinkUrl,
  );
  return quoteResult.premiumSummary.quoteLinkUrl;
};
