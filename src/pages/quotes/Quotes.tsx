import Loader from "@/components/Loader";
import type { AnswersType, QuoteItem } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuoteResults from "@/components/QuoteResults";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useIsOnline from "@/hooks/useIsOnline";
import { getQuotes } from "@/lib/api";
import { verifyAnswers } from "@/lib/utils";
import Header from "@/components/header/Header";

const Quotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quoteData, setQuoteData] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useIsOnline();

  const fetchQuotes = async (answers: AnswersType) => {
    try {
      const response = await getQuotes(answers);
      // Assuming response is of type DataResponse
      for (const dataItem of response) {
        for (const dataQuoteItem of dataItem.quotes) {
          const newQuote: QuoteItem = {
            ...dataQuoteItem,
            providerId: dataItem.providerId,
          };
          setQuoteData((prev) => [...prev, newQuote]);
        }
      }
    } catch (err) {
      setError(`Failed to fetch quotes: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state) navigate("/info");
    // Validate the answers to ensure they are complete
    const answers = location.state as AnswersType;

    const answersVerified = verifyAnswers(answers);
    if (!answersVerified) {
      // If answers are missing or incomplete, redirect to /info
      navigate("/info");
    } else {
      // Fetch quotes based on the answers
      fetchQuotes(answers);
    }
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 pt-24 space-y-4 bg-(--light-pink) h-screen">
      <Header showFetchButton={false} showChatBot={true} />
      {!isOnline && (
        <div>
          <p>
            You do not appear to be online. Please check your connection and
            refresh the page.
          </p>
        </div>
      )}
      {isLoading && isOnline && <Loader />}
      {error && <div className="text-red-600">{error}</div>}
      {!error && !isLoading && (
        <>
          {/* <ChatBot /> */}
          <ScrollArea className="flex-1 w-full overflow-scroll no-scrollbar">
            <QuoteResults cards={quoteData} />
          </ScrollArea>
        </>
      )}
    </div>
  );
};
export default Quotes;
