import FetchQuoteButton from "@/components/FetchQuoteButton";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import StarRating from "@/components/StarRating";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";

const sectionIDs = [
  { id: "pricing", label: "PRICING" },
  { id: "plans-offered", label: "PLANS OFFERED" },
  { id: "coverage", label: "WHAT'S COVERED" },
  { id: "routine-care-add-ons", label: "ROUTINE CARE ADD-ONS" },
  { id: "enrollment-requirements", label: "ENROLLMENT REQUIREMENTS" },
  { id: "waiting-periods", label: "WAITING PERIODS" },
  { id: "how-to-file-claim", label: "HOW TO FILE A CLAIM WITH PRUDENT PET" },
  { id: "discounts-offered", label: "DISCOUNTS OFFERED BY PRUDENT PET" },
  { id: "customer-support", label: "CUSTOMER SUPPORT" },
  { id: "cancellation-policy", label: "CANCELLATION POLICY" },
];

const SectionContainer = ({
  color,
  children,
  className,
  id,
}: {
  color: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-center items-center w-full my-0 py-0 text-sm md:text-base",
        color,
        className
      )}
      id={id}
      style={id ? { scrollMarginTop: "84px" } : undefined}
    >
      {children}
    </div>
  );
};

const PartnerHeader = ({
  title,
  children,
  reviewStars,
  className,
}: {
  title: string;
  children: React.ReactNode;
  reviewStars: number;
  className?: string;
}) => {
  return (
    <div className={cn("", className)}>
      <span className="flex flex-nowrap gap-2 justify-center items-center">
        <StarRating
          starRating={reviewStars}
          className="text-lg"
          starStyles="text-[#ED8F82]"
        />
        <span className="text-xs font-bold">{`Trustpilot rating: ${reviewStars} out of 5 (2,353 Customer Reviews)`}</span>
      </span>
      <h1 className="text-(--primary-teal-dark) text-4xl md:text-5xl sansita-bold text-center">
        {title}
      </h1>
      <p className="text-xs md:text-sm space-y-5">{children}</p>
    </div>
  );
};

const HorizontalAnchorList = ({
  anchors,
  className,
}: {
  anchors: { id: string; label: string }[];
  className?: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isOverflowing = scrollWidth > clientWidth;

    setShowArrows(isOverflowing);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleResize = () => checkScroll();
    const handleScroll = () => checkScroll();

    window.addEventListener("resize", handleResize);
    container.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 w-full p-2 text-white",
        className
      )}
    >
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={cn(
            "shrink-0 cursor-pointer",
            !canScrollLeft && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft size={40} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {anchors.map((anchor) => (
          <a
            key={anchor.id}
            href={`#${anchor.id}`}
            className="whitespace-nowrap rounded-md text-white hover:text-(--primary-coral) transition-colors font-bold tracking-wider text-xs"
          >
            {anchor.label}
          </a>
        ))}
      </div>

      {showArrows && (
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={cn(
            "shrink-0 cursor-pointer",
            !canScrollRight && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
};

const ContentWithHeading = ({
  heading,
  children,
  className,
  headerClassName,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1 tracking-tight max-w-3xl px-4 w-full justify-start xl:text-lg",
        className
      )}
    >
      <h2
        className={cn(
          "text-(--primary-teal-dark) text-2xl sansita-bold mb-2",
          headerClassName
        )}
      >
        {heading}
      </h2>
      <div className="ml-4">{children}</div>
    </div>
  );
};

const ContentWithImage = ({
  heading,
  imageSrc,
  children,
  className,
  imageClassName,
}: {
  heading: string;
  imageSrc: string;
  children: React.ReactNode;
  className?: string;
  imageClassName?: string;
}) => {
  return (
    <div className="flex flex-row flex-nowrap items-start gap-0">
      <img
        src={imageSrc}
        alt={heading}
        className={cn("w-10", imageClassName)}
      />
      <div
        className={cn(
          "flex flex-col items-start gap-2 px-4 justify-start",
          className
        )}
      >
        <h2 className="text-(--primary-teal-dark) sansita-regular tracking-widest">
          {heading}
        </h2>
        <div className="ml-4 cursor-pointer">{children}</div>
      </div>
    </div>
  );
};

const ContentUnorderedList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "list-disc list-inside flex flex-col gap-1 ml-2",
        className
      )}
    >
      {children}
    </ul>
  );
};

