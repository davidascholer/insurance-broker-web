import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Link } from "react-router-dom";

const WhatIsPetInsurance = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col justify-start items-start gap-6 p-12 pt-36 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-(--primary-teal-dark) text-3xl sansita-bold whitespace-pre-wrap self-start">
          Understanding Pet Insurance &amp; How It Works with PIPA Broker
        </h1>
        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          What is Pet Insurance
        </h2>
        <p>
          Pet insurance is a financial safety net designed to help pet owners
          manage the costs of veterinary care. It operates on a reimbursement
          model, where you pay the vet upfront and then submit a claim to your
          insurance provider for eligible expenses. Coverage typically includes
          accidents, illnesses, and sometimes preventive care, depending on the
          policy.
        </p>
        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 mb-0">
          How Pet Insurance Works
        </h2>
        <ol className="list-decimal ml-5 space-y-2">
          <li>
            <strong>Choose a Policy:</strong> Use{" "}
            <Link to="/info" className="underline font-bold">
              PIPA Broker’s tool
            </Link>{" "}
            to help find &amp; compare pet insurance options, then select the
            plan that fits your pet’s needs and your budget.
          </li>
          <li>
            <strong>Pay Premiums:</strong> After selecting and purchasing the
            right policy, pay monthly or annual premiums to keep the policy
            active.
          </li>
          <li>
            <strong>Visit Any Licensed Vet:</strong> Most policies allow you to
            visit any licensed veterinarian.
          </li>
          <li>
            <strong>Pay Vet Bills Upfront:</strong> After treatment, pay the vet
            directly.
          </li>
          <li>
            <strong>Submit a Claim:</strong> Send the invoice and any required
            documentation to your insurer.
          </li>
          <li>
            <strong>Receive Reimbursement:</strong> The insurer reimburses you
            for covered expenses, minus any{" "}
            <Link to="/terminology" className="underline font-bold">
              deductibles or co-pays
            </Link>
            .
          </li>
        </ol>
        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          Types of Coverage
        </h2>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Accident Coverage:</strong> Covers injuries like fractures
            or ingestion of foreign objects.
          </li>
          <li>
            <strong>Accident and Illness:</strong> Includes coverage for
            diseases such as cancer or infections.
          </li>
          <li>
            <strong>Wellness Plans:</strong> Optional add-ons for routine care
            like vaccinations and dental cleanings.
          </li>
          <li>
            <strong>Learn more:</strong> Visit our blog on{" "}
            <Link
              to="/blog/understanding-pet-insurance-types"
              className="underline font-bold"
            >
              understanding pet insurance types
            </Link>{" "}
            to find out which coverage type is best for your pet.
          </li>
        </ul>
        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          Key Considerations
        </h2>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Deductibles:</strong> The amount you pay out-of-pocket
            before insurance kicks in.
          </li>
          <li>
            <strong>Reimbursement Rates:</strong> Typically range from 70% to
            90% of covered costs.
          </li>
          <li>
            <strong>Coverage Limits:</strong> Some policies have annual or
            lifetime caps on payouts.
          </li>
          <li>
            <strong>Pre-existing Conditions:</strong> Most policies do not cover
            conditions that existed before the policy started.
          </li>
          <li>
            <strong>Understand Exclusions:</strong> It’s extremely important to
            understand what is excluded in the policy before you purchase one
            for your furry pal.
            {/* For a comprehensive understanding of common pet
            insurance exclusions, click here. */}
          </li>
          <li>
            <strong>For more on these:</strong> Visit our blog on{" "}
            <Link to="/terminology" className="underline font-bold">
              Pet Insurance Terminology
            </Link>
            .
          </li>
        </ul>
        <p>
          Pet insurance can provide peace of mind, ensuring that you can afford
          necessary care for your pet without financial strain. It&#39;s
          important to{" "}
          <Link to="/info" className="underline font-bold">
            compare policies
          </Link>{" "}
          and{" "}
          <Link to="/terminology" className="underline font-bold">
            understand the terms
          </Link>{" "}
          to choose the best option for your furry friend.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default WhatIsPetInsurance;
