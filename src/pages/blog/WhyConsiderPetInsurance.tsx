import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Link } from "react-router-dom";

const WhatIsPetInsurance = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col justify-start items-start gap-6 p-12 pt-36 max-w-6xl mx-auto min-h-screen">
        <h1 className="text-(--primary-teal-dark) text-3xl sansita-bold whitespace-pre-wrap self-start">
          Why Pet Insurance Deserves a Spot in Your Wallet and Your Heart
        </h1>

        <ol className="list-decimal ml-5 space-y-2">
          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Pets Have Accidents—It&#39;s a Truth of Life
            </h2>
            <p>
              Even the most careful pets can find themselves in unexpected
              trouble. Some common examples are ingesting foreign objects,
              tumbling off furniture, or suffering sudden injuries. These
              moments happen more than you would think.{" "}
              <Link to="/info" className="underline font-bold">
                Pet insurance is your safety net
              </Link>{" "}
              , designed to help you say “yes” to immediate treatment, not
              “maybe later” and hoping for the best. Most policies commonly
              cover accidents along with related diagnostics, surgeries, and
              medications.
            </p>
          </li>
          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Pets Get Sick—And Often When You Least Expect It
            </h2>
            <p>
              Illnesses don’t wait for the perfect moment. From infections and
              allergies to chronic conditions like diabetes or cancer, medical
              surprises are part of pet parenthood. Average dog-related
              healthcare costs alone already run into the hundreds annually.
              Conditions like cancer can cost several thousand dollars. Pet
              insurance helps cover these high-stakes money situations, so your
              decision can be about what’s best for your pet and not your
              financial well-being.
            </p>
          </li>
          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Vet Bills Are Skyrocketing—and Climbing\
            </h2>
            <p>
              Veterinary care isn’t immune from inflation. Between advanced
              diagnostics, state-of-the-art treatments, and rising business
              costs, pet care has surged: Urban veterinary services jumped
              nearly 8% in one year, and overall vet costs rose over 60% from
              2014 to 2024<sup>1</sup>. Without insurance, these bills can hit
              you hard, especially when they come on unexpectedly.
            </p>
          </li>
          <li>
            <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
              Relying on Savings Alone Isn&#39;t Always the Smartest Move
            </h2>
            <p>
              Banking on your savings to cover emergencies is one alternative to
              pet insurance, but at best it takes time to build up your fund and
              in the short run it’s risky. Building a substantial emergency fund
              for non- pet related costs takes years, and a serious veterinary
              bill can derail that progress. Many financial analysts suggest
              that self-insuring may work for routine needs, but not for large,
              urgent medical expenses.<sup>1</sup> Pet insurance lets you budget
              through manageable monthly premiums, allowing you to deploy your
              capital for other things like vacations, home projects, and your
              own health emergencies. In short, it helps you hedge against the
              volatility of draining your capital in a single, stressful event.
            </p>
          </li>
        </ol>
        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          The Simple Truth in a Nutshell
        </h2>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Accidents Happen.</strong> Pet insurance is there when they
            do.
          </li>
          <li>
            <strong>Illnesses Emerge.</strong> You’ll be ready, not reactive.
          </li>
          <li>
            <strong>Costs Are Rising.</strong> Insurance helps soften those
            hits.
          </li>
          <li>
            <strong>Savings Alone?</strong> Not always enough; insurance fills
            the gap.
          </li>
        </ul>
        <p>
          While premiums and policy details differ, the peace of mind that
          insurance delivers is invaluable. With PIPA Broker’s transparent,
          tailored approach, you don’t just buy coverage. You invest in
          protecting your pet’s future while safeguarding your financial peace.
          It’s a confident, caring choice, driven by knowledge and data,
          executed with wisdom yielding benefits that go beyond dollars.
        </p>
        <h2 className="text-(--primary-coral) text-2xl sansita-bold whitespace-pre-wrap flex-1">
          Reference
        </h2>
        <ol className="list-decimal ml-5 space-y-2 text-sm">
          <li>
            <Link
              target="_blank"
              to="https://www.sfchronicle.com/personal-finance/article/pet-insurance-california-20180461.php"
              className="underline font-bold"
            >
              San Francisco Chronicle
            </Link>
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default WhatIsPetInsurance;
