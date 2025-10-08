import React from "react";
import { cn, formatNumberToPercent, formatNumberToPrice } from "@/lib/utils";
import type { DataQuoteItem } from "@/lib/types";

const PrudentContentDetail = ({
  title,
  accidentOnly,
  className,
}: {
  title: string;
  accidentOnly: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full min-w-[150px] border-(--primary-coral) border-2 px-8 py-2 rounded-lg text-(--primary-coral) flex flex-col items-center gap-4 flex-1 shadow-lg",
        className
      )}
    >
      <h2 className="text-xl text-center sansita-bold">{title}</h2>
      <ul className="list-none list-inside text-(--primary-teal-dark) text-sm flex flex-col gap-2 w-full">
        <li className="flex justify-between flex-row no-wrap">
          <span>Alternative Therapies* (if prescribed by a vet)</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Bite Wounds</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Broken Bones</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Prescription Meds</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Radiology & Diagnostic Tests</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Surgery & Specialized Care</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Swallowed Objects</span>
          <img src="/check.svg" className="size-6" />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Urinary Infections</span>
          <img src="/check.svg" className="size-6" />
        </li>

        <li className="flex justify-between flex-row no-wrap">
          <span>Cancer & Growths</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Cancer Treatments</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Congenital (Birth) Defects or Abnormalities</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Dental & Gum Disease</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Digestive Illness</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Emergencies & Hospitalizations</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Eye, Ear, Skin Conditions</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Hereditary Conditions</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Hip Dysplasia</span>
          <img
            src={accidentOnly ? "/x.svg" : "/check.svg"}
            className="size-6"
          />
        </li>
        <li className="flex justify-between flex-row no-wrap">
          <span>Exam Fees (if added)</span>
          <span className="text-xs font-bold">Optional Add-On</span>
        </li>
      </ul>
    </div>
  );
};

const PrudentQuoteDetail = ({
  providerId,
  relatedPlan,
  handleInsurerClicked,
  className,
}: {
  providerId: string;
  relatedPlan: DataQuoteItem;
  handleInsurerClicked: (insurer: string) => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " border-(--primary-coral) border-2 p-4 rounded-lg text-(--primary-teal-dark) flex flex-col items-center gap-1 flex-1 shadow-lg",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="font-bold text-xl text-(--primary-coral) text-center sansita-bold">
          {"Monthly Price"}
        </h3>
        <p className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full">
          {formatNumberToPrice(relatedPlan.monthlyPrice, true)}
        </p>
        {relatedPlan.extras?.planDesc &&
        relatedPlan.extras.planDesc.includes("Accident Only") ? (
          <p className="text-center">Accident Only</p>
        ) : (
          <p className="text-center">Accident & Illness</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-medium text-center sansita-bold">Annual Limit</h3>
        <p className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full">
          {relatedPlan.reimbursementLimitOption === 999999
            ? "Unlimited"
            : formatNumberToPrice(relatedPlan.reimbursementLimitOption)}
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        <div className="text-xs flex flex-col gap-1 justify-center items-center">
          <h3 className="font-light dark:text-neutral-200 text-center sansita-bold">
            {"Annual Deductible"}
          </h3>
          <p className="text-xs nunito-sans-bold px-4 py-3 rounded-3xl font-bold text-center w-full">
            {formatNumberToPrice(relatedPlan.deductibleOption) || ""}
          </p>
        </div>
        <div className="">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h3 className="text-xs font-light text-center sansita-bold">
              {"Reimbursement Rate"}
            </h3>
          </div>
          <p className="text-xs nunito-sans-bold px-4 py-3 rounded-3xl font-bold text-center w-full">
            {formatNumberToPercent(relatedPlan.reimbursementPercentageOption)}
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center mt-4 w-full">
        <a
          href={relatedPlan.extras?.precheckoutUrl}
          onClick={() => handleInsurerClicked(providerId)}
          target="_blank"
          className="px-4 py-3 text-sm rounded-3xl font-bold bg-(--primary-coral) hover:bg-(--coral-light) hover:shadow-sm animate-all text-white text-center w-full"
        >
          Select this coverage
        </a>
      </div>
    </div>
  );
};

const PrudentContent = ({
  relatedPlans,
  providerId,
  isPortrait,
  handleInsurerClicked,
}: {
  relatedPlans: DataQuoteItem[];
  providerId: string;
  isPortrait: boolean;
  handleInsurerClicked: (insurer: string) => void;
}) => (
  <div className="flex flex-col gap-8">
    {relatedPlans.length > 0 && (
      <h1 className="text-xl text-center text-(--primary-teal-dark) sansita-bold">
        Similar Options
      </h1>
    )}

    <div
      className={cn(
        "flex justify-evenly items-center gap-2 py-2 flex-row flex-wrap"
      )}
    >
      {relatedPlans.map((relatedPlan, index) => (
        <PrudentQuoteDetail
          relatedPlan={relatedPlan}
          providerId={providerId}
          key={index}
          handleInsurerClicked={handleInsurerClicked}
        />
      ))}
    </div>

    {/* <div
      className={cn(
        "flex justify-center items-center gap-2 py-2 flex-wrap flex-col",
        isPortrait ? "" : "min-[600px]:flex-row"
      )}
    ></div> */}
    <h1 className="text-xl text-center text-(--primary-teal-dark) sansita-bold">
      Details
    </h1>
    <div
      className={cn(
        "flex justify-center items-center gap-2 py-2 no-wrap flex-col",
        isPortrait ? "" : "min-[600px]:flex-row"
      )}
    >
      <PrudentContentDetail title="Accident Only" accidentOnly={true} />
      <PrudentContentDetail title="Accident & Illness" accidentOnly={false} />
    </div>
  </div>
);

export default PrudentContent;
