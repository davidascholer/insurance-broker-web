import FetchQuoteButton from "@/components/FetchQuoteButton";
import { cn } from "@/lib/utils";
import type { PartnerFooterType } from "../utils/export-types";
import InnerText from "../components/InnerText";

const PartnerFooter = ({ className, reviewContent }: PartnerFooterType) => {
  return (
    <div className="w-full bg-(--light-pink) items-center p-2 mt-4">
      <div className="flex flow-row flex-wrap justify-center items-start gap-0 max-w-5xl mx-auto">
        <div className="max-w-2xl p-8 w-full items-start justify-start flex flex-row flex-nowrap max-[500px]:flex-wrap max-[500px]:justify-center gap-4">
          <img
            src={"/pages/partner/prudentpet/pipa_logo_sans_type.svg"}
            alt={"PIPA Logo"}
            className={cn("w-20")}
          />
          <div
            className={cn(
              "flex flex-col items-start gap-2 px-4 justify-start",
              className
            )}
          >
            <h2 className="text-(--primary-teal-dark) sansita-bold text-xl">
              PIPA's Review
            </h2>
            <div className="ml-4 cursor-pointer">
              <InnerText {...reviewContent} />
            </div>
          </div>
        </div>
        <FetchQuoteButton className="mt-2 flex-nowrap" />
      </div>
    </div>
  );
};

export default PartnerFooter;
