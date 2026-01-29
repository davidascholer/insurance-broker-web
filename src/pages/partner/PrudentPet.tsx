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
  { id: "how-to-file-claim", label: "HOW TO FILE A CLAIM WITH PRUDENT PET" },
  { id: "discounts-offered", label: "DISCOUNTS OFFERED BY PRUDENT PET" },
  { id: "customer-support", label: "CUSTOMER SUPPORT" },
  { id: "cancellation-policy", label: "CANCELLATION POLICY" },
];

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
          imgUrl="/text_logos/prudent_logo_blue_horz.svg"
          className=""
        >
          Reviewed by Jeffrey Hanschmann, Licensed Insurance Producer
          <br />
          Updated December 20, 2025
        </PartnerHeader>
      </SectionContainer>

      <SectionContainer
        color="bg-(--primary-teal-dark)"
        className="sticky top-20 md:top-24 z-40 py-2"
        id="section-navigation"
      >
        <HorizontalAnchorList anchors={sectionIDs} />
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
              </div>
            </ContentWithImage>
            <span className="px-2">
              <em>Note: coverage depends on plan type and limits selected.</em>
            </span>
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
              </div>
            </ContentWithImage>
            <span className="w-full">
              <em>Routine care isn’t covered without a wellness add-on.</em>
            </span>
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
        <span className="px-2 w-full max-w-3xl">
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
