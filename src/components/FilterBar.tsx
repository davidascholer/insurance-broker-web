// Create a full width filter bar with a light pink background and rounded corners that contains dropdowns for filtering quotes
import { cn } from "@/lib/utils";
import ChatBot from "./ChatBot";
import { ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ANNUAL_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  REIMBURSEMENT_RATE_OPTIONS,
} from "@/lib/constants";
import type { FilterOptionType } from "@/lib/types";
import InfoTooltip from "./InfoTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FilterOptions = ({
  options,
  selectedOption,
  handleClick,
  tooltip,
}: {
  options: FilterOptionType[];
  selectedOption: FilterOptionType;
  handleClick: (option: FilterOptionType) => void;
  tooltip?: React.ReactNode;
}) => {
  return (
    <div className={"flex flex-row gap-2 justify-center items-center"}>
      {tooltip}
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-auto text-(--coral-light) hover:text-(--coral-light) transition-colors duration-300 cursor-pointer nunito-sans-medium outline-none">
          <div
            className={cn(
              "text-sm text-(--primary-teal-dark) w-24 text-center lowercase px-2 py-1 m-1 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer nunito-sans-medium bg-(--coral-light) hover:bg-(--primary-coral)"
            )}
          >
            {selectedOption.label}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 text-center mr-auto transition-colors duration-300 cursor-pointer nunito-sans-bold bg-(--primary-teal-dark) text-(--coral-light)">
          {options.map((option, key) => (
            <DropdownMenuItem
              key={key}
              className={cn(
                "sansita-bold cursor-pointer p-2 mt-1 rounded-full justify-center focus:bg-(--primary-coral)",
                option.value === selectedOption.value &&
                  "bg-(--coral-light) text-(--primary-teal-dark)"
              )}
              onClick={() => handleClick(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const FilterSection = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <span className="sansita-bold text-2xl upp">{title}</span>
      </div>
      {children}
    </div>
  );
};

const FilterBar = ({
  handleDeductibleClicked,
  handleReimbursementRateClicked,
  handleAnnualLimitClicked,
  selectedDeductible,
  selectedReimbursement,
  selectedLimit,
}: // sortItems,
// sortItemSelected,
{
  handleDeductibleClicked: (deductible: FilterOptionType) => void;
  handleReimbursementRateClicked: (rate: FilterOptionType) => void;
  handleAnnualLimitClicked: (limit: FilterOptionType) => void;
  selectedDeductible: FilterOptionType;
  selectedReimbursement: FilterOptionType;
  selectedLimit: FilterOptionType;
  // sortItems: (item: SortItemType) => void;
  // sortItemSelected?: SortItemType;
}) => {
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [chatbotOpen, setChatbotOpen] = useState(true);
  const [backToTopTransparent, setBackToTopTransparent] = useState(true);
  const [backToTopHidden, setBackToTopHidden] = useState(true);
  const [firstClick, setFirstClick] = useState(true);

  const handleScroll = () => {
    const scrollContainer = document.getElementById("quotes-scroll-container");
    const rect = filterButtonRef.current?.getBoundingClientRect();
    if (!scrollContainer || !rect) return;

    const stickyPos = scrollContainer.scrollTop;
    if (stickyPos <= 111) {
      // Initial state
      setBackToTopTransparent(true);
    } else {
      setBackToTopHidden(false);
      setBackToTopTransparent(false);
    }
  };
  useEffect(() => {
    const scrollContainer = document.getElementById("quotes-scroll-container");

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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

  // const handleSortItemClicked = (item: SortItemType) => {
  //   sortItems(item);
  // };

  return (
    <>
      <div
        className={cn(
          "w-full max-w-4xl pb-4 mx-auto mt-4 text-(--coral-light) bg-(--primary-teal-dark) rounded-t-lg p-4 flex flex-col gap-2 md:gap-6 items-center justify-between shadow-md "
        )}
      >
        <div className="flex flex-row flex-wrap justify-evenly items-start w-full gap-12">
          <FilterSection title="Annual Deductible">
            <FilterOptions
              options={DEDUCTIBLE_OPTIONS}
              selectedOption={selectedDeductible}
              handleClick={(option: FilterOptionType) => {
                handleDeductibleClicked(option);
              }}
              tooltip={
                <InfoTooltip msg="The deductible is the amount you pay out of pocket for veterinary care before your pet insurance starts to pay. For example, if your plan has a $100 deductible, you'll need to pay the first $100 of your vet bills before your insurance coverage kicks in. Lower is better but usually leads to higher dues." />
              }
            />
          </FilterSection>
          <FilterSection title="Reimbursement Rate">
            <FilterOptions
              options={REIMBURSEMENT_RATE_OPTIONS}
              selectedOption={selectedReimbursement}
              handleClick={(option: FilterOptionType) => {
                handleReimbursementRateClicked(option);
              }}
              tooltip={
                <InfoTooltip msg="Reimbursement percentage is the portion of your vet bill that your pet insurance will cover after you've met your deductible. For example, if your plan has a 90% reimbursement rate and you've met your deductible, the insurance will pay 90% of the eligible vet bill, and you'll be responsible for the remaining 10%. Higher is better but usually leads to higher dues." />
              }
            />
          </FilterSection>
          <FilterSection title="Annual Limit">
            <FilterOptions
              options={ANNUAL_LIMIT_OPTIONS}
              selectedOption={selectedLimit}
              handleClick={(option: FilterOptionType) => {
                handleAnnualLimitClicked(option);
              }}
              tooltip={
                <InfoTooltip msg="Annual limit is the maximum coverage amount your pet insurance will pay for covered veterinary expenses within a specified period, such as annually or per condition. For example, if your plan has a $10,000 annual coverage limit, the insurance will cover up to $10,000 of eligible vet bills in a year. Any costs beyond that limit would be your responsibility. Higher is better but usually leads to higher dues." />
              }
            />
          </FilterSection>
        </div>
      </div>

      <div
        ref={stickyRef}
        className="w-full -mt-4 max-w-4xl mx-auto rounded-b-lg p-4 items-center justify-center flex flex-col gap-4 min-[600px]:flex-row bg-(--primary-teal-dark) min-h-[60px] sticky top-0"
      >
        {/* <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-auto text-(--coral-light) hover:text-(--coral-light) transition-colors duration-300 cursor-pointer nunito-sans-medium outline-none">
              <div className="flex flex-row gap-2 items-center justify-center transition-transform duration-200 ease hover:-translate-y-0.5">
                <span className="">Sort</span>
                <ArrowUpDown size={25} className="" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4 text-center mr-auto transition-colors duration-300 cursor-pointer nunito-sans-bold bg-(--primary-teal-dark) text-(--coral-light)">
              <DropdownMenuItem
                className={cn(
                  "sansita-bold cursor-pointer p-2 mt-1",
                  sortItemSelected === "price" &&
                    "bg-(--coral-light) text-(--primary-teal-dark)"
                )}
                onClick={() => handleSortItemClicked("price")}
              >
                Monthly Price
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "sansita-bold cursor-pointer p-2 mt-1",
                  sortItemSelected === "deductible" &&
                    "bg-(--coral-light) text-(--primary-teal-dark)"
                )}
                onClick={() => handleSortItemClicked("deductible")}
              >
                Annual Deductible
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "sansita-bold cursor-pointer p-2 mt-1",
                  sortItemSelected === "reimbursement" &&
                    "bg-(--coral-light) text-(--primary-teal-dark)"
                )}
                onClick={() => handleSortItemClicked("reimbursement")}
              >
                Reimbursement Rate
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "sansita-bold cursor-pointer p-2 mt-1",
                  sortItemSelected === "limit" &&
                    "bg-(--coral-light) text-(--primary-teal-dark)"
                )}
                onClick={() => handleSortItemClicked("limit")}
              >
                Annual Limit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <div className="flex-1 flex justify-center items-center">
          <button
            ref={filterButtonRef}
            className={cn(
              "flex flex-col select-none justify-center items-center min-[600px]:pr-[60px] cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5",
              backToTopHidden
                ? "hidden"
                : backToTopTransparent
                ? "animate-fade-out-long pointer-events-none"
                : "animate-fade-in"
            )}
            onClick={handleFilterButtonClick}
          >
            <span className="text-(--coral-light) text-sm">Back To Top</span>
            <ListFilter size={20} className="text-(--coral-light)" />
          </button>
        </div>
        <ChatBot
          className="justify-self-end"
          open={chatbotOpen}
          setOpen={setChatbotOpen}
          firstClick={firstClick}
          setFirstClick={setFirstClick}
        />
      </div>
    </>
  );
};

export default FilterBar;
