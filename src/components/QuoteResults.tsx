import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import type { ProviderIdTypes, QuoteItem } from "@/lib/types";
import { cn, formatNumberToPercent, formatNumberToPrice } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

// Keys must match the providerId in the QuoteItem type
const providers = new Map();
providers.set("fetch", {
  providerName: "Fetch",
  imgUrl: "/carrier_logo_fetch.svg",
  src: "https://www.fetchpet.com/",
  content:
    "At Fetch, we understand how special your pet is to you (and vice-versa). That’s why we built a plan that covers more of the care your pet needs. Having more coverage means you’ll never have to choose between a vet bill and your pet’s health — so they can have a longer, happier life, and you can both have more good days together.",
});
providers.set("petsbest", {
  providerName: "PetsBest",
  imgUrl: "/carrier_logo_petsbest.svg",
  src: "https://www.petsbest.com/",
  content:
    "Pets Best Insurance was founded in 2005 by Dr. Jack Stephens. Their mission is to end economic euthanasia by helping to ensure pet parents are financially prepared when their pets need unexpected veterinary care.",
});
providers.set("figo", {
  providerName: "Figo",
  imgUrl: "/carrier_logo_figo.svg",
  src: "https://figopetinsurance.com/get-started?PetName={petName}",
  content:
    "Figo: Pet Insurance with Soul. Let's face it— being a pet parent is awesome, but it has its share of surprises. Your pet insurance plan shouldn't be one of them. Born out of frustration with one-size-fits-all policies, Figo was founded by pet moms and dads who wanted better. We've ditched the jargon and stuffy approach, creating a refreshingly simple experience that fits your lifestyle—not the other way around. We're here to help enhance your pet's wellness, your peace of mind, and your finances. With fewer barriers, and perks (like an all-in-one pet parent app) that go beyond just helping cover vet bills, we're bringing pet insurance into the 21st century. Welcome to insurance that just gets it. Welcome to Figo.",
});
providers.set("metlife", {
  providerName: "MetLife",
  imgUrl: "/carrier_logo_metlife.svg",
  src: "https://www.metlifepetinsurance.com/",
  content:
    "At MetLife Pet Insurance, we understand that pets are like family. With customizable coverage, a 24/7 vet chat, and quick claims processing, your dog or cat can be covered by one of our award-winning pet insurance policies. MetLife Pet Insurance’s comprehensive policies ensure that your pet — no matter their breed or age — can be covered, with no initial exams or vet records required to enroll. MetLife Pet offers some of the shortest waiting periods for accident and illness coverage, and allows you to use any licensed vet in America. Call or visit us today to get started with a free quote or learn more.",
});
providers.set("embrace", {
  providerName: "Embrace",
  imgUrl: "/carrier_logo_embrace.svg",
  src: "https://www.embracepetinsurance.com/",
  content:
    "Pet insurance from Embrace saves you up to 90% back on vet bills from unexpected illness and medical expenses. Get a tailored cat or dog insurance quote in seconds.",
});
providers.set("pumpkin", {
  providerName: "Pumpkin",
  imgUrl: "/carrier_logo_pumpkin.svg",
  src: "https://www.pumpkin.care/",
  content:
    "At Pumpkin, we believe it's just as important to keep healthy pets healthy as it is to help hurt or sick pets get better! That's why we provide families with the extensive pet health insurance and essential preventive care their pets need to live a healthy life, now and fur-ever.",
});

const BottomDrawer = ({
  providerId,
  keyId,
}: {
  providerId: ProviderIdTypes;
  keyId: number;
}) => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div key={`bottom-drawer-${keyId}`}>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value={keyId + ""} className="">
          <Button
            className={cn(
              "justify-center items-center flex cursor-pointer z-0 w-full hover:bg-none h-14"
            )}
            variant={"ghost"}
            onClick={() => setValue((prev) => (prev ? undefined : keyId + ""))}
          >
            {value ? (
              <div className="flex flex-col items-center justify-center">
                <span>Hide</span>
                <ChevronUp className={cn("size-6")} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span>More Info</span>
                <ChevronDown className={cn("size-6")} />
              </div>
            )}
          </Button>
          <AccordionContent className="flex flex-col gap-4">
            <p className="px-4 pt-4 w-full font-medium text-(--primary-teal-dark) dark:text-neutral-200 text-left sansita-bold">
              {providers.get(providerId).content}
            </p>
            <p className="px-4 w-full font-medium dark:text-neutral-200 text-xs sansita-regular-italic">
              * This quote is an estimated cost. Actual coverage cost factors
              include your pet's breed, location, condition, and other details.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

