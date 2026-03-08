import { cn, formatNumberToPercent, formatNumberToPrice } from "@/lib/utils";
import type { DataQuoteItem } from "@/lib/types";
import { getEmbraceLink } from "../lib/util";

const EmbraceContentDetailListItem = ({
  label,
  isCovered,
  isOptional = false,
}: {
  label: string;
  isCovered: boolean;
  isOptional?: boolean;
}) => (
  <li className="flex justify-between flex-row no-wrap">
    <span>{label}</span>
    {isOptional ? (
      <span className="text-xs font-bold">Optional Add-On</span>
    ) : (
      <img src={isCovered ? "/check.svg" : "/x.svg"} className="size-6 ml-4" />
    )}
  </li>
);

const EmbraceContentDetail = ({
  title,
  isWellness,
  className,
}: {
  title: string;
  isWellness: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full min-w-[150px] border-(--primary-coral) border-2 px-8 py-2 rounded-lg text-(--primary-coral) flex flex-col items-center gap-4 flex-1 shadow-lg",
        className,
      )}
    >
      <h2 className="text-xl text-center sansita-bold">{title}</h2>
      <ul className="list-none list-inside text-(--primary-teal-dark) text-sm flex flex-col gap-2 w-full">
        <EmbraceContentDetailListItem
          label="Accidents & Injuries"
          isCovered={true}
        />
        <EmbraceContentDetailListItem
          label="Illnesses & Diseases"
          isCovered={true}
        />
        <EmbraceContentDetailListItem
          label="Cancer Treatment"
          isCovered={true}
        />
        <EmbraceContentDetailListItem
          label="Hereditary Conditions"
          isCovered={true}
        />
        <EmbraceContentDetailListItem
          label="Chronic Conditions"
          isCovered={true}
        />
        <EmbraceContentDetailListItem label="Emergency Care" isCovered={true} />
        <EmbraceContentDetailListItem
          label="Hospitalization"
          isCovered={true}
        />
        <EmbraceContentDetailListItem label="Surgery" isCovered={true} />
        <EmbraceContentDetailListItem
          label="Diagnostic Tests"
          isCovered={true}
        />
        <EmbraceContentDetailListItem
          label="Prescription Medications"
          isCovered={true}
        />
        <EmbraceContentDetailListItem
          label="Alternative Therapies"
          isCovered={true}
        />

        <EmbraceContentDetailListItem
          label="Wellness Exam"
          isCovered={isWellness}
        />
        <EmbraceContentDetailListItem
          label="Vaccinations"
          isCovered={isWellness}
        />
        <EmbraceContentDetailListItem
          label="Routine Care"
          isCovered={isWellness}
        />
        <EmbraceContentDetailListItem
          label="Dental Cleaning"
          isCovered={isWellness}
        />

        <EmbraceContentDetailListItem
          label="Exam Fee Coverage"
          isCovered={false}
          isOptional={true}
        />
        <EmbraceContentDetailListItem
          label="Prescription Drug & Dental Coverage"
          isCovered={false}
          isOptional={true}
        />
      </ul>
    </div>
  );
};

const EmbraceQuoteDetail = ({
  providerId,
  relatedPlan,
  handleInsurerClicked,
  className,
}: {
  providerId: string;
  relatedPlan: DataQuoteItem;
  handleInsurerClicked: (insurer: string, card: DataQuoteItem) => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " border-(--primary-coral) border-2 p-4 rounded-lg text-(--primary-teal-dark) flex flex-col items-center gap-1 flex-1 shadow-lg",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="font-bold text-xl text-(--primary-coral) text-center sansita-bold">
          {"Monthly Price"}
        </h3>
        <p className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full">
          {formatNumberToPrice(relatedPlan.monthlyPrice, true)}
        </p>
        {relatedPlan.extras?.planDesc ? (
          <p className="text-center">{relatedPlan.extras.planDesc}</p>
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
      <div className="flex-1 flex items-center justify-center mt-4 w-full cursor-pointer">
        <span
          onClick={async () => {
            handleInsurerClicked(providerId, relatedPlan);
            if (relatedPlan.extras?.planObj) {
              const windowReference = window.open();
              const url = await getEmbraceLink(relatedPlan.extras?.planObj);
              if (windowReference) {
                windowReference.location = url;
              }
            } else {
              window.open(relatedPlan.extras?.precheckoutUrl, "_blank");
            }
          }}
          className={cn(
            "embrace-select-coverage-button",
            "px-4 py-3 text-sm rounded-3xl font-bold bg-(--primary-coral) hover:bg-(--coral-light) hover:shadow-sm animate-all text-white text-center w-full",
          )}
        >
          Select this coverage
        </span>
      </div>
    </div>
  );
};

const EmbraceContent = ({
  relatedPlans,
  providerId,
  isPortrait,
  handleInsurerClicked,
}: {
  relatedPlans: DataQuoteItem[];
  providerId: string;
  isPortrait: boolean;
  handleInsurerClicked: (insurer: string, card: DataQuoteItem) => void;
}) => (
  <div className="flex flex-col gap-8 m-auto">
    {relatedPlans.length > 0 && (
      <h1 className="text-xl text-center text-(--primary-teal-dark) sansita-bold">
        Similar Options
      </h1>
    )}

    <div
      className={cn(
        "flex justify-evenly items-center gap-2 py-2 flex-row flex-wrap",
      )}
    >
      {relatedPlans.map((relatedPlan, index) => (
        <EmbraceQuoteDetail
          relatedPlan={relatedPlan}
          providerId={providerId}
          key={index}
          handleInsurerClicked={handleInsurerClicked}
        />
      ))}
    </div>

    <h1 className="text-xl text-center text-(--primary-teal-dark) sansita-bold">
      Details
    </h1>
    <div
      className={cn(
        "flex justify-center items-center gap-2 py-2 no-wrap flex-col",
        isPortrait ? "" : "min-[600px]:flex-row",
      )}
    >
      <EmbraceContentDetail title="Accident & Illness" isWellness={false} />
      <EmbraceContentDetail
        title="Accident & Illness + Wellness"
        isWellness={true}
      />
    </div>
  </div>
);

export default EmbraceContent;
