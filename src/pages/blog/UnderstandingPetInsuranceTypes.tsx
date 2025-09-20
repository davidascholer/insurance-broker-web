import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Link } from "react-router-dom";

const UnderstandPetInsuranceTypes = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col justify-start items-start gap-12 p-12 pt-36 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-(--primary-teal-dark) text-3xl sansita-bold whitespace-pre-wrap self-start">
          Understanding Pet Insurance Types with PIPA Broker
        </h1>
        <p>
          When it comes to protecting your furry companion, pet insurance offers
          different levels of coverage so you can tailor protection to your
          pet's needs and your budget.
        </p>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          1. Accident-Only Plans
        </h2>
        <p>
          These plans are your budget-friendly safety net for unexpected
          injuries. Think broken bones, lacerations, poisonings, or
          foreign-object ingestion. Some policies may cover diagnostics,
          hospitalization, medications, or surgery related to these accidents.
        </p>

        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
          Why choose it?
        </h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Lower premiums make it a popular choice for younger, healthy pets or
            older pets limited to this coverage.
          </li>
          <li>Straightforward and simple coverage for emergencies.</li>
        </ul>

        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
          What's missing:
        </h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            No coverage for illnesses, chronic conditions, or preventive care.
          </li>
        </ul>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          2. Accident-and-Illness (Comprehensive) Plans
        </h2>
        <p>
          The most comprehensive option, this plan covers a wide range,
          including infections, chronic or hereditary conditions, diagnostic
          testing, emergency care, and hospitalization.
        </p>

        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
          Why choose it?
        </h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Peace of mind with robust coverage that grows with your pet's needs.
          </li>
          <li>
            Helpful for pets susceptible to chronic or breed-specific ailments.
          </li>
        </ul>

        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
          Key considerations:
        </h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Higher premium cost, plus potentially complex exclusions like
            elective procedures or specific limits.
          </li>
          <li>
            Preventive care and pre-existing conditions are usually excluded.
          </li>
        </ul>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          3. Wellness Add-Ons (Preventive Care Plans)
        </h2>
        <p>
          Wellness or preventive care coverage is not a standalone policy but an
          optional add-on to cover routine, predictable costs, like
          vaccinations, annual exams, dental cleanings, microchipping, or
          heartworm prevention.
        </p>

        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
          Why choose it?
        </h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Helps budget for regular care while you focus on your pet's
            long-term health.
          </li>
        </ul>

        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
          What to keep in mind:
        </h3>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Coverage is often in fixed amounts per service; weigh those against
            actual vet costs to ensure value.
          </li>
        </ul>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          Quick Comparison Table
        </h2>
        <div className="w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Plan Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Focuses On
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Accident-Only
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Unplanned injuries (e.g., broken bones, ingestion)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Budget-conscious owners, healthy or senior pets
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Accident + Illness
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Injuries + illness (infection, chronic or hereditary
                  conditions)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Those seeking broad protection for evolving health needs
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Wellness Add-On
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Routine care (vaccines, exams, dental cleanings)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Those wanting to budget for preventive health care
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          Final Word from PIPA Broker
        </h2>
        <p>
          Each pet is unique and so are the insurance solutions available.
          Whether you're looking to safeguard against emergencies, ensure
          full-spectrum protection, or plan ahead for routine care, there's an
          option that fits.
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>On a tight budget?</strong> Consider starting with an
            Accident-Only plan.
          </li>
          <li>
            <strong>
              Looking for peace of mind through your pet's life stages?
            </strong>{" "}
            Go for a Comprehensive Accident + Illness plan.
          </li>
          <li>
            <strong>
              Want to include predictable health maintenance in your coverage?
            </strong>{" "}
            Add on a Wellness Plan for even broader protection.
          </li>
        </ul>
        <p>
          With PIPA Broker, you're never just picking a policy. You're choosing
          a partner in health and happiness for your best friend. Want help
          building the right combination or comparing plans?{" "}
          <Link to="/info" className="underline font-bold">
            Let's get started!
          </Link>
        </p>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          References
        </h2>
        <ol className="list-decimal ml-5 space-y-2">
          <li>
            <Link
              target="_blank"
              to="https://www.bankrate.com/insurance/pet-insurance/pet-insurance-accident-only-or-accident-and-illness/"
              className="underline font-bold"
            >
              Bankrate
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.petmd.com/dog/general-health/insurance-for-dogs"
              className="underline font-bold"
            >
              PetMD
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.investopedia.com/types-of-pet-insurance-7568108"
              className="underline font-bold"
            >
              Investopedia
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.aspcapetinsurance.com/resources/compare-pet-insurance-types/"
              className="underline font-bold"
            >
              ASPCA Pet Insurance
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.metlifepetinsurance.com/blog/pet-insurance/comprehensive-vs-accident-only-pet-insurance/"
              className="underline font-bold"
            >
              MetLife Pet Insurance
            </Link>
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default UnderstandPetInsuranceTypes;