const ContentImageList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "list-disc list-outside flex flex-row flex-wrap gap-4 ml-2 justify-start items-start",
        className
      )}
    >
      {children}
    </ul>
  );
};

const ContentImageListItem = ({
  children,
  className,
  imageUrl,
  imageAlt,
}: {
  children: React.ReactNode;
  imageUrl: string;
  className?: string;
  imageAlt?: string;
}) => {
  return (
    <li className={cn("flex flex-col gap-1 max-w-[150px]", className)}>
      <div className="flex flex-col justify-center items-start text-sm">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full max-w-[125px] p-4 aspect-square object-contain"
        />
        {children}
      </div>
    </li>
  );
};

const PartnerFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
            <div className="ml-4 cursor-pointer">{children}</div>
          </div>
        </div>
        <FetchQuoteButton className="mt-2 flex-nowrap" />
      </div>
    </div>
  );
};

const PrudentPet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/partner/prudent-pet",
      title: "Prudent Pet Insurance Partner Page",
    });
  }, []);

  return (
    <div className="bg-(--light-pink) pt-24">
      <meta
        name="title"
        content="Prudent Pet Insurance Partner | PIPA Broker"
      />
      <meta
        name="description"
        content="Learn about Prudent Pet Insurance plans, coverage options, pricing, and claims process through PIPA Broker."
      />
      <meta
        name="keywords"
        content="prudent pet insurance, pet insurance plans, accident coverage, illness coverage, pet insurance quotes"
      />
      <meta name="author" content="PIPA Broker" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://www.pipabroker.com/partner/prudent-pet"
      />
      <meta
        property="og:title"
        content="Prudent Pet Insurance Partner | PIPA Broker"
      />
      <meta
        property="og:description"
        content="Learn about Prudent Pet Insurance plans, coverage options, pricing, and claims process through PIPA Broker."
      />
      <meta
        property="og:image"
        content="https://www.pipabroker.com/og-image.png"
      />
      <meta property="og:site_name" content="PIPA Broker" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://www.pipabroker.com/partner/prudent-pet"
      />
      <meta
        property="twitter:title"
        content="Prudent Pet Insurance Partner | PIPA Broker"
      />
      <meta
        property="twitter:description"
        content="Learn about Prudent Pet Insurance plans, coverage options, pricing, and claims process through PIPA Broker."
      />
      <meta
        property="twitter:image"
        content="https://www.pipabroker.com/twitter-image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link
        rel="canonical"
        href="https://www.pipabroker.com/partner/prudent-pet"
      />

      <title>Prudent Pet Insurance Partner | PIPA Broker</title>

      <Header />

      <SectionContainer color="bg-(--coral-light) p-5">
        <PartnerHeader
          title="Prudent Pet Insurance"
          reviewStars={4.8}
          className="flex flex-col items-start gap-1 tracking-tight max-w-3xl px-4 w-full justify-start xl:text-lg"
        >
          Reviewed by Jeffrey Hanschmann, Licensed Insurance Producer
          <br />
          Updated December 20, 2025
        </PartnerHeader>
      </SectionContainer>

      <SectionContainer color="bg-(--primary-teal-dark) p-2">
        <HorizontalAnchorList anchors={sectionIDs} />
      </SectionContainer>

      <SectionContainer color="bg-white" className="p-2" id={sectionIDs[0].id}>
        <ContentWithHeading heading="Pricing">
          <button
            className="whitespace-nowrap rounded-md text-(--primary-coral) font-bold tracking-wider cursor-pointer transition-transform duration-300 ease hover:-translate-y-1"
            onClick={() => navigate("/info")}
          >
            FETCH FREE QUOTES HERE
          </button>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[1].id}>
        <ContentWithHeading heading="Plans Offered">
          <div className="flex flex-col gap-5 text-sm md:text-base">
            <span className="">
              Prudent Pet offers the following main plan types:
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <span className="font-bold tracking-widest">ACCIDENT-ONLY</span>
                <span className="">Covers injuries caused by accidents.</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold tracking-widest">ESSENTIAL</span>
                <span className="">
                  Accident & illness with limited annual benefit.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold tracking-widest">ULTIMATE</span>
                <span className="">
                  Accident & illness with unlimited annual benefit.
                </span>
              </div>
            </div>
            <span className="">
              Each plan includes 24/7 Vet Chat and customizable deductible &
              reimbursement levels.
            </span>
            <div className="flex flex-col gap-1">
              <span className="">
                <span className="font-bold">Deductible Levels:</span> $100, 250,
                500, or 1,000
              </span>
              <span className="">
                <span className="font-bold">Reimbursement Levels:</span> 70%,
                80%, or 90%
              </span>
              <span className="">
                <span className="font-bold">Annual Limit Options:</span> $10,000
                or Unlimited
              </span>
            </div>
          </div>
        </ContentWithHeading>
        <FetchQuoteButton className="mt-2" />
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[2].id}>
        <ContentWithHeading heading="What’s Covered / Not Covered">
          <div className="flex flex-col gap-6">
            <ContentWithImage
              heading="COVERED (ACCIDENT & ILLNESS PLANS)"
              imageSrc="/pages/partner/prudentpet/coverage.svg"
            >
              <div className="flex flex-col gap-2">
                <span>
                  Prudent Pet covers treatment for pet injuries and illnesses,
                  including but not limited to:
                </span>
                <ContentUnorderedList>
                  <li>Accidents</li>
                  <li>Illnesses, cancer & hospitalizations</li>
                  <li>Behavioral issues (vet-treated)</li>
                  <li>Breed-specific or orthopedic conditions</li>
                  <li>Dental injuries & disease</li>
                  <li>Alternative/holistic therapies</li>
                </ContentUnorderedList>
                <em>
                  Note: coverage depends on plan type and limits selected.
                </em>
              </div>
            </ContentWithImage>
            <ContentWithImage
              heading="NOT COVERED"
              imageSrc="/pages/partner/prudentpet/none.svg"
            >
              <div className="flex flex-col gap-1">
                <span>Standard exclusions include:</span>
                <ContentUnorderedList>
                  <li>Pre-existing conditions</li>
                  <li>Cosmetic or elective procedures</li>
                  <li>Grooming, housing, training</li>
                  <li>Routine care & exams (unless add-on purchased)</li>
                  <li>Pet food or supplements</li>
                  <li>Breeding, pregnancy, whelping</li>
                  <li>
                    Ligaments with Prior Conditions on the Opposing Knee or
                    Ligament
                  </li>
                  <li>Funerals, Urns, and burials</li>
                </ContentUnorderedList>
                <em>Routine care isn’t covered without a wellness add-on.</em>
              </div>
            </ContentWithImage>
          </div>
        </ContentWithHeading>
        <FetchQuoteButton className="mt-2" />
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[3].id}>
        <ContentWithHeading heading="Routine Care Add-Ons">
          <ContentUnorderedList>
            <li>
              <strong>Wellness Coverage Add-On:</strong> Reimburses basic
              preventive care like vaccines, annual exams, fecal/blood tests,
              heartworm/flea prevention, microchipping, etc. Wellness coverage
              has no waiting period and does not require meeting deductibles
              before reimbursement.
            </li>
            <li>
              <strong>Veterinary Exam Fee Coverage:</strong> Helps cover exam or
              consultation fees for diagnoses/treatment. Wellness coverage has
              no waiting period and does not require meeting deductibles before
              reimbursement.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[4].id}>
        <ContentWithHeading heading="Enrollment Requirements">
          <ContentUnorderedList>
            <li>Minimum age for enrollment: 8 weeks old.</li>
            <li>Must reside at a valid U.S. address.</li>
            <li>
              Some reports mention an annual health check and dental exam to
              maintain coverage.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[5].id}>
        <ContentWithHeading heading="Waiting Periods">
          <ContentUnorderedList>
            <li>Accidents: 5 days</li>
            <li>Illnesses: 14 days</li>
            <li>Wellness: 0 days</li>
            <li>
              Knee / ligament/orthopedic issues: ~6 months (may be waived with
              veterinary exam)
            </li>
          </ContentUnorderedList>
          <em>
            Waiting periods may vary by state and policy. Check the terms of
            your policy’s details to confirm actual effective date of coverage.
          </em>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[6].id}>
        <ContentWithHeading heading="How to File a Claim with Prudent Pet">
          <ContentImageList>
            <ContentImageListItem
              imageUrl="/pages/partner/prudentpet/pet_insurance.svg"
              imageAlt="Claim Step 1"
            >
              <h3>
                1) <strong>Choose a Plan:</strong>
              </h3>
              <div className="ml-4">
                <span>
                  Select a policy that fits your pet's needs and your budget.
                </span>
                <br />
                <span>
                  <em>
                    Use{" "}
                    <a
                      className="font-bold cursor-pointer"
                      onClick={() => navigate("/info")}
                    >
                      PIPA’s free tool
                    </a>{" "}
                    to see if Prudent Pet is the best option for you and your
                    pet(s).
                  </em>
                </span>
              </div>
            </ContentImageListItem>
            <ContentImageListItem
              imageUrl="/pages/partner/prudentpet/out_of_pocket.svg"
              imageAlt="Claim Step 2"
            >
              <h3>
                2) <strong>Pay Upfront:</strong>
              </h3>
              <div className="ml-4">
                <span>
                  Visit any licensed veterinarian or emergency hospital, and pay
                  the vet directly when your pet needs care.
                </span>
              </div>
            </ContentImageListItem>
            <ContentImageListItem
              imageUrl="/pages/partner/prudentpet/submit.svg"
              imageAlt="Claim Step 3"
            >
              <h3>
                3) <strong>Submit Claim:</strong>
              </h3>
              <div className="ml-4">
                <span>
                  Claims can be submitted through one of the following Prudent
                  Pet channels.
                </span>
                <ul className="list-disc list-inside">
                  <li>Online via portal</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Fax</li>
                </ul>
              </div>
            </ContentImageListItem>
            <ContentImageListItem
              imageUrl="/pages/partner/prudentpet/reimburse.svg"
              imageAlt="Claim Step 4"
            >
              <h3>
                4) <strong>Get Reimbursed:</strong>
              </h3>
              <div className="ml-4">
                <span>
                  Typical claim reimbursement average is approximately 1 to 3
                  days after submission (may vary). The reimbursement amount
                  will depend on your plan’s coverage.
                </span>
              </div>
            </ContentImageListItem>
          </ContentImageList>
        </ContentWithHeading>
        <span>
          <em>
            Note: Claims must be filed within ~90 days after the end of the
            policy term to be eligible.
          </em>
        </span>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[7].id}>
        <ContentWithHeading heading="Discounts Offered by Prudent Pet">
          <ContentUnorderedList>
            <li>
              <strong>Multi-pet discount:</strong> ~10% off premium when
              enrolling more than one pet.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[8].id}>
        <ContentWithHeading heading="Customer Support">
          <div className="flex flex-col gap-2 mb-2">
            <span className="mb-2">
              Prudent Pet support can generally be reached via:
            </span>
            <span>Phone: 1-888-820-7739</span>
            <span>Sales Email: sales@prudentpet.com</span>
            <span>Veterinary / Info: info@prudentpet.com</span>
            <span>
              24/7 Vet Chat: included with policies (online chat with vet
              professionals)
            </span>
            <span></span>
          </div>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[9].id}>
        <ContentWithHeading heading="Cancellation Policy">
          <ContentUnorderedList>
            <li>
              Full refund if canceled within first 30 days of policy effective
              date and no claims filed.
            </li>
            <li>
              After 30 days, a pro-rata refund of unused premium is issued.
            </li>
            <li>Policies automatically renew unless notified otherwise.</li>
            <li>
              Company may cancel for nonpayment or material misrepresentation
              after specific timeframes.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <PartnerFooter>
        <div className="flex flex-col gap-4">
          <ContentWithHeading
            heading="Prudent Pet is a highly rated modern pet insurer known for:"
            headerClassName="text-sm sm:text-base"
            className="ml-0"
          >
            <ContentUnorderedList className="text-sm sm:text-base gap-1">
              <li>High Trustpilot satisfaction (4.8-4.9 stars)</li>
              <li>Flexible customizable plans and coverage levels</li>
              <li>Fast claim reimbursement reported by many reviews</li>
              <li>Optional wellness & exam fee add-ons available</li>
            </ContentUnorderedList>
          </ContentWithHeading>
          <ContentWithHeading
            heading="Considerations:"
            headerClassName="text-sm sm:text-base"
            className="ml-0"
          >
            <ContentUnorderedList className="text-sm sm:text-base gap-1">
              <li>Minimum age for enrollment is 8 weeks old.</li>
              <li>Routine and preventive care require optional add-ons.</li>
              <li>Pre-existing conditions are excluded.</li>
              <li>No deductible option higher than $1,000</li>
              <li>
                Some policy fine print (waiting period specifics) may vary by
                state.
              </li>
            </ContentUnorderedList>
          </ContentWithHeading>
        </div>
      </PartnerFooter>
      <Footer />
    </div>
  );
};

export default PrudentPet;
