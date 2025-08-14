import type {
  AnnualLimitOptionType,
  AnswersType,
  DeductibleOptionType,
  InsurerOptionsType,
  ProviderIdTypes,
  QuoteItem,
  QuotesResultType,
  ReimbursementRateOptionType,
  SortItemType,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuoteResults from "@/components/QuoteResults";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useIsOnline from "@/hooks/useIsOnline";
import { getQuotes } from "@/lib/api";
import { cn, verifyAnswers } from "@/lib/utils";
import Header from "@/components/header/Header";
import FilterBar from "@/components/FilterBar";
import {
  ANNUAL_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  INSURER_OPTIONS,
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
  const [sortItemSelected, setSortItemSelected] =
    useState<SortItemType>("price");
  const [activeQuoteData, setActiveQuoteData] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useIsOnline();
  const [insurers, setInsurers] = useState<InsurerOptionsType[]>([]);
  const [showFullResults, setShowFullResults] = useState<boolean>(false);
  const [insurerOptions, setInsurerOptions] = useState<InsurerOptionsType[]>(
    []
  );

  const [deductibles, setDeductibles] =
    useState<DeductibleOptionType[]>(DEDUCTIBLE_OPTIONS);
  const [reimbursementRates, setReimbursementRates] = useState<
    ReimbursementRateOptionType[]
  >(REIMBURSEMENT_RATE_OPTIONS);
  const [annualLimits, setAnnualLimits] =
    useState<AnnualLimitOptionType[]>(ANNUAL_LIMIT_OPTIONS);

  const handleInsurerClick = (insurer: string) => {
    setInsurers((prev) => {
      if (prev.some((i) => i.label === insurer)) {
        // If already selected, remove it
        return prev.filter((i) => i.label !== insurer);
      } else {
        // Otherwise, add it by finding the full insurer object from INSURER_OPTIONS
        const foundInsurer = insurerOptions.find((i) => i.label === insurer);
        return foundInsurer ? [...prev, foundInsurer] : prev;
      }
    });
  };

  const handleDeductibleClick = (deductible: string) => {
    setDeductibles((prev) => {
      if (prev.some((i) => i.label === deductible)) {
        // If already selected, remove it
        return prev.filter((i) => i.label !== deductible);
      } else {
        // Otherwise, add it with a default value (e.g., 0)
        const foundDeductible = DEDUCTIBLE_OPTIONS.find(
          (i) => i.label === deductible
        );
        return foundDeductible ? [...prev, foundDeductible] : prev;
      }
    });
  };

  const handleReimbursementRateClick = (rate: string) => {
    setReimbursementRates((prev) => {
      if (prev.some((i) => i.label === rate)) {
        return prev.filter((i) => i.label !== rate);
      } else {
        const foundReimbursement = REIMBURSEMENT_RATE_OPTIONS.find(
          (i) => i.label === rate
        );
        return foundReimbursement ? [...prev, foundReimbursement] : prev;
      }
    });
  };

  const handleAnnualLimitClick = (limit: string) => {
    setAnnualLimits((prev) => {
      if (prev.some((i) => i.label === limit)) {
        return prev.filter((i) => i.label !== limit);
      } else {
        const foundLimit = ANNUAL_LIMIT_OPTIONS.find((i) => i.label === limit);
        return foundLimit ? [...prev, foundLimit] : prev;
      }
    });
  };

  const handleSortItemClicked = (item: SortItemType) => {
    setSortItemSelected(item);

    switch (item) {
      case "deductible":
        setActiveQuoteData((prev) =>
          [...prev].sort((a, b) => a.deductible - b.deductible)
        );
        break;
      case "reimbursement":
        setActiveQuoteData((prev) =>
          [...prev].sort(
            (a, b) => b.reimbursementPercentage - a.reimbursementPercentage
          )
        );
        break;
      case "limit":
        setActiveQuoteData((prev) =>
          [...prev].sort((a, b) => b.coverageLimit - a.coverageLimit)
        );
        break;
      case "price":
        setActiveQuoteData((prev) =>
          [...prev].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
        );
        break;
      default:
        setActiveQuoteData((prev) =>
          [...prev].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
        );
        break;
    }
  };

  const setInsurerOptionOnFetch = (providerId: ProviderIdTypes) => {
    const newInsurer = INSURER_OPTIONS.find(
      (insurer) => insurer.providerId === providerId
    );
    setInsurerOptions((prev) => {
      if (newInsurer && !prev.some((i) => i.providerId === providerId)) {
        return [...prev, newInsurer];
      }
      return prev;
    });
    setInsurers((prev) => {
      if (newInsurer && !prev.some((i) => i.providerId === providerId)) {
        return [...prev, newInsurer];
      }
      return prev;
    });
  };

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
    const pumpkinResult: QuotesResultType = await getQuotes(answers, "pumpkin");
    const petsBestResult: QuotesResultType = await getQuotes(
      answers,
      "petsbest"
    );
    const metlifeResult: QuotesResultType = await getQuotes(answers, "metlife");
    // If DEV, you can stop the loading early if the server has responded from all providers
    if (DEV) {
      if (
        figoResult &&
        fetchResult &&
        embraceResult &&
        pumpkinResult &&
        petsBestResult &&
        metlifeResult
      ) {
        setIsLoading(false);
        clearTimeout(timeout);
      }
    }
    const fetchedQuotes: QuoteItem[] = [];
    if (figoResult.success && figoResult.quotes) {
      setInsurerOptionOnFetch("figo");
      const figoQuotes = figoResult.quotes.map((quote) => ({
        ...quote,
        providerId: "figo" as const,
      }));
      if (figoQuotes) {
        fetchedQuotes.push(...figoQuotes);
      }
    }
    if (fetchResult.success && fetchResult.quotes) {
      setInsurerOptionOnFetch("fetch");
      const fetchQuotes = fetchResult.quotes.map((quote) => ({
        ...quote,
        providerId: "fetch" as const,
      }));
      if (fetchQuotes) {
        fetchedQuotes.push(...fetchQuotes);
      }
    }
    if (embraceResult.success && embraceResult.quotes) {
      setInsurerOptionOnFetch("embrace");
      const embraceQuotes = embraceResult.quotes.map((quote) => ({
        ...quote,
        providerId: "embrace" as const,
      }));
      if (embraceQuotes) {
        fetchedQuotes.push(...embraceQuotes);
      }
    }
    if (pumpkinResult.success && pumpkinResult.quotes) {
      setInsurerOptionOnFetch("pumpkin");
      const pumpkinQuotes = pumpkinResult.quotes.map((quote) => ({
        ...quote,
        providerId: "pumpkin" as const,
      }));
      if (pumpkinQuotes) {
        fetchedQuotes.push(...pumpkinQuotes);
      }
    }
    if (petsBestResult.success && petsBestResult.quotes) {
      setInsurerOptionOnFetch("petsbest");
      const petsBestQuotes = petsBestResult.quotes.map((quote) => ({
        ...quote,
        providerId: "petsbest" as const,
      }));
      if (petsBestQuotes) {
        fetchedQuotes.push(...petsBestQuotes);
      }
    }
    if (metlifeResult.success && metlifeResult.quotes) {
      setInsurerOptionOnFetch("metlife");
      const metlifeQuotes = metlifeResult.quotes.map((quote) => ({
        ...quote,
        providerId: "metlife" as const,
      }));
      if (metlifeQuotes) {
        fetchedQuotes.push(...metlifeQuotes);
      }
    }
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
    const whiteList = quoteData.filter((quote) => {
      const insurerMatch = insurers.some(
        (i) => i.providerId === quote.providerId
      );

      const deductibleMatch =
        quote.deductible <= 100
          ? deductibles.some((i) => i.value <= 100)
          : deductibles.some((i) => quote.deductible === i.value);
      const reimbursementMatch = reimbursementRates.some((i) => {
        return i.value === quote.reimbursementPercentage;
      });

      const annualLimitMatch = annualLimits.some(
        (i) => i.value === quote.coverageLimit
      );

      return (
        insurerMatch &&
        deductibleMatch &&
        reimbursementMatch &&
        annualLimitMatch
      );
    });

    setActiveQuoteData(whiteList);
    handleSortItemClicked("price");
  }, [annualLimits, deductibles, insurers, quoteData, reimbursementRates]);

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
      {isLoading && isOnline && <LoadingQuotes progressTimerSeconds={LOAD_TIMER}/>}
      {error && <div className="text-red-600">{error}</div>}
      {!error && !isLoading && (
        <>
          <ScrollArea
            id="quotes-scroll-container"
            className="flex-1 w-full overflow-scroll no-scrollbar"
          >
            <FilterBar
              insurerOptions={insurerOptions}
              insurers={insurers}
              handleInsurerClicked={handleInsurerClick}
              deductibles={deductibles}
              handleDeductibleClicked={handleDeductibleClick}
              reimbursementRates={reimbursementRates}
              handleReimbursementRateClicked={handleReimbursementRateClick}
              annualLimits={annualLimits}
              handleAnnualLimitClicked={handleAnnualLimitClick}
              sortItems={handleSortItemClicked}
              sortItemSelected={sortItemSelected}
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
