import FullScreenLoader from "@/components/FullScreenLoader";
import type { AnswersType, Quote } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuoteResult from "@/components/QuoteResult";
import ChatBot from "@/components/ChatBot";

const Quotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quoteData, setQuoteData] = useState<Quote[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const URL = "https://pipa-server-41b9ae62ecfa.herokuapp.com/";
  // const URL = "http://localhost:3000"; // Local development

  const fetchQuotes = async (answers: AnswersType): Promise<Quote[]> => {
    console.debug("Fetching quotes with answers:", answers);
    const response = await fetch(URL + "api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": URL,
      },
      // Automatically converted to "username=example&password=password"
      body: JSON.stringify(answers),
      // …
    });
    if (!response.ok) {
      setError(`Error fetching quotes: ${response}`);
    }
    setError(null);
    const { quotes } = (await response.json()) as { quotes: Quote[] };
    setIsLoading(false); // Todo: move this
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
      fetchQuotes(answers as AnswersType).then((data) => {
        setQuoteData(data);
      });
    }
  }, [location.state]);

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {JSON.stringify(quoteData)}
      <ChatBot />
      <QuoteResult />
    </div>
  );
};
export default Quotes;
