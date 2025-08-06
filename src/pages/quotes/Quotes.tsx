import Loader from "@/components/Loader";
import type {
  AnswersType,
  DataResponse,
  QuoteItem,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuoteResults from "@/components/QuoteResults";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useIsOnline from "@/hooks/useIsOnline";
import ChatbotHeader from "./ChatBotHeader";

const Quotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quoteData, setQuoteData] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useIsOnline();

  const URL = "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
  // const URL = "http://localhost:3000"; // Local development

  const fetchQuotes = async (answers: AnswersType): Promise<DataResponse> => {
    const response = await fetch(URL + "api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*", // Not needed for POST requests
      },
      body: JSON.stringify(answers),
    });
    if (!response.ok) {
      setError(`Error fetching quotes: ${response}`);
    }
    setError(null);
    const { quotes } = await response.json();
    setTimeout(() => {
      setIsLoading(false); // Todo: move this
    }, 3000); // Simulate loading delay
    return quotes;
  };

  useEffect(() => {
    if (!location.state) navigate("/info");
    // Validate the answers to ensure they are complete
    const answers = location.state as AnswersType;
    const requiredFields = [
      "name",
      "email",
      "zip",
      "petName",
      "animal",
      "gender",
      "age",
      "breed",
      "reference",
    ];
    let isComplete = true;
    for (const field of requiredFields) {
      if (
        answers[field as keyof AnswersType] === undefined ||
        answers[field as keyof AnswersType] === "" ||
        (typeof answers[field as keyof AnswersType] === "object" &&
          Object.values(answers[field as keyof AnswersType] as object).some(
            (v) => v === "" || v === 0
          ))
      ) {
        isComplete = false;
        break;
      }
    }

    if (!isComplete) {
      // If answers are missing or incomplete, redirect to /info
      navigate("/info");
    } else {
      // Fetch quotes based on the answers
      fetchQuotes(answers as AnswersType).then((data: DataResponse) => {
        for (const dataItem of data) {
          for (const dataQuoteItem of dataItem.quotes) {
            const newQuote: QuoteItem = {
              ...dataQuoteItem,
              providerId: dataItem.providerId,
            };
            setQuoteData((prev) => [...prev, newQuote]);
          }
        }
      });
    }
  }, [location.state]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 space-y-4 bg-(--background-light) h-screen pt-20">
      <ChatbotHeader />
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
