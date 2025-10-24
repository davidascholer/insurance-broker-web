import type {
  AnswersType,
  ProviderIdTypes,
  QuoteItem,
  QuotesResultType,
} from "@/lib/types";
import { getQuotes } from "./api";
// import { getQuote, getQuotes } from "./api";

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

  if (
    quoteResult.success &&
    quoteResult.quotes &&
    quoteResult.quotes.coverageOptions
  ) {
    if (
      !quoteResult.quotes.coverageOptions ||
      quoteResult.quotes.coverageOptions.length === 0
    ) {
      console.warn("No coverage options found for insurer:", insurer);
      return fetchedQuotes;
    }
    const insurerQuotes: QuoteItem[] = quoteResult.quotes.coverageOptions.map(
      (option) => ({
        ...option,
        providerId: insurer,
      })
    );
    console.debug("insurerQuotes for", insurer, insurerQuotes);
    if (insurerQuotes) {
      fetchedQuotes.push(...insurerQuotes);
    }
  }

  return fetchedQuotes;
};
