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
import {
  clearCache,
  cn,
  getQuoteFromCache,
  matchDeductibleValue,
  verifyAnswers,
} from "@/lib/utils";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { gatherQuotesFromInsurer } from "@/api/util";
import LoadingOverlay from "@/components/LoadingOverlay";
import { mapFilterOptionToKanguroDeductible } from "@/features/kanguro/lib/util";
import type { KanguroCoverageType } from "@/features/kanguro/lib/types";
// import { registerQuoteLinkClick } from "@/features/analytics/emitters";

const LOAD_TIMER = 20; // seconds

const Quotes = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState<QuoteItem[]>([]);
  const [suggestedQuoteData, setSuggestedQuoteData] = useState<QuoteItem[]>([]);
  // const [sortItemSelected, setSortItemSelected] =
  //   useState<SortItemType>("price");
  const [activeQuoteData, setActiveQuoteData] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
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

  const pushBackupsToEnd = (quoteData: QuoteItem[]): QuoteItem[] => {
    const scrapedData: QuoteItem[] = [];
    const liveData: QuoteItem[] = [];

    quoteData.forEach((quote) => {
      if (quote.providerId === "prudent" || quote.providerId === "kanguro") {
        liveData.push(quote);
      } else {
        scrapedData.push(quote);
      }
    });

    return [...liveData, ...scrapedData];
  };

  /* End of filter handlers */

  const setLoader = (full = false) => {
    if (full) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        return clearTimeout(timeout);
      }, LOAD_TIMER * 1000); // e.g., 20 seconds
    } else {
      setOverlayVisible(true);
      const timeout = setTimeout(() => {
        setOverlayVisible(false);
        return clearTimeout(timeout);
      }, 1.5 * 1000); // 1.5 seconds
    }
  };

  const fetchQuotesFromAPI = async (
    insurer: ProviderIdTypes,
    answers: AnswersType,
    isFallback = false
  ): Promise<QuoteItem[]> => {
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
    console.error(`Incorrect or incomplete data returned from ${insurer} API`);
    return [];
  };

  // Fetch quotes from all insurers
  const fetchInitialQuotes = async (answers: AnswersType) => {
    setError(null);

    setLoader(true);

    const fetchedQuotes: QuoteItem[] = [];
    const suggestedQuoteData: QuoteItem[] = [];
    let allCached = true;

    /* EMBRACE */
    try {
      // Check if quotes are cached before fetching from API
      const cachedEmbraceQuotes = getQuoteFromCache("embrace");
      if (cachedEmbraceQuotes) {
        if (DEV) console.log("DEV LOG", "Using cached embrace quotes");
        fetchedQuotes.push(...cachedEmbraceQuotes);
      } else {
        // If no cached quotes, fetch from API
        if (DEV) console.log("DEV LOG", "Fetching new embrace quotes");
        allCached = false;
        const embraceQuotes = await fetchQuotesFromAPI(
          "embrace",
          answers,
          true
        );
        if (embraceQuotes.length > 0) {
          fetchedQuotes.push(...embraceQuotes);
        }
      }
    } catch (e) {
      console.error("Error fetching embrace quotes:", e);
    }

    /* FETCH */
    try {
      // Check if quotes are cached before fetching from API
      const cachedFetchQuotes = getQuoteFromCache("fetch");
      if (cachedFetchQuotes) {
        if (DEV) console.log("DEV LOG", "Using cached fetch quotes");
        fetchedQuotes.push(...cachedFetchQuotes);
      } else {
        // If no cached quotes, fetch from API
        if (DEV) console.log("DEV LOG", "Fetching new fetch quotes");
        allCached = false;
        const fetchQuotes = await fetchQuotesFromAPI("fetch", answers, true);
        if (fetchQuotes.length > 0) {
          fetchedQuotes.push(...fetchQuotes);
        }
      }
    } catch (e) {
      console.error("Error fetching fetch quotes:", e);
    }

    /* FIGO */
    try {
      // Check if quotes are cached before fetching from API
      const cachedFigoQuotes = getQuoteFromCache("figo");
      if (cachedFigoQuotes) {
        if (DEV) console.log("DEV LOG", "Using cached figo quotes");
        fetchedQuotes.push(...cachedFigoQuotes);
      } else {
        // If no cached quotes, fetch from API
        if (DEV) console.log("DEV LOG", "Fetching new figo quotes");
        allCached = false;
        const figoQuotes = await fetchQuotesFromAPI("figo", answers, true);
        if (figoQuotes.length > 0) {
          fetchedQuotes.push(...figoQuotes);
        }
      }
    } catch (e) {
      console.error("Error fetching figo quotes:", e);
    }

    /* PRUDENT */
    try {
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
        const prudentQuotes = await fetchQuotesFromAPI("prudent", answers);
        if (prudentQuotes.length > 0) {
          fetchedQuotes.push(...prudentQuotes);
          suggestedQuoteData.push(...prudentQuotes);
        }
      }
    } catch (e) {
      console.error("Error fetching prudent quotes:", e);
    }

    /* KANGURO */
    try {
      // Check if quotes are cached before fetching from API
      const cachedKanguroQuotes = getQuoteFromCache("kanguro");
      if (cachedKanguroQuotes) {
        if (DEV) console.log("DEV LOG", "Using cached kanguro quotes");
        fetchedQuotes.push(...cachedKanguroQuotes);
        suggestedQuoteData.push(...cachedKanguroQuotes);
      } else {
        // If no cached quotes, fetch from API
        if (DEV) console.log("DEV LOG", "Fetching new kanguro quotes");
        allCached = false;

        // Todo: put this into a function fro here...
        const kanguroDeductible = mapFilterOptionToKanguroDeductible(
          selectedDeductible.value
        );
        const kanguroAnnualLimit: string =
          selectedLimit.value === 999999
            ? "Unlimited"
            : selectedLimit.value.toString();

        const kanguroCoverage = {
          deductible: kanguroDeductible,
          reimbursementRate: selectedReimbursement.value,
          annualLimit: kanguroAnnualLimit,
        } as KanguroCoverageType;

        const kanguroPetObject = {
          ...answers,
          coverage: kanguroCoverage,
        };
        // To here.
        const kanguroQuotes = await fetchQuotesFromAPI(
          "kanguro",
          kanguroPetObject
        );
        if (DEV) console.log("DEV LOG", "Kanguro Quotes:", kanguroQuotes);
        if (kanguroQuotes.length > 0) {
          fetchedQuotes.push(...kanguroQuotes);
          suggestedQuoteData.push(...kanguroQuotes);
        }
      }
    } catch (e) {
      console.error("Error fetching kanguro quotes:", e);
    }

    if (allCached) setIsLoading(false);
    const sortedFetchedData = handleSortQuoteData("price", fetchedQuotes);
    const sortedSuggestedQuoteData = handleSortQuoteData(
      "price",
      suggestedQuoteData
    );
    const quoteDataWithBackupsAtEnd = pushBackupsToEnd(sortedFetchedData);
    setQuoteData(
      quoteDataWithBackupsAtEnd?.length > 0 ? quoteDataWithBackupsAtEnd : []
    );
    setSuggestedQuoteData(
      sortedSuggestedQuoteData?.length > 0 ? sortedSuggestedQuoteData : []
    );
  };

  const handleInsurerClicked = async (insurer: string) => {
    if (DEV) console.log("insurer clicked", insurer);
    setOverlayVisible(true);
    setTimeout(() => {
      setOverlayVisible(false);
    }, 3000);
  };

  // const handleYoungerPetClicked = () => {
  //   if (!petObject) return;

  //   fetchQuotes({ ...petObject, age: { value: 18, label: "8 weeks" } });
  // };

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
      fetchInitialQuotes(petObject);
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
    const quoteDataWithBackupsAtEnd = pushBackupsToEnd(sortedQuoteData);
    setActiveQuoteData(quoteDataWithBackupsAtEnd);
  }, [annualLimits, deductibles, quoteData, reimbursementRates]);

  useEffect(() => {
    /* KANGURO */
    /* on options changed */
    try {
      // Check if quotes are cached before fetching from API
      const cachedKanguroQuotes = getQuoteFromCache("kanguro");

      if (!cachedKanguroQuotes) return;

      // Iterate through the cached quotes to see if any match the current filter values
      const isValidCache =
        cachedKanguroQuotes?.filter((quote) => {
          const deductibleMatch = matchDeductibleValue(
            quote.deductibleOption,
            selectedDeductible.value
          );
          return (
            deductibleMatch &&
            quote.reimbursementPercentageOption ===
              selectedReimbursement.value &&
            quote.reimbursementLimitOption === selectedLimit.value
          );
        }).length > 0;

      if (isValidCache) return;

      // If no cached quotes, fetch from API
      const fetchFromApi = async () => {
        if (DEV) console.log("DEV LOG", "Fetching new kanguro quotes");

        // Todo: put this into a function fro here...
        const kanguroDeductible = mapFilterOptionToKanguroDeductible(
          selectedDeductible.value
        );
        const kanguroAnnualLimit: string =
          selectedLimit.value === 999999
            ? "Unlimited"
            : selectedLimit.value.toString();

        const kanguroCoverage = {
          deductible: kanguroDeductible,
          reimbursementRate: selectedReimbursement.value,
          annualLimit: kanguroAnnualLimit,
        } as KanguroCoverageType;

        const kanguroPetObject = {
          ...petObject,
          coverage: kanguroCoverage,
        };
        // To here.

        // Show the loading screen
        if (!isLoading) setOverlayVisible(true);
        const kanguroQuotes = await fetchQuotesFromAPI(
          "kanguro",
          kanguroPetObject
        );
        // Hide the loading screen
        setOverlayVisible(false);

        if (DEV) console.log("DEV LOG", "Kanguro Quotes:", kanguroQuotes);
        if (kanguroQuotes.length > 0) {
          // Replace the old kanguro quotes with the new ones
          const updatedQuoteData = quoteData.filter(
            (quote) => quote.providerId !== "kanguro"
          );
          const newQuoteData = [...updatedQuoteData, ...kanguroQuotes];
          setQuoteData(newQuoteData);
          /*
    const sortedFetchedData = handleSortQuoteData("price", fetchedQuotes);
    const sortedSuggestedQuoteData = handleSortQuoteData(
      "price",
      suggestedQuoteData
    );
    const quoteDataWithBackupsAtEnd = pushBackupsToEnd(sortedFetchedData);
    setQuoteData(
      quoteDataWithBackupsAtEnd?.length > 0 ? quoteDataWithBackupsAtEnd : []
    );
    setSuggestedQuoteData(
      sortedSuggestedQuoteData?.length > 0 ? sortedSuggestedQuoteData : []
    );

*/
        }
      };
      fetchFromApi();
    } catch (e) {
      console.error("Error fetching kanguro quotes:", e);
    }
    /* END KANGURO */
  }, [selectedDeductible, selectedLimit, selectedReimbursement]);

  return (
    <>
      <LoadingOverlay isVisible={overlayVisible} zIndex={101} />
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
                    <Link
                      to="/info/?edit=true"
                      aria-label="edit information"
                      onClick={() => {
                        clearCache();
                      }}
                    >
                      Edit Information
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col gap-4 ml-4">
                    <Link
                      to="/info/?edit=true"
                      aria-label="edit information"
                      className="text-(--primary-teal-dark) cursor-pointer sansita-regular hover:bg-(--primary-teal-dark) hover:text-white px-4 py-3 rounded-full transition-all duration-200 ease hover:shadow-sm"
                      onClick={() => {
                        clearCache();
                      }}
                    >
                      Edit {petObject.petName}'s information
                    </Link>
                    <Link
                      to="/info/?edit=true"
                      className="text-(--primary-teal-dark) cursor-pointer sansita-regular hover:bg-(--primary-teal-dark) hover:text-white px-4 py-3 rounded-full transition-all duration-200 ease hover:shadow-sm"
                      aria-label="edit information"
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
                petObject={petObject}
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
                    petObject={petObject}
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
    </>
  );
};
export default Quotes;