function QuoteResults({
  cards,
  showFullResults,
  handleInsurerClicked,
}: // handleYoungerPetClicked
{
  cards: QuoteItem[];
  showFullResults: boolean;
  handleInsurerClicked: (insurer: string) => void;
  handleYoungerPetClicked: () => void;
}) {
  const [active, setActive] = useState<
    (QuoteItem & { key: number }) | boolean | null
  >(null);
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const id = useId();

  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    interface OrientationChangeEvent extends Event {
      matches: boolean;
    }

    const handleOrientationChange = (e: OrientationChangeEvent) => {
      setIsPortrait(e.matches);
    };

    mediaQuery.addEventListener("change", handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {cards.length === 0 ? (
        <div className="text-lg sansita-regular p-4 w-full max-w-4xl mx-auto nunito-sans text-balance flex flex-col gap-4">
          <p>
            Unfortunately, we could not dig up any plans for your pet. This is
            commonly due to little puppies and kittens being too young. A lot of
            plans don't start until your pet is between 6-8 weeks old. The good
            news is most plans let you start at a later date, so feel free to
            check the prices for when your pet is 8 weeks old!
          </p>
          {/* <Button variant="outline" className="cursor-pointer" onClick={handleYoungerPetClicked}>Click here to see quotes when your pet is 8 weeks old!</Button> */}
        </div>
      ) : (
        <>
          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed inset-0  grid place-items-center z-[100]">
                <motion.div
                  layoutId={`card-${active.providerId}-${id}-${active.key}`}
                  ref={ref}
                  className="w-full max-w-[500px] h-full md:h-fit flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-scroll scrollbar-theme-color max-h-screen p-2"
                >
                  <motion.button
                    key={`button-${active.providerId}-${id}-${active.key}`}
                    layout
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.05,
                      },
                    }}
                    className="flex items-center justify-center bg-(--primary-teal-dark) rounded-full h-12 w-12 min-h-12 min-w-12 ml-auto mr-2 mt-2 cursor-pointer border-1 border-neutral-50 shadow-sm"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>

                  <motion.div
                    layoutId={`image-${active.providerId}-${id}-${active.key}`}
                    className="flex items-center justify-center pt-8 px-8"
                  >
                    <img
                      src={providers.get(active.providerId)?.imgUrl || ""}
                      alt={providers.get(active.providerId)?.providerName || ""}
                      className="aspect-3/2 w-full sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top p-4"
                    />
                  </motion.div>

                  <div className="p-4">
                    <div className="flex flex-col min-[500px]:flex-row justify-between items-center">
                      <div className="">
                        <div className="flex flex-col gap-1 justify-center items-center">
                          <motion.h3
                            layoutId={`title-${active.providerId}-deductible-${id}-${active.key}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left sansita-bold"
                          >
                            {"Annual Deductible"}
                          </motion.h3>
                        </div>
                        <motion.p
                          layoutId={`content-${active.providerId}-deductible-${id}-${active.key}`}
                          className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full"
                        >
                          {formatNumberToPrice(active.deductibleOption) || ""}
                        </motion.p>
                      </div>
                      <div className="">
                        <div className="flex flex-col gap-1 justify-center items-center">
                          <motion.h3
                            layoutId={`title-${active.providerId}-reimbursement-${id}-${active.key}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left sansita-bold"
                          >
                            {"Reimbursement Ratge"}
                          </motion.h3>
                        </div>
                        <motion.p
                          layoutId={`content-${active.providerId}-reimbursement-${id}-${active.key}`}
                          className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full"
                        >
                          {formatNumberToPercent(
                            active.reimbursementPercentageOption
                          )}
                        </motion.p>
                      </div>
                      <div className="">
                        <div className="flex flex-col gap-1 justify-center items-center">
                          <motion.h3
                            layoutId={`title-${active.providerId}-coverage-${id}-${active.key}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left sansita-bold"
                          >
                            Annual Limit
                          </motion.h3>
                        </div>
                        <motion.p
                          layoutId={`content-${active.providerId}-coverage-${id}-${active.key}`}
                          className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full"
                        >
                          {active.reimbursementLimitOption === 999999
                            ? "unlimited"
                            : formatNumberToPrice(
                                active.reimbursementLimitOption
                              )}
                        </motion.p>
                      </div>
                      <div className="">
                        <motion.h3
                          layoutId={`title-${active.providerId}-monthly-${id}-${active.key}`}
                          className="font-medium text-2xl text-(--primary-coral) dark:text-neutral-200 text-center md:text-left sansita-bold"
                        >
                          {"Monthly Price"}
                        </motion.h3>
                        <motion.p
                          layoutId={`content-${active.providerId}-monthly-${id}-${active.key}`}
                          className="nunito-sans-bold px-4 py-3 text-lg rounded-3xl font-bold text-center w-full"
                        >
                          {formatNumberToPrice(active.monthlyPrice, true)}
                        </motion.p>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center mt-4 w-full">
                      <motion.a
                        layoutId={`button-${active.providerId}-${id}-${active.key}`}
                        href={providers.get(active.providerId).src}
                        onClick={() =>
                          handleInsurerClicked(
                            providers.get(active.providerId).providerName
                          )
                        }
                        target="_blank"
                        className="px-4 py-3 text-sm rounded-3xl font-bold bg-(--primary-coral) hover:bg-(--coral-light) hover:shadow-sm animate-all text-white text-center w-full"
                      >
                        Go to {providers.get(active.providerId).providerName}
                      </motion.a>
                    </div>

                    <div className="relative p-4 overflow-scroll">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 text-xs md:text-sm lg:text-base md:h-fit flex flex-col items-start gap-4 dark:text-neutral-400 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                      >
                        <span>{providers.get(active.providerId).content}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          <ul id="quotes-list" className="mx-auto w-full gap-4">
            {cards.map((card: QuoteItem, key: number) => {
              if (!showFullResults && key >= 10) {
                return null;
              }
              return (
                <motion.div
                  layoutId={`card-${card.providerId}-${id}-${key}`}
                  key={`card-${card.providerId}-${id}-${key}`}
                  onClick={() => isPortrait && setActive({ ...card, key })}
                  className={cn(
                    "mt-3 p-4 pb-1 bg-white hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl border-2 border-(--primary-coral) hover:shadow-lg transition-all duration-300 ease max-w-4xl mx-auto",
                    isPortrait ? "cursor-pointer" : ""
                  )}
                >
                  <div className="flex gap-1 flex-col md:flex-row items-center md:items-start justify-center w-full max-w-4xl">
                    <motion.div
                      layoutId={`image-${card.providerId}-${id}-${key}`}
                    >
                      <img
                        src={providers.get(card.providerId)?.imgUrl}
                        alt={providers.get(card.providerId)?.name}
                        className="aspect-3/2 min-w-32 rounded-lg object-cover object-top p-2"
                      />
                    </motion.div>
                    <div className="flex flex-col min-[500px]:flex-row gap-4 w-full justify-evenly">
                      <div className="">
                        <motion.h3
                          layoutId={`title-${card.providerId}-deductible-${id}-${key}`}
                          className="sansita-bold font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                        >
                          {"Annual Deductible"}
                        </motion.h3>
                        <motion.p
                          layoutId={`content-${card.providerId}-deductible-${id}-${key}`}
                          className="nunito-sans-bold text-neutral-600 dark:text-neutral-400 text-center"
                        >
                          {formatNumberToPrice(card.deductibleOption)}
                        </motion.p>
                      </div>
                      <div className="">
                        <motion.h3
                          layoutId={`title-${card.providerId}-reimbursement-${id}-${key}`}
                          className="sansita-bold font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                        >
                          {"Reimbursement Rate"}
                        </motion.h3>
                        <motion.p
                          layoutId={`content-${card.providerId}-reimbursement-${id}-${key}`}
                          className="nunito-sans-bold text-neutral-600 dark:text-neutral-400 text-center"
                        >
                          {formatNumberToPercent(
                            card.reimbursementPercentageOption
                          )}
                        </motion.p>
                      </div>
                      <div className="">
                        <motion.h3
                          layoutId={`title-${card.providerId}-coverage-${id}-${key}`}
                          className="sansita-bold font-medium text-neutral-800 dark:text-neutral-200 text-center"
                        >
                          {"Annual Limit"}
                        </motion.h3>
                        <motion.p
                          layoutId={`content-${card.providerId}-coverage-${id}-${key}`}
                          className="nunito-sans-bold text-neutral-600 dark:text-neutral-400 text-center"
                        >
                          {card.reimbursementLimitOption === 999999
                            ? "unlimited"
                            : formatNumberToPrice(
                                card.reimbursementLimitOption
                              )}
                        </motion.p>
                      </div>
                      <div className="">
                        <motion.h3
                          layoutId={`title-${card.providerId}-price-${id}-${key}`}
                          className="sansita-bold text-xl text-(--primary-coral) dark:text-neutral-200 text-center"
                        >
                          {"Monthly Price"}
                        </motion.h3>
                        <motion.p
                          layoutId={`content-${card.providerId}-price-${id}-${key}`}
                          className="nunito-sans-bold text-xl text-neutral-600 dark:text-neutral-400 text-center"
                        >
                          {formatNumberToPrice(card.monthlyPrice, true)}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center m-4 px-8 w-full">
                    <motion.a
                      layoutId={`button-link-${card.providerId}-${id}-${key}`}
                      href={providers.get(card.providerId).src}
                      target="_blank"
                      onClick={() =>
                        handleInsurerClicked(
                          providers.get(card.providerId).providerName
                        )
                      }
                      className="px-4 py-3 text-sm rounded-3xl font-bold bg-(--primary-coral) hover:bg-(--coral-light) hover:shadow-sm animate-all text-white text-center w-full"
                    >
                      Go to {providers.get(card.providerId).providerName}
                    </motion.a>
                  </div>
                  {!isPortrait ? (
                    <BottomDrawer keyId={key} providerId={card.providerId} />
                  ) : null}
                </motion.div>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default QuoteResults;
