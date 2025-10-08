import type {
  AnswersType,
  FilterOptionType,
  ProviderIdTypes,
  QuoteItem,
  SortItemType,
  // SortItemType,
} from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuoteResults from "@/components/QuoteResults";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useIsOnline from "@/hooks/useIsOnline";
import { gatherQuotesFromInsurer } from "@/api/api";
import { clearCache, cn, getQuoteFromCache, verifyAnswers } from "@/lib/utils";
import Header from "@/components/header/Header";
import FilterBar from "@/components/FilterBar";
import {
  ANNUAL_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  DEV,
  PIPA_PET_KEY,
  PIPA_STORAGE_PREFIX,
  REIMBURSEMENT_RATE_OPTIONS,
} from "@/lib/constants";
import { ChevronsDown } from "lucide-react";
import LoadingQuotes from "@/components/LoadingQuotes";
import { providerClickedTracker } from "@/api/trackers";
import { sendPageview, sendEvent } from "@/lib/analytics";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const LOAD_TIMER = 20; // seconds

const Quotes = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState<QuoteItem[]>([]);
  const [suggestedQuoteData, setSuggestedQuoteData] = useState<QuoteItem[]>([]);
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

  /* Start of filter handlers */
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

  const handleSortQuoteData = (
    sortItem: SortItemType,
    quoteData: QuoteItem[]
  ): QuoteItem[] => {
    // setSortItemSelected(item);

    switch (sortItem) {
      // case "deductible":
      //   setActiveQuoteData((prev) =>
      //     [...prev].sort((a, b) => a.deductible - b.deductible)
      //   );
      //   break;
      // case "reimbursement":
      //   setActiveQuoteData((prev) =>
      //     [...prev].sort(
      //       (a, b) => b.reimbursementPercentage - a.reimbursementPercentage
      //     )
      //   );
      //   break;
      // case "limit":
      //   setActiveQuoteData((prev) =>
      //     [...prev].sort((a, b) => b.coverageLimit - a.coverageLimit)
      //   );
      //   break;
      case "price":
        return quoteData.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
      default:
        return quoteData.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
    }
  };

  /* End of filter handlers */

  // Fetch quotes from all insurers
  const fetchQuotes = async (answers: AnswersType) => {
    setError(null);

    const fetchQuotesFromAPI = async (
      insurer: ProviderIdTypes,
      isFallback = false
    ): Promise<QuoteItem[]> => {
      setIsLoading(true);
      console.log("Fetching quotes from", insurer);
      // Set a maximum time to load the data from the server
      const timeout = setTimeout(() => {
        setIsLoading(false);
        return clearTimeout(timeout);
      }, LOAD_TIMER * 1000); // e.g., 20 seconds
      const insurerQuotes = await gatherQuotesFromInsurer(
        insurer,
        answers,
        isFallback
      );
      if (insurerQuotes) {
        // Append the provider Id (ProviderIdTypes) to the quote data
        insurerQuotes.forEach((quote) => {
          quote.providerId = insurer;
        });
        // Cache the quotes in localStorage with a timestamp
        localStorage.setItem(
          PIPA_STORAGE_PREFIX + insurer + "-quotes",
          JSON.stringify({
            coverageOptions: insurerQuotes,
            timestamp: Date.now(),
          })
        );

        return insurerQuotes;
      }
      console.error(
        `Incorrect or incomplete data returned from ${insurer} API`
      );
      return [];
    };

    const fetchedQuotes: QuoteItem[] = [];
    const suggestedQuoteData: QuoteItem[] = [];
    let allCached = true;

    /* PRUDENT */
    // Check if quotes are cached before fetching from API
    const cachedPrudentQuotes = getQuoteFromCache("prudent");
    if (cachedPrudentQuotes) {
      if (DEV) console.log("DEV LOG", "Using cached prudent quotes");
      fetchedQuotes.push(...cachedPrudentQuotes);
      suggestedQuoteData.push(...cachedPrudentQuotes);
    } else {
      // If no cached quotes, fetch from API
      if (DEV) console.log("DEV LOG", "Fetching new prudent quotes");
      allCached = false;
      const prudentQuotes = await fetchQuotesFromAPI("prudent");
      if (prudentQuotes.length > 0) {
        fetchedQuotes.push(...prudentQuotes);
        suggestedQuoteData.push(...prudentQuotes);
      }
    }

    /* EMBRACE */
    // Check if quotes are cached before fetching from API
    const cachedEmbraceQuotes = getQuoteFromCache("embrace");
    if (cachedEmbraceQuotes) {
      if (DEV) console.log("DEV LOG", "Using cached embrace quotes");
      fetchedQuotes.push(...cachedEmbraceQuotes);
    } else {
      // If no cached quotes, fetch from API
      if (DEV) console.log("DEV LOG", "Fetching new embrace quotes");
      allCached = false;
      const embraceQuotes = await fetchQuotesFromAPI("embrace", true);
      if (embraceQuotes.length > 0) {
        fetchedQuotes.push(...embraceQuotes);
      }
    }

    /* FETCH */
    // Check if quotes are cached before fetching from API
    const cachedFetchQuotes = getQuoteFromCache("fetch");
    if (cachedFetchQuotes) {
      if (DEV) console.log("DEV LOG", "Using cached fetch quotes");
      fetchedQuotes.push(...cachedFetchQuotes);
    } else {
      // If no cached quotes, fetch from API
      if (DEV) console.log("DEV LOG", "Fetching new fetch quotes");
      allCached = false;
      const fetchQuotes = await fetchQuotesFromAPI("fetch", true);
      if (fetchQuotes.length > 0) {
        fetchedQuotes.push(...fetchQuotes);
      }
    }

    /* FIGO */
    // Check if quotes are cached before fetching from API
    const cachedFigoQuotes = getQuoteFromCache("figo");
    if (cachedFigoQuotes) {
      if (DEV) console.log("DEV LOG", "Using cached figo quotes");
      fetchedQuotes.push(...cachedFigoQuotes);
    } else {
      // If no cached quotes, fetch from API
      if (DEV) console.log("DEV LOG", "Fetching new figo quotes");
      allCached = false;
      const figoQuotes = await fetchQuotesFromAPI("figo", true);
      if (figoQuotes.length > 0) {
        fetchedQuotes.push(...figoQuotes);
      }
    }

    if (allCached) setIsLoading(false);
    const sortedFetchedData = handleSortQuoteData("price", fetchedQuotes);
    const sortedSuggestedQuoteData = handleSortQuoteData(
      "price",
      suggestedQuoteData
    );
    setQuoteData(sortedFetchedData?.length > 0 ? sortedFetchedData : []);
    setSuggestedQuoteData(
      sortedSuggestedQuoteData?.length > 0 ? sortedSuggestedQuoteData : []
    );
  };

  const handleInsurerClicked = (insurer: string) => {
    providerClickedTracker({ insurer, petObject });
    sendEvent("external_link", "link_clicked", insurer);
  };

  // const handleYoungerPetClicked = () => {
  //   if (!petObject) return;

  //   fetchQuotes({ ...petObject, age: { value: 18, label: "8 weeks" } });
  // };

  useEffect(() => {
    sendPageview("/quotes", "Quotes");
  }, []);

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
    const selectedDeductiblesQuoteData = quoteData.filter((quote) => {
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

    const selectedReimbursementsQuoteData = selectedDeductiblesQuoteData.filter(
      (quote) => {
        return (
          quote.reimbursementPercentageOption === selectedReimbursement.value
        );
      }
    );

    const selectedLimitsQuoteData = selectedReimbursementsQuoteData.filter(
      (quote) => {
        if (selectedLimit.value <= 5000) {
          return quote.reimbursementLimitOption <= selectedLimit.value;
        }
        // Match exact value for all other options
        return quote.reimbursementLimitOption === selectedLimit.value;
      }
    );

    if (DEV) {
      console.log("DEV LOG", "selectedLimits", selectedLimitsQuoteData);
      console.log(
        "DEV LOG",
        "selectedReimbursements",
        selectedReimbursementsQuoteData
      );
      console.log(
        "DEV LOG",
        "selectedDeductibles",
        selectedDeductiblesQuoteData
      );
    }

    const sortedQuoteData = handleSortQuoteData(
      "price",
      selectedLimitsQuoteData
    );
    setActiveQuoteData(sortedQuoteData);
  }, [annualLimits, deductibles, quoteData, reimbursementRates]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen px-4 pt-24 pb-8 space-y-4 bg-(--light-pink) h-screen">
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
            className="flex-1 w-full overflow-scroll scrollbar-theme-color"
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
            <div className="text-start w-full max-w-4xl sansita-regular my-4 text-lg mx-auto">
              <HoverCard>
                <HoverCardTrigger className="text-white sansita-regular cursor-default bg-(--primary-teal-dark) px-4 py-3 rounded-full hover:bg-(--primary-teal) hover:shadow-md transition-all duration-300 ease-in-out">
                  <Link to="/info/?edit=true" onClick={() => clearCache()}>
                    Edit information
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-4 ml-4">
                  <Link
                    to="/info/?edit=true"
                    className="text-(--primary-teal-dark) sansita-regular hover:bg-(--primary-teal-dark) hover:text-white px-4 py-3 rounded-full transition-all duration-200 ease hover:shadow-sm"
                    onClick={() => {
                      clearCache();
                    }}
                  >
                    Edit {petObject.petName}'s information
                  </Link>
                  <Link
                    to="/info/?edit=true"
                    className="text-(--primary-teal-dark) sansita-regular hover:bg-(--primary-teal-dark) hover:text-white px-4 py-3 rounded-full transition-all duration-200 ease hover:shadow-sm"
                    onClick={() => {
                      clearCache();
                      localStorage.removeItem(PIPA_PET_KEY);
                    }}
                  >
                    Start a new quote
                  </Link>
                </HoverCardContent>
              </HoverCard>
            </div>
            <QuoteResults
              cards={activeQuoteData}
              showFullResults={true}
              petName={petObject.petName}
              handleInsurerClicked={handleInsurerClicked}
            />

            {suggestedQuoteData.length > 0 && (
              <>
                <div className="text-center w-full max-w-4xl sansita-regular px-2 mt-4 text-lg mx-auto">
                  <h2 className="text-(--primary-teal-dark)">
                    Other great options for {petObject.petName}
                  </h2>
                </div>
                <QuoteResults
                  cards={suggestedQuoteData}
                  showFullResults={showFullResults}
                  petName={petObject.petName}
                  handleInsurerClicked={handleInsurerClicked}
                />
              </>
            )}
            <button
              className={cn(
                "flex-1 flex flex-col justify-center items-center sansita-bold cursor-pointer mx-auto mt-6 animate-pulse transition-transform duration-200 ease hover:-translate-y-0.5 z-1",
                showFullResults && "hidden",
                suggestedQuoteData.length >= 10 ? "visible" : "hidden"
              )}
              onClick={() => setShowFullResults(true)}
            >
              <span>View More Options</span>
              <ChevronsDown size={30} className="" />
            </button>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
export default Quotes;
