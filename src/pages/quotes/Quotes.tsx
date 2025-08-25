import type {
  AnswersType,
  FilterOptionType,
  QuoteItem,
  QuotesResultType,
  // SortItemType,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  REIMBURSEMENT_RATE_OPTIONS,
} from "@/lib/constants";
import { ChevronsDown } from "lucide-react";
import LoadingQuotes from "@/components/LoadingQuotes";

const LOAD_TIMER = 20; // seconds

const Quotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    // const pumpkinResult: QuotesResultType = await getQuotes(answers, "pumpkin");
    // const petsBestResult: QuotesResultType = await getQuotes(
    //   answers,
    //   "petsbest"
    // );
    // const metlifeResult: QuotesResultType = await getQuotes(answers, "metlife");
    // If DEV, you can stop the loading early if the server has responded from all providers
    if (DEV) {
      if (
        figoResult &&
        fetchResult &&
        embraceResult
        // pumpkinResult &&
        // petsBestResult &&
        // metlifeResult
      ) {
        setIsLoading(false);
        clearTimeout(timeout);
      }
    }
    const fetchedQuotes: QuoteItem[] = [];
    if (figoResult.success && figoResult.quotes) {
      // setInsurerOptionOnFetch("figo");
      const figoQuotes = figoResult.quotes.coverageOptions.map((quote) => ({
        ...quote,
        providerId: "figo" as const,
      }));
      if (DEV) console.log("figoQuotes", figoQuotes);

      if (figoQuotes) {
        fetchedQuotes.push(...figoQuotes);
      }
    }
    if (fetchResult.success && fetchResult.quotes) {
      // setInsurerOptionOnFetch("fetch");
      const fetchQuotes = fetchResult.quotes.coverageOptions.map((quote) => ({
        ...quote,
        providerId: "fetch" as const,
      }));
      if (DEV) console.log("fetchQuotes", fetchQuotes);
      if (fetchQuotes) {
        fetchedQuotes.push(...fetchQuotes);
      }
    }
    if (embraceResult.success && embraceResult.quotes) {
      // setInsurerOptionOnFetch("embrace");
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
    // if (pumpkinResult.success && pumpkinResult.quotes) {
    //   // setInsurerOptionOnFetch("pumpkin");
    //   const pumpkinQuotes = pumpkinResult.quotes.map((quote) => ({
    //     ...quote,
    //     providerId: "pumpkin" as const,
    //   }));
    //   if (pumpkinQuotes) {
    //     fetchedQuotes.push(...pumpkinQuotes);
    //   }
    // }
    // if (petsBestResult.success && petsBestResult.quotes) {
    //   // setInsurerOptionOnFetch("petsbest");
    //   const petsBestQuotes = petsBestResult.quotes.map((quote) => ({
    //     ...quote,
    //     providerId: "petsbest" as const,
    //   }));
    //   if (petsBestQuotes) {
    //     fetchedQuotes.push(...petsBestQuotes);
    //   }
    // }
    // if (metlifeResult.success && metlifeResult.quotes) {
    //   // setInsurerOptionOnFetch("metlife");
    //   const metlifeQuotes = metlifeResult.quotes.map((quote) => ({
    //     ...quote,
    //     providerId: "metlife" as const,
    //   }));
    //   if (metlifeQuotes) {
    //     fetchedQuotes.push(...metlifeQuotes);
    //   }
    // }
    setQuoteData(fetchedQuotes);
    setActiveQuoteData(fetchedQuotes);
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
    if (DEV) console.log("selectedDeductibles", selectedDeductibles);

    const selectedReimbursements = selectedDeductibles.filter((quote) => {
      return (
        quote.reimbursementPercentageOption === selectedReimbursement.value
      );
    });
    if (DEV) console.log("selectedReimbursements", selectedReimbursements);

    const selectedLimits = selectedReimbursements.filter((quote) => {
      return quote.reimbursementLimitOption === selectedLimit.value;
    });
    if (DEV) console.log("selectedLimits", selectedLimits);

    if (DEV) console.log("whiteList", selectedLimits);
    setActiveQuoteData(selectedLimits);
    // handleSortItemClicked("price");
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
              // sortItems={handleSortItemClicked}
              selectedDeductible={selectedDeductible}
              selectedReimbursement={selectedReimbursement}
              selectedLimit={selectedLimit}
              // sortItemSelected={sortItemSelected}
            />
            <QuoteResults
              cards={activeQuoteData}
              showFullResults={showFullResults}
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
