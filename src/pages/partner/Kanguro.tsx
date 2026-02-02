import FetchQuoteButton from "@/components/FetchQuoteButton";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";
import SectionContainer from "./components/SectionContainer";
import PartnerHeader from "./components/PartnerHeader";
import HorizontalAnchorList from "./components/HorizontalAnchorList";
import ContentWithHeading from "./components/ContentWithHeading";
import ContentWithImage from "./components/ContentWithImage";
import ContentUnorderedList from "./components/ContentUnorderedList";
import ContentImageList from "./components/ContentImageList";
import ContentImageListItem from "./components/ContentImageListItem";
import PartnerFooter from "./components/PartnerFooter";

const sectionIDs = [
  { id: "pricing", label: "PRICING" },
  { id: "plans-offered", label: "PLANS OFFERED" },
  { id: "coverage", label: "WHAT'S COVERED" },
  { id: "routine-care-add-ons", label: "ROUTINE CARE ADD-ONS" },
  { id: "enrollment-requirements", label: "ENROLLMENT REQUIREMENTS" },
  { id: "waiting-periods", label: "WAITING PERIODS" },
  { id: "how-to-file-claim", label: "HOW TO FILE A CLAIM WITH KANGURO" },
  { id: "discounts-offered", label: "DISCOUNTS OFFERED BY KANGURO" },
  { id: "customer-support", label: "CUSTOMER SUPPORT" },
  { id: "cancellation-policy", label: "CANCELLATION POLICY" },
];

