import type {
  AnswersType,
  FilterOptionType,
  QuoteItem,
  QuotesResultType,
  // SortItemType,
} from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuoteResults from "@/components/QuoteResults";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useIsOnline from "@/hooks/useIsOnline";
import { getQuotes } from "@/api/api";
import { cn, verifyAnswers } from "@/lib/utils";
import Header from "@/components/header/Header";
import FilterBar from "@/components/FilterBar";
import {
  ANNUAL_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  DEV,
  PIPA_PET_KEY,
  REIMBURSEMENT_RATE_OPTIONS,
} from "@/lib/constants";
import { ChevronsDown } from "lucide-react";
import LoadingQuotes from "@/components/LoadingQuotes";
import { providerClickedTracker } from "@/api/trackers";

const LOAD_TIMER = 20; // seconds

const Quotes = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState<QuoteItem[]>([]);
  // const [sortItemSelected, setSortItemSelected] =
  //   useState<SortItemType>("price");
  const [activeQuoteData, setActiveQuoteData] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useIsOnline();
  const [showFullResults, setShowFullResults] = useState<boolean>(false);
  const [selectedDeductible, setSelectedDeductible] =
    useState<FilterOptionType>(
      DEDUCTIBLE_OPTIONS.find((d) => d.value === 250) || DEDUCTIBLE_OPTIONS[0]
    );
  const [selectedReimbursement, setSelectedReimbursement] =
    useState<FilterOptionType>(
      REIMBURSEMENT_RATE_OPTIONS.find((rr) => rr.value === 80) ||
        REIMBURSEMENT_RATE_OPTIONS[0]
    );
  const [selectedLimit, setSelectedLimit] = useState<FilterOptionType>(
    ANNUAL_LIMIT_OPTIONS.find((al) => al.value === 10000) ||
      ANNUAL_LIMIT_OPTIONS[0]
  );

  const [deductibles, setDeductibles] = useState<FilterOptionType[]>([]);
  const [reimbursementRates, setReimbursementRates] = useState<
    FilterOptionType[]
  >([]);
  const [annualLimits, setAnnualLimits] = useState<FilterOptionType[]>([]);

  const petObject: AnswersType = useMemo(() => {
    const pet = localStorage.getItem(PIPA_PET_KEY);
    return pet ? JSON.parse(pet) : null;
  }, []);

  // Set a list of all deductible options that match the selected deductible
  const handleDeductibleClicked = (deductible: FilterOptionType) => {
    setSelectedDeductible(deductible);
    const filteredList: FilterOptionType[] = DEDUCTIBLE_OPTIONS.filter(
      (i) => i.value === deductible.value
    );
    setDeductibles(filteredList);
  };
  // Set a list of all reimbursement options that match the selected reimbursement option
  const handleReimbursementRateClicked = (rate: FilterOptionType) => {
    setSelectedReimbursement(rate);
    const filteredList: FilterOptionType[] = REIMBURSEMENT_RATE_OPTIONS.filter(
      (i) => i.value === rate.value
    );
    setReimbursementRates(filteredList);
  };
  // Set a list of all annual limit options that match the selected annual limit option
  const handleAnnualLimitClick = (limit: FilterOptionType) => {
    setSelectedLimit(limit);
    const filteredList: FilterOptionType[] = ANNUAL_LIMIT_OPTIONS.filter(
      (i) => i.value === limit.value
    );
    setAnnualLimits(filteredList);
  };

  /*
  KEEP THIS CODE IN HERE
  This is the future implementation for sorting the quotes once we have APIs
  */
  // const handleSortItemClicked = (item: SortItemType) => {
  //   setSortItemSelected(item);

  //   switch (item) {
  //     case "deductible":
  //       setActiveQuoteData((prev) =>
  //         [...prev].sort((a, b) => a.deductible - b.deductible)
  //       );
  //       break;
  //     case "reimbursement":
  //       setActiveQuoteData((prev) =>
  //         [...prev].sort(
  //           (a, b) => b.reimbursementPercentage - a.reimbursementPercentage
  //         )
  //       );
  //       break;
  //     case "limit":
  //       setActiveQuoteData((prev) =>
  //         [...prev].sort((a, b) => b.coverageLimit - a.coverageLimit)
  //       );
  //       break;
  //     case "price":
  //       setActiveQuoteData((prev) =>
  //         [...prev].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
  //       );
  //       break;
  //     default:
  //       setActiveQuoteData((prev) =>
  //         [...prev].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
  //       );
  //       break;
  //   }
  // };

  const fetchQuotes = async (answers: AnswersType) => {
    setIsLoading(true);
    setError(null);
    // Set a maximum time to load the data from the server
    const timeout = setTimeout(() => {
      setIsLoading(false);
      return clearTimeout(timeout);
    }, LOAD_TIMER * 1000); // e.g., 20 seconds
    const figoResult: QuotesResultType = await getQuotes(answers, "figo");
    const fetchResult: QuotesResultType = await getQuotes(answers, "fetch");
    const embraceResult: QuotesResultType = await getQuotes(answers, "embrace");

    // If DEV, you can stop the loading early if the server has responded from all providers
    if (DEV) {
      if (figoResult && fetchResult && embraceResult) {
        setIsLoading(false);
        clearTimeout(timeout);
      }
    }

    const fetchedQuotes: QuoteItem[] = [];
    if (figoResult.success && figoResult.quotes) {
      const figoQuotes = figoResult.quotes.coverageOptions.map((quote) => ({
        ...quote,
        providerId: "figo" as const,
      }));
      if (DEV) console.log("DEV LOG","figoQuotes", figoQuotes);

      if (figoQuotes) {
        fetchedQuotes.push(...figoQuotes);
      }
    }
    if (fetchResult.success && fetchResult.quotes) {
      const fetchQuotes = fetchResult.quotes.coverageOptions.map((quote) => ({
        ...quote,
        providerId: "fetch" as const,
      }));
      if (DEV) console.log("DEV LOG","fetchQuotes", fetchQuotes);
      if (fetchQuotes) {
        fetchedQuotes.push(...fetchQuotes);
      }
    }
    if (embraceResult.success && embraceResult.quotes) {
      const embraceQuotes = embraceResult.quotes.coverageOptions.map(
        (option) => ({
          ...option,
          providerId: "embrace" as const,
        })
      );
      if (embraceQuotes) {
        fetchedQuotes.push(...embraceQuotes);
      }
    }
    setQuoteData(fetchedQuotes);
    setActiveQuoteData(fetchedQuotes);
  };

  const handleInsurerClicked = (insurer: string) => {
    providerClickedTracker({ insurer, petObject });
  };

  const handleYoungerPetClicked = () => {
    if (!petObject) return;

    fetchQuotes({ ...petObject, age: { value: 18, label: "8 weeks" } });
  };

  useEffect(() => {
    if (!petObject) {
      navigate("/info");
      return;
    }
    // Validate the answers to ensure they are complete
    const answersVerified = verifyAnswers(petObject);
    if (!answersVerified) {
      // If answers are missing or incomplete, redirect to /info
      navigate("/info");
    } else {
      // Fetch quotes based on the answers
      fetchQuotes(petObject);
    }
  }, [petObject, navigate]);

  useEffect(() => {
    // under 100, 100-250, 250-500, 500-1000, 1000+
    const selectedDeductibles = quoteData.filter((quote) => {
      const isLastDeductible =
        selectedDeductible.value ===
        DEDUCTIBLE_OPTIONS[DEDUCTIBLE_OPTIONS.length - 1].value;

      if (isLastDeductible) {
        return quote.deductibleOption >= selectedDeductible.value;
      }

      const nextDeductibleIndex =
        DEDUCTIBLE_OPTIONS.indexOf(selectedDeductible) + 1;
      const nextDeductible = DEDUCTIBLE_OPTIONS[nextDeductibleIndex];

      return (
        quote.deductibleOption >= selectedDeductible.value &&
        quote.deductibleOption <= nextDeductible.value
      );
    });
    if (DEV) console.log("DEV LOG","selectedDeductibles", selectedDeductibles);

    const selectedReimbursements = selectedDeductibles.filter((quote) => {
      return (
        quote.reimbursementPercentageOption === selectedReimbursement.value
      );
    });
    if (DEV) console.log("DEV LOG","selectedReimbursements", selectedReimbursements);

    const selectedLimits = selectedReimbursements.filter((quote) => {
      return quote.reimbursementLimitOption === selectedLimit.value;
    });
    if (DEV) console.log("DEV LOG","selectedLimits", selectedLimits);

    if (DEV) console.log("DEV LOG","whiteList", selectedLimits);
    setActiveQuoteData(selectedLimits);
  }, [annualLimits, deductibles, quoteData, reimbursementRates]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 pt-24 space-y-4 bg-(--light-pink) h-screen">
      <Header showFetchButton={false} />
      {!isOnline && (
        <div>
          <p>
            You do not appear to be online. Please check your connection and
            refresh the page.
          </p>
        </div>
      )}
      {isLoading && isOnline && (
        <LoadingQuotes progressTimerSeconds={LOAD_TIMER} />
      )}
      {error && <div className="text-red-600">{error}</div>}
      {!error && !isLoading && (
        <>
          <ScrollArea
            id="quotes-scroll-container"
            className="flex-1 w-full overflow-scroll no-scrollbar"
          >
            <FilterBar
              handleDeductibleClicked={handleDeductibleClicked}
              handleReimbursementRateClicked={handleReimbursementRateClicked}
              handleAnnualLimitClicked={handleAnnualLimitClick}
              selectedDeductible={selectedDeductible}
              selectedReimbursement={selectedReimbursement}
              selectedLimit={selectedLimit}
              selectedPetType={petObject?.animal || "dog"}
            />
            <div className="text-start w-full max-w-4xl sansita-regular px-2 mt-4 text-lg mx-auto">
              <Link to="/info/?edit=true" className="text-(--primary-teal-dark)">
                Edit {petObject.petName}'s information
              </Link>
            </div>
            <QuoteResults
              cards={activeQuoteData}
              showFullResults={showFullResults}
              handleYoungerPetClicked={handleYoungerPetClicked}
              handleInsurerClicked={handleInsurerClicked}
            />
            <button
              className={cn(
                "flex-1 flex flex-col justify-center items-center sansita-bold cursor-pointer mx-auto mt-6 animate-pulse transition-transform duration-200 ease hover:-translate-y-0.5 z-1",
                showFullResults && "hidden",
                activeQuoteData.length < 10 && "hidden"
              )}
              onClick={() => setShowFullResults(true)}
            >
              <span>view all results</span>
              <ChevronsDown size={30} className="" />
            </button>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
export default Quotes;
