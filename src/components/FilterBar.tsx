// Create a full width filter bar with a light pink background and rounded corners that contains dropdowns for filtering quotes
import { cn } from "@/lib/utils";
import ChatBot from "./ChatBot";
import { ArrowUpDown, ListFilter } from "lucide-react";
import { useRef, useState } from "react";
import {
  ANNUAL_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  REIMBURSEMENT_RATE_OPTIONS,
} from "@/lib/constants";
import type {
  AnnualLimitOptionType,
  DeductibleOptionType,
  InsurerOptionsType,
  ReimbursementRateOptionType,
  SortItemType,
} from "@/lib/types";
import InfoTooltip from "./InfoTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FilterBar = ({
  insurerOptions,
  insurers,
  handleInsurerClicked,
  deductibles,
  handleDeductibleClicked,
  reimbursementRates,
  handleReimbursementRateClicked,
  annualLimits,
  handleAnnualLimitClicked,
  sortItems,
  sortItemSelected
}: {
  insurerOptions: InsurerOptionsType[];
  insurers: InsurerOptionsType[];
  handleInsurerClicked: (insurer: string) => void;
  deductibles: DeductibleOptionType[];
  handleDeductibleClicked: (deductible: string) => void;
  reimbursementRates: ReimbursementRateOptionType[];
  handleReimbursementRateClicked: (rate: string) => void;
  annualLimits: AnnualLimitOptionType[];
  handleAnnualLimitClicked: (limit: string) => void;
  sortItems: (item: SortItemType) => void;
  sortItemSelected?: SortItemType;
}) => {
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [chatbotOpen, setChatbotOpen] = useState(true);
  const [firstClick, setFirstClick] = useState(true);

  const handleFilterButtonClick = () => {
    const scrollContainer = document.getElementById("quotes-scroll-container");
    const rect = filterButtonRef.current?.getBoundingClientRect();
    if (!scrollContainer || !rect) return;

    if (scrollContainer.scrollTop > 0) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      scrollContainer.scrollTo({ top: rect.top - 60 || 0, behavior: "smooth" });
    }
  };

  const handleSortItemClicked = (item: SortItemType) => {
    sortItems(item);
  };

  return (
    <>
      <div
        className={cn(
          "w-full max-w-4xl pb-4 mx-auto mt-4 text-(--primary-coral) bg-(--primary-teal-dark) rounded-t-lg p-4 flex flex-col gap-2 md:gap-6 items-center justify-between shadow-md "
        )}
      >
        <div className="flex flex-row flex-wrap justify-evenly items-start w-full gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="sansita-bold text-2xl upp">insurers</span>
            {insurerOptions.map((insurer) => (
              <button
                key={insurer.label}
                className={cn(
                  "text-sm text-(--primary-teal-dark) w-24 text-center lowercase px-2 py-1 m-1 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer nunito-sans-medium hover:bg-(--coral-light)",
                  insurers.some((i) => i.label === insurer.label)
                    ? "bg-(--primary-coral)"
                    : "bg-(--primary-coral) opacity-60"
                )}
                onClick={() => handleInsurerClicked(insurer.label)}
              >
                {insurer.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="sansita-bold text-2xl upp">deductible</span>
              <InfoTooltip msg="The deductible is the amount you pay out of pocket for veterinary care before your pet insurance starts to pay. For example, if your plan has a $100 deductible, you'll need to pay the first $100 of your vet bills before your insurance coverage kicks in. Lower is better." />
            </div>
            {DEDUCTIBLE_OPTIONS.map((deductible: { label: string }) => (
              <button
                key={deductible.label}
                className={cn(
                  "text-sm text-(--primary-teal-dark) w-24 text-center lowercase px-2 py-1 m-1 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer nunito-sans-medium hover:bg-(--coral-light)",
                  deductibles.some((i) => i.label === deductible.label)
                    ? "bg-(--primary-coral)"
                    : "bg-(--primary-coral) opacity-60"
                )}
                onClick={() => handleDeductibleClicked(deductible.label)}
              >
                {deductible.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="sansita-bold text-2xl">reimbursement rate</span>
              <InfoTooltip msg="Reimbursement percentage is the portion of your vet bill that your pet insurance will cover after you've met your deductible. For example, if your plan has a 90% reimbursement rate and you've met your deductible, the insurance will pay 90% of the eligible vet bill, and you'll be responsible for the remaining 10%. Higher is better." />
            </div>
            {REIMBURSEMENT_RATE_OPTIONS.map(
              (reimbursementRate: ReimbursementRateOptionType) => (
                <button
                  key={reimbursementRate.label}
                  className={cn(
                    "text-sm text-(--primary-teal-dark) w-24 text-center lowercase px-2 py-1 m-1 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer nunito-sans-medium hover:bg-(--coral-light)",
                    reimbursementRates.some(
                      (i) => i.label === reimbursementRate.label
                    )
                      ? "bg-(--primary-coral)"
                      : "bg-(--primary-coral) opacity-60"
                  )}
                  onClick={() =>
                    handleReimbursementRateClicked(reimbursementRate.label)
                  }
                >
                  {reimbursementRate.label}
                </button>
              )
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="sansita-bold text-2xl upp">annual limit</span>
              <InfoTooltip msg="Annual limit is the maximum coverage amount your pet insurance will pay for covered veterinary expenses within a specified period, such as annually or per condition. For example, if your plan has a $10,000 annual coverage limit, the insurance will cover up to $10,000 of eligible vet bills in a year. Any costs beyond that limit would be your responsibility. Higher is better." />
            </div>
            {ANNUAL_LIMIT_OPTIONS.map((annulLimit: { label: string }) => (
              <button
                key={annulLimit.label}
                className={cn(
                  "text-sm text-(--primary-teal-dark) w-24 text-center lowercase px-2 py-1 m-1 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer nunito-sans-medium hover:bg-(--coral-light)",
                  annualLimits.some((i) => i.label === annulLimit.label)
                    ? "bg-(--primary-coral)"
                    : "bg-(--primary-coral) opacity-60"
                )}
                onClick={() => handleAnnualLimitClicked(annulLimit.label)}
              >
                {annulLimit.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full -mt-4 max-w-4xl mx-auto rounded-b-lg p-4 items-center flex flex-col gap-4 min-[600px]:flex-row bg-(--primary-teal-dark) min-h-[60px] sticky top-0">
        <button
          ref={filterButtonRef}
          className="flex-1 flex flex-col justify-center items-center min-[600px]:pr-[60px] cursor-pointer"
          onClick={handleFilterButtonClick}
        >
          <ListFilter size={30} className="text-(--primary-coral)" />
        </button>
        <ChatBot
          className=""
          open={chatbotOpen}
          setOpen={setChatbotOpen}
          firstClick={firstClick}
          setFirstClick={setFirstClick}
        />
      </div>
      <div className={cn("w-full max-w-4xl mx-auto mt-4")}>
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-auto text-(--primary-teal-dark) hover:text-(--primary-teal) transition-colors duration-300 cursor-pointer nunito-sans-bold mb-4">
            <div className="flex flex-row gap-2 items-center justify-center transition-transform duration-200 ease hover:-translate-y-0.5">
              <span className="">Sort</span>
              <ArrowUpDown size={25} className="" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 text-center mr-auto transition-colors duration-300 cursor-pointer nunito-sans-bold bg-(--primary-teal-dark) text-(--primary-coral)">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              className={cn(
                "sansita-bold cursor-pointer p-2 mt-1",
                sortItemSelected === "price" &&
                  "bg-(--coral-light) text-(--primary-teal-dark)"
              )}
              onClick={() => handleSortItemClicked("price")}
            >
              monthly price
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "sansita-bold cursor-pointer p-2 mt-1",
                sortItemSelected === "deductible" &&
                  "bg-(--coral-light) text-(--primary-teal-dark)"
              )}
              onClick={() => handleSortItemClicked("deductible")}
            >
              deductible
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "sansita-bold cursor-pointer p-2 mt-1",
                sortItemSelected === "reimbursement" &&
                  "bg-(--coral-light) text-(--primary-teal-dark)"
              )}
              onClick={() => handleSortItemClicked("reimbursement")}
            >
              reimbursement rate
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "sansita-bold cursor-pointer p-2 mt-1",
                sortItemSelected === "limit" &&
                  "bg-(--coral-light) text-(--primary-teal-dark)"
              )}
              onClick={() => handleSortItemClicked("limit")}
            >
              annual limit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FilterBar;
