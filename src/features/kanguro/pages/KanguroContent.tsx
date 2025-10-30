import { cn, formatNumberToPercent, formatNumberToPrice } from "@/lib/utils";
import type { DataQuoteItem } from "@/lib/types";

const KanguroContentDetailListItem = ({
  label,
  isCovered,
}: {
  label: string;
  isCovered: boolean;
}) => (
  <li className="flex justify-between flex-row no-wrap">
    <span>{label}</span>
    <img src={isCovered ? "/check.svg" : "/x.svg"} className="size-6 ml-4" />
  </li>
);

const KanguroContentDetail = ({
  title,
  className,
}: {
  title: string;
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

        
        <KanguroContentDetailListItem
          label="Hospitalization"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Medications"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Genetic Conditions"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Behavioral Treatment"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Holistic Medicine"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Alternative Therapies"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Prescription Food / Supplements"
          isCovered={title === "Essential" || title === "Essential Plus"}
        />

        <KanguroContentDetailListItem
          label="Vaccination"
          isCovered={title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Wellness Exam"
          isCovered={title === "Essential Plus"}
        />
        <KanguroContentDetailListItem
          label="Routine Hygiene Services"
          isCovered={title === "Essential Plus"}
        />
        

        <KanguroContentDetailListItem
          label="Spaying / Neutering"
          isCovered={false}
        />
        <KanguroContentDetailListItem
          label="Additional Vaccines / Boosters"
          isCovered={false}
        />
        <KanguroContentDetailListItem
          label="Microchipping"
          isCovered={false}
        />
      </ul>
    </div>
  );
};

const KanguroQuoteDetail = ({
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
        {relatedPlan.extras?.planId &&
        relatedPlan.extras.planId.includes("EssentialPlus") ? (
          <p className="text-center">Essential Plus</p>
        ) : (
          <p className="text-center">Essential</p>
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
            handleInsurerClicked(providerId);
            window.open(relatedPlan.extras?.precheckoutUrl, "_blank");
          }}
          className={cn(
            "kanguro-select-coverage-button",
            "px-4 py-3 text-sm rounded-3xl font-bold bg-(--primary-coral) hover:bg-(--coral-light) hover:shadow-sm animate-all text-white text-center w-full"
          )}
        >
          Select this coverage
        </span>
      </div>
    </div>
  );
};

const KanguroContent = ({
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
  <div className="flex flex-col gap-8 m-auto">
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
        <KanguroQuoteDetail
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
      <KanguroContentDetail title="Essential" />
      <KanguroContentDetail title="Essential Plus" />
    </div>
  </div>
);

export default KanguroContent;