const Kanguro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/partner/kanguro",
      title: "Kanguro Insurance Partner Page",
    });
  }, []);

  return (
    <div className="bg-(--light-pink) pt-24">
      <meta name="title" content="Kanguro Insurance Partner | PIPA Broker" />
      <meta
        name="description"
        content="Learn about Kanguro Insurance plans, coverage options, pricing, and claims process through PIPA Broker."
      />
      <meta
        name="keywords"
        content="kanguro insurance, pet insurance plans, accident coverage, illness coverage, pet insurance quotes"
      />
      <meta name="author" content="PIPA Broker" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://www.pipabroker.com/partner/kanguro"
      />
      <meta
        property="og:title"
        content="Kanguro Insurance Partner | PIPA Broker"
      />
      <meta
        property="og:description"
        content="Learn about Kanguro Insurance plans, coverage options, pricing, and claims process through PIPA Broker."
      />
      <meta
        property="og:image"
        content="https://www.pipabroker.com/og-image.png"
      />
      <meta property="og:site_name" content="PIPA Broker" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://www.pipabroker.com/partner/kanguro"
      />
      <meta
        property="twitter:title"
        content="Kanguro Insurance Partner | PIPA Broker"
      />
      <meta
        property="twitter:description"
        content="Learn about Kanguro Insurance plans, coverage options, pricing, and claims process through PIPA Broker."
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
      <link rel="canonical" href="https://www.pipabroker.com/partner/kanguro" />

      <title>Kanguro Insurance Partner | PIPA Broker</title>

      <Header />

      <SectionContainer color="bg-(--coral-light) p-5">
        <PartnerHeader
          title="Kanguro Insurance"
          reviewStars={4.1}
          reviewCount={"365"}
          imgUrl="/text_logos/kanguro_logo_blue_horz.svg"
          className=""
        >
          Reviewed by Jeffrey Hanschmann, Licensed Insurance Producer
          <br />
          Updated January 9, 2026
        </PartnerHeader>
      </SectionContainer>

      <SectionContainer
        color="bg-(--primary-teal-dark)"
        className="sticky top-20 md:top-24 z-40 py-2"
        id="section-navigation"
      >
        <HorizontalAnchorList anchors={sectionIDs} />
      </SectionContainer>

      <SectionContainer color="bg-white" className="py-6">
        <ContentWithHeading heading="Why Kanguro?">
          <p>
            Kanguro describes itself as a bilingual, mobile-first pet insurance
            platform built for today’s pet parents. The company aims to make
            coverage simple, transparent, and easy to use through digital
            claims, flexible plans, and real human support in both English and
            Spanish.
          </p>
        </ContentWithHeading>
      </SectionContainer>

      <SectionContainer color="bg-white" id={sectionIDs[0].id}>
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
              Kanguro offers the following main plan types:
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <span className="font-bold tracking-widest">
                  ESSENTIAL CARE
                </span>
                <span className="">Covers accidents and illness.</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold tracking-widest">
                  PREMIERE CARE +
                </span>
                <span className="">
                  Accidents and illnesses with limited wellness exams, tests and
                  vaccines.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold tracking-widest">
                  EARLY YEARS CARE +{" "}
                </span>
                <span className="">
                  Accident & illness with wellness care for puppies.
                </span>
              </div>
            </div>
            <span className="">
              Every plan comes with the Kanguro App, giving you 24/7 Televet,
              pharmacy savings, cashback perks, missing-pet support, and easy
              digital claims; plus customizable coverage (limits and
              deductibles) and reimbursement levels from 70% to 90%.
            </span>
            <div className="flex flex-col gap-1">
              <span className="">
                <span className="font-bold">Deductible Levels:</span> $100, 200,
                500, or 1,000
              </span>
              <span className="">
                <span className="font-bold">Reimbursement Levels:</span> 70%,
                80%, or 90%
              </span>
              <span className="">
                <span className="font-bold">Annual Limit Options:</span>{" "}
                $5,000–$30,000
              </span>
            </div>
          </div>
        </ContentWithHeading>
        <FetchQuoteButton className="mt-2" />
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[2].id}>
        <ContentWithHeading heading="What's Covered / Not Covered">
          <div className="flex flex-col gap-6">
            <ContentWithImage
              heading="COVERED (ACCIDENT & ILLNESS PLANS)"
              imageSrc="/pages/partner/coverage.svg"
            >
              <div className="flex flex-col gap-2">
                <span>
                  Kanguro covers treatment for pet injuries and illnesses,
                  including but not limited to:
                </span>
                <ContentUnorderedList>
                  <li>Vet exam fees</li>
                  <li>Diagnostics (lab work, imaging)</li>
                  <li>Surgery & hospitalization</li>
                  <li>Emergency care</li>
                  <li>Medications and prescriptions</li>
                  <li>Prosthetics and mobility aids</li>
                  <li>Cancer treatments</li>
                  <li>Behavioral exams/other medically necessary services</li>
                  <li>Euthanasia</li>
                </ContentUnorderedList>
              </div>
            </ContentWithImage>
            <ContentWithImage
              heading="NOT COVERED"
              imageSrc="/pages/partner/none.svg"
            >
              <div className="flex flex-col gap-1">
                <span>Standard exclusions include:</span>
                <ContentUnorderedList>
                  <li>Pre-existing conditions</li>
                  <li>Cosmetic or elective procedures</li>
                  <li>Breeding, pregnancy, or whelping issues</li>
                  <li>
                    Some states may restrict alternative/behavioral treatments
                  </li>
                </ContentUnorderedList>
              </div>
              <span className="w-full">
                <em>Routine care isn't covered without a wellness add-on.</em>
              </span>
            </ContentWithImage>
          </div>
        </ContentWithHeading>
        <FetchQuoteButton className="mt-2" />
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[3].id}>
        <ContentWithHeading heading="Routine Care Add-Ons">
          <ContentUnorderedList>
            <li>
              <strong>Premiere Care+ (Wellness):</strong> Includes added support
              for prevention and overall health. Includes routine care like
              checkups and vaccinations, with no deductible or waiting.
            </li>
            <li>
              <strong>Early Years Care+ (Puppy Care + Wellness):</strong> Made
              for puppies. Covers early-stage needs and allows as well as a
              wellness plan for everyday care from the very beginning.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[4].id}>
        <ContentWithHeading heading="Enrollment Requirements">
          <ContentUnorderedList>
            <li>Cat/Dog must be between 6 weeks and 14 years old.</li>
            <li>Must reside at a valid U.S. address.</li>
            <li>
              Provide medical records for the past 12 months or as required to
              understand the cat/dog current health status.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[5].id}>
        <ContentWithHeading heading="Waiting Periods">
          <ContentUnorderedList>
            <li>Accident and Illness plans: 14 days</li>
            <li>Prevention and wellness plans: 1 day</li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[6].id}>
        <ContentWithHeading heading="How to File a Claim with Kanguro Insurance">
          <ContentImageList>
            <ContentImageListItem
              imageUrl="/pages/partner/pet_insurance.svg"
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
                      PIPA's free tool
                    </a>{" "}
                    to see if Kanguro is the best option for you and your
                    pet(s).
                  </em>
                </span>
              </div>
            </ContentImageListItem>
            <ContentImageListItem
              imageUrl="/pages/partner/out_of_pocket.svg"
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
              imageUrl="/pages/partner/submit.svg"
              imageAlt="Claim Step 3"
            >
              <h3>
                3) <strong>Submit Claim:</strong>
              </h3>
              <div className="ml-4">
                <span>
                  Claims can be submitted through your Kanguro App. To file a
                  claim, have the following documents ready:
                </span>
                <ul className="list-disc list-inside">
                  <li>A finalized invoice</li>
                  <li>Detailed medical records</li>
                </ul>
              </div>
            </ContentImageListItem>
            <ContentImageListItem
              imageUrl="/pages/partner/reimburse.svg"
              imageAlt="Claim Step 4"
            >
              <h3>
                4) <strong>Get Reimbursed:</strong>
              </h3>
              <div className="ml-4">
                <span>
                  Typical claim reimbursement average is approximately 1 to 7
                  days after submission in the Kanguro App (may vary). The
                  reimbursement amount will depend on your plan’s coverage.
                  You’ll know the status of your claim in real time and when
                  your payment is on the way.
                </span>
              </div>
            </ContentImageListItem>
          </ContentImageList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[7].id}>
        <ContentWithHeading heading="Discounts Offered by Kanguro">
          <ContentUnorderedList>
            <li>
              <strong>Multi-pet discount:</strong> 10% off when enrolling more
              than one pet.
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <SectionContainer color="bg-white" className="py-6" id={sectionIDs[8].id}>
        <ContentWithHeading heading="Customer Support">
          <div className="flex flex-col gap-2 mb-2">
            <span className="mb-2">
              Kanguro support can generally be reached via:
            </span>
            <span>Phone / Text / WhatsApp: 1-888-546-5264</span>
            <span>Email: customersupport@kanguroinsurance.com</span>
            <span>Bilingual English/Spanish support available.</span>
            <span>
              24/7 Vet Chat: included with policies (online chat with vet
              professionals)
            </span>
            <span></span>
            <span>
              <em>
                Once you have coverage through Kanguro, the app also becomes a
                key point of contact.
              </em>
            </span>
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
              After 30 days, a pro-rata refund of unused premium is issued
            </li>
          </ContentUnorderedList>
        </ContentWithHeading>
      </SectionContainer>
      <PartnerFooter>
        <div className="flex flex-col gap-4">
          <ContentWithHeading
            heading="Kanguro is a digitally focused pet insurer known for:"
            headerClassName="text-sm sm:text-base"
            className="ml-0"
          >
            <ContentUnorderedList className="text-sm sm:text-base gap-1">
              <li>
                Competitive pricing with flexible deductible and reimbursement
                options
              </li>
              <li>Bilingual English/Spanish customer support</li>
              <li>Fast, app-based claims experience</li>
              <li>Optional wellness coverage available as an add-on</li>
            </ContentUnorderedList>
          </ContentWithHeading>
          <ContentWithHeading
            heading="Considerations:"
            headerClassName="text-sm sm:text-base"
            className="ml-0"
          >
            <ContentUnorderedList className="text-sm sm:text-base gap-1">
              <li>Availability is limited to select U.S. states.</li>
              <li>
                Routine and preventive care require an optional wellness add-on.
              </li>
              <li>
                Pre-existing conditions are excluded, and coverage details may
                vary by state.
              </li>
            </ContentUnorderedList>
          </ContentWithHeading>
        </div>
      </PartnerFooter>
      <Footer />
    </div>
  );
};

export default Kanguro;
