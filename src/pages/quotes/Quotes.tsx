import Loader from "@/components/Loader";
import type {
  AnnualLimitOptionType,
  AnswersType,
  DeductibleOptionType,
  InsurerOptionsType,
  QuoteItem,
  ReimbursementRateOptionType,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuoteResults from "@/components/QuoteResults";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useIsOnline from "@/hooks/useIsOnline";
import { getQuotes } from "@/lib/api";
import { verifyAnswers } from "@/lib/utils";
import Header from "@/components/header/Header";
import FilterBar from "@/components/FilterBar";
import {
  ANNUAL_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  INSURER_OPTIONS,
  REIMBURSEMENT_RATE_OPTIONS,
} from "@/lib/constants";

const Quotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quoteData, setQuoteData] = useState<QuoteItem[]>([]);
  const [activeQuoteData, setActiveQuoteData] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useIsOnline();
  const [insurers, setInsurers] =
    useState<InsurerOptionsType[]>(INSURER_OPTIONS);

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
        const foundInsurer = INSURER_OPTIONS.find((i) => i.label === insurer);
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
        return [...prev, { label: deductible, value: 0 }];
      }
    });
  };

  const handleReimbursementRateClick = (rate: string) => {
    setReimbursementRates((prev) => {
      if (prev.some((i) => i.label === rate)) {
        return prev.filter((i) => i.label !== rate);
      } else {
        return [...prev, { label: rate, value: 0 }];
      }
    });
  };

  const handleAnnualLimitClick = (limit: string) => {
    setAnnualLimits((prev) => {
      if (prev.some((i) => i.label === limit)) {
        return prev.filter((i) => i.label !== limit);
      } else {
        return [...prev, { label: limit, value: 0 }];
      }
    });
  };

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
          setActiveQuoteData((prev) => [...prev, newQuote]);
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

  // useEffect(() => {
  //   // Filter quoteData based on selected insurers
  //   const updatedSet = quoteData.filter((quote) => {
  //     return insurers.some((i) => i.providerId === quote.providerId);
  //   });
  //   const activeUpdatedSet = activeQuoteData.filter((quote) => {
  //     return insurers.some((i) => i.providerId === quote.providerId);
  //   });

  //   setActiveQuoteData(activeUpdatedSet);
  // }, [insurers, quoteData, activeQuoteData]);

  // useEffect(() => {
  //   // Filter quoteData based on selected deductibles
  //   const updatedSet = quoteData.filter((quote) => {
  //     return deductibles.some((i) => i.value === quote.deductible);
  //   });

  //   setActiveQuoteData(updatedSet);
  // }, [deductibles, quoteData]);

  // useEffect(() => {
  //   // Filter quoteData based on selected reimbursement rates
  //   const updatedSet = quoteData.filter((quote) => {
  //     return reimbursementRates.some(
  //       (i) => i.value === quote.reimbursementPercentage
  //     );
  //   });

  //   setActiveQuoteData(updatedSet);
  // }, [quoteData, reimbursementRates]);

  // useEffect(() => {
  //   // Filter quoteData based on selected annual limits
  //   const updatedSet = quoteData.filter((quote) => {
  //     return annualLimits.some((i) => i.value === quote.coverageLimit);
  //   });

  //   setActiveQuoteData(updatedSet);
  // }, [annualLimits, quoteData]);
  useEffect(() => {
    // Filter quoteData based on selected reimbursement rates
    const updatedSet = quoteData.filter((quote) => {
      return reimbursementRates.some(
        (i) => i.value === quote.reimbursementPercentage
      );
    });

    setActiveQuoteData(updatedSet);
  }, [quoteData, reimbursementRates]);

  useEffect(() => {
    // Filter quoteData based on selected annual limits
    // const updatedSet = quoteData.filter((quote) => {
    //   return annualLimits.some((i) => i.value === quote.coverageLimit);
    // });
    // updatedSet = updatedSet.filter((quote) => {
    //   return deductibles.some((i) => i.value === quote.deductible);
    // });
    const updatedSet = quoteData.filter((quote) => {
      return insurers.some((i) => i.providerId === quote.providerId);
    });
    // updatedSet = updatedSet.filter((quote) => {
    //   return reimbursementRates.some(
    //     (i) => i.value === quote.reimbursementPercentage
    //   );
    // });
    // console.log("FILTERED SET", updatedSet);

    setActiveQuoteData(updatedSet);
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
      {isLoading && isOnline && <Loader />}
      {error && <div className="text-red-600">{error}</div>}
      {!error && !isLoading && (
        <>
          <ScrollArea
            id="quotes-scroll-container"
            className="flex-1 w-full overflow-scroll no-scrollbar"
          >
            <FilterBar
              insurers={insurers}
              handleInsurerClicked={handleInsurerClick}
              deductibles={deductibles}
              handleDeductibleClicked={handleDeductibleClick}
              reimbursementRates={reimbursementRates}
              handleReimbursementRateClicked={handleReimbursementRateClick}
              annualLimits={annualLimits}
              handleAnnualLimitClicked={handleAnnualLimitClick}
            />
            <QuoteResults cards={activeQuoteData} />
          </ScrollArea>
        </>
      )}
    </div>
  );
};
export default Quotes;
