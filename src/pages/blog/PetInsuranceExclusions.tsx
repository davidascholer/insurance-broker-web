import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Link } from "react-router-dom";

const PetInsuranceExclusions = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col justify-start items-start gap-6 p-12 pt-36 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-(--primary-teal-dark) text-3xl sansita-bold whitespace-pre-wrap self-start">
          What Pet Insurance Doesn't Cover and How to Protect Your Pet Anyway
        </h1>
        <p>
          Understanding what isn't covered by pet insurance is just as important
          as knowing what is. At PIPA Broker, we believe in transparency so you
          can choose coverage that suits your pet's needs and your peace of
          mind.
        </p>

        <ul className="list-none ml-5 space-y-6">
          <li>
            <h2 className="text-(--primary-coral) mb-4 text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Pre-Existing Conditions
            </h2>
            <p>
              <strong>What doesn't get covered:</strong> Any illness or injury
              that appeared <strong>before</strong> your policy began (or{" "}
              <strong>during any waiting period</strong>) is typically excluded.
              This includes undiagnosed symptoms like limping or excessive
              licking, which insurers often classify as existing conditions.
              <sup>1,2</sup>
            </p>
            <br />
            <span>
              <strong>Work around:</strong>
            </span>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Enroll early, ideally when your pet is young and healthy, to
                minimize risk.
              </li>
              <li>
                Some policies allow coverage for curable pre-existing conditions
                after a symptom-free waiting period (e.g., 180 days), but will
                still exclude incurable or chronic issues like diabetes or
                allergies.
              </li>
              <li>
                AKC Pet Insurance is unique in that it offers coverage for both
                curable and incurable pre-existing conditions. But only after
                365 days of uninterrupted coverage.<sup>3</sup>
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-(--primary-coral) mb-4 text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Waiting Periods
            </h2>
            <p>
              <strong>What to expect:</strong> No coverage for conditions that
              arise within the policy's early days or weeks, often 14 to 30 days
              for illnesses, with shorter waiting periods for accidents. Some
              complex conditions, like hip dysplasia, may require up to 12-month
              waiting periods.<sup>4</sup>
            </p>
            <br />
            <p>
              <strong>Why it matters:</strong> A pet getting injured or sick
              immediately after enrollment could be denied coverage due to this
              built-in delay.
            </p>
          </li>

          <li>
            <h2 className="text-(--primary-coral) mb-4 text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Routine, Preventive, and Elective Care
            </h2>
            <span>
              <strong>What's excluded:</strong>
            </span>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Regular checkups, vaccinations, grooming, spaying/neutering, and
                flea or tick treatments are generally{" "}
                <strong>not included</strong> in basic accident or illness
                policies.<sup>4</sup>
              </li>
              <li>
                Elective or cosmetic procedures (e.g., declawing, tail docking,
                or aesthetics) are also excluded.
              </li>
            </ul>
            <br />
            <p>
              <strong>Workaround:</strong> Add a wellness or preventive care
              plan if available, especially if your pet receives frequent
              routine treatments.
            </p>
          </li>

          <li>
            <h2 className="text-(--primary-coral) mb-4 text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Hereditary, Congenital, and Bilateral Conditions
            </h2>
            <span>
              <strong>Coverage varies:</strong>
            </span>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Many policies exclude hereditary or congenital conditions (like
                hip dysplasia or heart disease) unless they're specifically
                included or added as riders.<sup>2</sup>
              </li>
              <li>
                Bilateral conditions (e.g., hip dysplasia that first appears on
                one side and then the other) are typically excluded if one side
                was affected before coverage.<sup>1</sup>
              </li>
            </ul>
            <br />
            <p>
              <strong>PIPA Broker's tip:</strong> Use free tools & resources
              like{" "}
              <Link to="/info" className="underline font-bold">
                PIPA Broker
              </Link>{" "}
              to find insurance that doesn't exclude conditions your pet is
              genetically predisposed to.
            </p>
          </li>

          <li>
            <h2 className="text-(--primary-coral) mb-4 text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Other Common Exclusions
            </h2>
            <p>Additional exclusions may include:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Pregnancy and birthing-related expenses</li>
              <li>
                Claim administration fees, such as vet charges for completing
                forms or obtaining medical records
              </li>
              <li>Breed-specific or age-specific limitations, caps, or fees</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          At-a-Glance: Exclusions & Strategies Table
        </h2>
        <div className="w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Excluded Item
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  When It Applies
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  How to Navigate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Pre-existing Conditions
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Conditions or symptoms before policy effective date or during
                  waiting periods
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Enroll early; choose plans that cover curable conditions after
                  a waiting period; AKC covers all after 1 year
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Waiting Periods
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Immediately after enrollment: illness/weeks;
                  accidents/shorter; complex conditions/longer
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Enroll your pet before any health issues arise to avoid delays
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Routine/Preventive & Elective Care
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Vaccinations, checkups, grooming, elective surgeries
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Add wellness or preventive care riders
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Hereditary, Congenital, & Bilateral Conditions
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Genetic or birth-related issues; second occurrence on opposite
                  side
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Look for policies that include genetic coverage or use
                  guidance tools for breed risk
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Pregnancy & Administrative Fees
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  During breeding, birthing, or for claims processing
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Carefully examine policy documents
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Breed/Age Restrictions or Caps
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Specific to certain breeds or older pets
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Shop multiple providers and check state-specific regulations
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          Final Thoughts from PIPA Broker
        </h2>
        <p>
          Every pet is unique. Understanding exclusions empowers you to choose a
          plan that truly fits your pet's needs.
        </p>
        <div>
          <span>At PIPA Broker, we help you:</span>
          <ul className="list-disc ml-5 space-y-2 mt-2">
            <li>Compare plans clearly</li>
            <li>Identify crucial coverage gaps</li>
            <li>Select smart add-ons</li>
          </ul>
        </div>
        <p>
          Want help walking through a real policy's exclusions or customizing
          coverage for your pup? Let's make it simple and secure.{" "}
          <Link to="/info" className="underline font-bold">
            Get your quotes now!
          </Link>
        </p>

        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          References
        </h2>
        <ol className="list-decimal ml-5 space-y-2 text-sm">
          <li>
            <Link
              target="_blank"
              to="https://www.petmd.com/general-health/does-pet-insurance-cover-pre-existing-conditions"
              className="underline font-bold"
            >
              PetMD
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.aspcapetinsurance.com/research-and-compare/pet-insurance-basics/pet-insurance-and-pre-existing-conditions/"
              className="underline font-bold"
            >
              ASPCA Pet Insurance
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.akcpetinsurance.com/plans/pre-existing-conditions"
              className="underline font-bold"
            >
              AKC Pet Insurance
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://www.pumpkin.care/post/exclusions-in-pet-insurance"
              className="underline font-bold"
            >
              Pumpkin Pet Insurance
            </Link>
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default PetInsuranceExclusions;
