import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

const TerminologySection = ({
  imgSrc,
  imgAlt,
  headerText,
  children,
}: {
  imgSrc: string;
  imgAlt: string;
  headerText: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 items-center justify-around w-full">
        <img src={imgSrc} alt={imgAlt} className="w-[40px]" />
        <h2 className="text-(--primary-teal-dark) text-4xl sansita-bold whitespace-pre-wrap flex-1">
          {headerText}
        </h2>
      </div>
      <div className="whitespace-pre-wrap ml-[50px]">{children}</div>
    </div>
  );
};

const Terminology = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col justify-start items-start gap-12 p-12 pt-36 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-(--primary-coral) text-3xl sansita-bold whitespace-pre-wrap self-start">
          Pet Insurance Terminology and Why These Terms Matter
        </h1>
        <p className="text-(--primary-teal-dark) whitespace-pre-wrap font-bold">
          Understanding these key terms can help you pick the best coverage for
          your furry family member—and avoid surprises when vet visits happen.
          Always review each policy’s limits, waiting periods, and deductible
          setup so you’re prepared for whatever comes your pet’s way!
        </p>
        <TerminologySection
          imgSrc="./terminology-annuallimit.webp"
          imgAlt="Annul Limit"
          headerText="Annual Maximum (or Annual Limit)"
        >
          <span>
            This is the total dollar amount your insurer will cover in a year
            under your policy. For instance, if your annual limit is $3,000,
            that’s the most you can be reimbursed for vet care during that
            12‑month period.
            <br></br>
            <strong>Example:</strong> If your dog has a serious sprain and needs
            $2,000 in treatment, you’d still have $1,000 of coverage left if
            another issue arises that same year.
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-claim.webp"
          imgAlt="Claim"
          headerText="Claim"
        >
          <span>
            A claim is simply a request you send to your insurance company{" "}
            <strong>
              <em>after</em>
            </strong>{" "}
            paying a covered vet bill, asking for reimbursement.<br></br>
            <strong>Example:</strong> You take your cat to the vet for ear
            mites, pay $150 at checkout,{" "}
            <strong>
              <em>then</em>
            </strong>{" "}
            submit that receipt to your insurer to get that money back.
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-coverage.webp"
          imgAlt="Comprehensive Coverage"
          headerText="Comprehensive Coverage (aka “Nose‑to‑Tail” Insurance)"
        >
          <span>
            This plan bundles accident and illness protection with regular care
            services like annual checkups or vaccinations.<br></br>
            <strong>Example:</strong> Your cat gets injured jumping off a
            counter (covered under accidents), plus you receive partial
            reimbursement for her yearly dental cleaning (part of wellness
            benefits).
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-deductible.webp"
          imgAlt="Deductible"
          headerText="Deductible"
        >
          <span>
            This is the amount you pay out-of-pocket before your insurance
            company starts covering costs. Deductibles may reset each year or
            apply separately to each new illness or injury.<br></br>
            <strong>Example:</strong> With a $250 annual deductible, you pay the
            first $250 of covered vet bills that year. After that, the insurer
            begins reimbursing.
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-policyterm.webp"
          imgAlt="Policy Term"
          headerText="Policy Term"
        >
          <span>
            The policy term is simply how long your insurance stays in
            effect—typically one full year from the date it starts.<br></br>
            <strong>Example:</strong> If your policy starts on May 1, 2025, your
            coverage runs through April 30, 2026.
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-preexisting.webp"
          imgAlt="Pre‑Existing Condition"
          headerText="Pre‑Existing Condition"
        >
          <span>
            This refers to any health issue your pet had{" "}
            <strong>
              <em>before</em>
            </strong>{" "}
            your insurance coverage began—
            <strong>
              <em>or during its waiting period</em>
            </strong>
            . Most insurers don’t cover incurable conditions but might cover
            one-time issues once your pet has fully recovered.<br></br>
            <strong>Example:</strong> Since your dog had epilepsy before the
            coverage started, future seizures wouldn’t be covered. But if she
            had a minor infection before the policy began and is now healthy,
            some insurers might cover it after a symptom-free period.
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-reimbursement.webp"
          imgAlt="Reimbursement Percentage"
          headerText="Reimbursement Percentage"
        >
          <span>
            This is the share of a covered vet bill your insurer will pay after
            your deductible. This will be applied after (or net) of your
            deductible.<br></br>
            <strong>Example:</strong> With an 80% reimbursement rate, if your
            dog’s vet visit costs $500 (
            <strong>
              <em>after deductible</em>
            </strong>
            ), the insurance would pay $400 and you’d cover the remaining $100.
          </span>
        </TerminologySection>
        <TerminologySection
          imgSrc="./terminology-waiting.webp"
          imgAlt="Waiting Period"
          headerText="Waiting Period"
        >
          <>
            <span>
              This is the delay between when you start your policy and when
              different types of coverage actually begin.
            </span>
            <ul data-rte-list="default" className="list-disc pl-6">
              <li>
                <strong>Accidents</strong>: usually covered after 1–14 days
              </li>
              <li>
                <strong>Illnesses</strong>: often after about 14 days
              </li>
              <li>
                <strong>Orthopedic issues</strong> (like hip dysplasia):
                sometimes have a 6–12 month wait<br></br> Not every insurance
                provider applies an orthopedic waiting period.<br></br>{" "}
                <strong>Example:</strong> If your plan has a 14-day waiting
                period for illnesses and starts on August 1, the earliest you
                can receive coverage for a tummy bug or infection is August 15.
              </li>
            </ul>
          </>
        </TerminologySection>
      </div>
      <Footer />
    </div>
  );
};

export default Terminology;
