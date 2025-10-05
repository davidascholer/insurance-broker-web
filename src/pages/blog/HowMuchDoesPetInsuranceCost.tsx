import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Link } from "react-router-dom";

const HowMuchDoesPetInsuranceCost = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col justify-start items-start gap-6 p-12 pt-36 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-(--primary-teal-dark) text-3xl sansita-bold whitespace-pre-wrap self-start">
          The Real Cost of Pet Insurance: What It Costs and What Drives It
        </h1>
        <p>
          At PIPA Broker, we believe in transparency and data driven decision
          making. Let's explore the average costs of pet insurance for dogs and
          cats in 2025, what influences those premiums, and how you can make
          cost-effective, tailored choices for your furry family members.
        </p>

        <ul className="list-none ml-5 space-y-6">
          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 mb-4">
              Average Pet Insurance Costs (2025)
            </h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                The North American Pet Health Insurance Association (NAPHIA)
                reports a similar ballpark: dogs average $62.44/month
                ($749/year); cats average $32.21/month ($386/year).<sup>1</sup>
              </li>
              <li>
                MetLife data aligns closely: $60/month for dogs and $32/month
                for cats, noting extremes by breed, such as French Bulldogs at
                $92/month and Labradors at $62/month.<sup>2</sup>
              </li>
              <li>
                Bankrate, drawing from 2024 NAPHIA figures, puts average A&I
                premiums at $56.30/month for dogs and $31.94/month for cats.
                <sup>3</sup>
              </li>
              <li>
                NerdWallet confirms: dogs average $62/month, cats $32/month.
                Accident-only policies run lower at about $16/month for dogs,
                $9/month for cats.<sup>4</sup>
              </li>
            </ul>
          </li>

          <li className="flex flex-col gap-3">
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 mb-4">
              What Drives Pet Insurance Premiums?
            </h2>
            <p>
              Multiple factors shape those numbers. Here's how each one plays
              into your monthly cost:
            </p>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Species, Size & Breed
            </h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Dogs cost more to insure than cats: higher activity and injury
                risk.<sup>5</sup>
              </li>
              <li>
                Breed matters: Health predispositions and physical size affect
                vet expenses. Larger breeds or those prone to genetic
                conditions, like hip dysplasia, carry higher premiums.
              </li>
            </ul>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Age
            </h3>
            <p>
              Younger pets cost less to insure. As pets age, claims likelihood
              rises—pushing premiums upward.
            </p>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Location
            </h3>
            <p>
              Higher regional veterinary costs = higher premiums. Urban areas or
              regions with cutting-edge care tend to be pricier.<sup>5</sup>
            </p>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Coverage Choice
            </h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                Accident-only plans are significantly cheaper (e.g., $16/month
                for dogs vs. $62/month for full A&I).
              </li>
              <li>
                Accident & Illness (A&I) coverage is more robust and therefore
                more expensive.
              </li>
            </ul>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Deductible, Reimbursement & Limits
            </h3>
            <p>
              Higher deductibles = lower premiums; higher reimbursement rates
              and limits = higher premiums. Customizing these can shift the cost
              significantly.
            </p>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Health History & Pre-existing Conditions
            </h3>
            <p>
              Pre-existing or chronic conditions lead to exclusions or higher
              rates, even if they aren't covered, as the presence of these are
              highly correlated with required vet visits in the future.
            </p>

            <h3 className="text-(--primary-teal-dark) text-xl sansita-bold">
              Insurer & Discounts
            </h3>
            <p>
              Each company underwrites differently. Bundles, multi-pet
              discounts, employer programs can lower rates.
            </p>
          </li>

          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 mb-4">
              Summary Table
            </h2>
            <div className="w-full">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Factor
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Effect on Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Species & Size
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Dogs cost more; larger breeds higher due to health risks
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Breed</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Predispositions increase cost (e.g., hip dysplasia)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Age</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Older pets cost more; younger pets are cheaper
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Location
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Urban/high-cost areas = higher premiums
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Policy Type
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      A&I &gt; Accident-only
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Deductible & Limits
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Lower deductible/high limit = higher premium
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Pre-existing Conditions
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Drives exclusions/higher cost
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Insurer & Discounts
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Varied underwriting; discounts can reduce cost
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>

          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 mb-4">
              PIPA Broker's Smart Budgeting Tips
            </h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Start young:</strong> Insuring puppies/kittens locks in
                lower premium rates.
              </li>
              <li>
                <strong>Compare apples to apples:</strong> Use tools like{" "}
                <Link to="/info" className="underline font-bold">
                  PIPA Broker
                </Link>{" "}
                to compare real-time quotes tailored by breed, age, and
                location.
              </li>
              <li>
                <strong>Trim by choice:</strong> Accident-only saves money, but
                consider A&I for long-term health protection.
              </li>
              <li>
                <strong>Adjust thoughtfully:</strong> Tweak deductible,
                reimbursement, and annual limits to balance monthly outlay and
                risk.
              </li>
              <li>
                <strong>Bundling benefits:</strong> Check for employer or
                existing-insurance discounts.
              </li>
              <li>
                <strong>Review annually:</strong> As your pet and their health
                evolve, reassess to keep coverage fair and affordable.
              </li>
            </ul>
          </li>
        </ul>

        <div className=" ml-4">
          <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 mb-4">
            Final Word from PIPA Broker
          </h2>
          <p>
            Pet insurance is more than a monthly payment. It is thoughtful
            preparation for your pet's wellbeing and your peace of mind. While
            averages give you a baseline like $60 to $62/month for dogs, and $30
            to $32 for cats, the real cost depends on your pet, your policy, and
            your priorities.
          </p>
          <p>
            Want help selecting the ideal mix of coverage, limits, and savings?
            <Link to="/info" className="underline font-bold">
              {" "}
              Let's tailor a plan that works for your budget and heart
            </Link>{" "}
            .
          </p>

          <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1 my-4">
            References
          </h2>
          <ol className="list-decimal ml-5 space-y-2 text-xs">
            <li>
              <Link
                target="_blank"
                to="https://naphia.org/industry-data/section-3-average-premiums/"
                className="underline font-bold"
              >
                NAPHIA
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.metlifepetinsurance.com/blog/pet-insurance/how-much-does-pet-insurance-cost/"
                className="underline font-bold"
              >
                MetLife Pet Insurance
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.bankrate.com/insurance/pet-insurance/how-are-pet-insurance-premiums-determined/"
                className="underline font-bold"
              >
                Bankrate
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.nerdwallet.com/article/insurance/cost-of-pet-insurance"
                className="underline font-bold"
              >
                NerdWallet
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.akcpetinsurance.com/blog/why-does-my-location-affect-pet-insurance-costs"
                className="underline font-bold"
              >
                AKC Pet Insurance
              </Link>
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowMuchDoesPetInsuranceCost;
