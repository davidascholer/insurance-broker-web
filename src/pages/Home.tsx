import { useState } from "react";
import CoverageItem from "../components/CoverageItem";
import FetchQuoteButton from "../components/FetchQuoteButton";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import InsurerItem from "@/components/InsurerItem";

const Home = () => {
  const navigate = useNavigate();

  const [prudentImage, setPrudentImage] = useState<string>(
    "/insurers/prudent_logo_white_wide.svg"
  );
  const [kanguroImage, setKanguroImage] = useState<string>(
    "/insurers/kanguro_logo_white_wide.svg"
  );

  return (
    <main
      role="main"
      aria-label="Pipa Broker Homepage"
      className="overflow-scroll no-scrollbar"
    >
      <meta name="title" content="Pipa Broker - Pet Insurance Made Simple" />
      <meta
        name="description"
        content="Find the perfect pet insurance for your furry family members. Compare quotes from top providers and protect your pets with comprehensive coverage."
      />
      <meta
        name="keywords"
        content="pet insurance, dog insurance, cat insurance, pet health, veterinary care, pet coverage"
      />
      <meta name="author" content="Pipa Broker" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pipabroker.com/" />
      <meta
        property="og:title"
        content="Pipa Broker - Pet Insurance Made Simple"
      />
      <meta
        property="og:description"
        content="Find the perfect pet insurance for your furry family members. Compare quotes from top providers and protect your pets with comprehensive coverage."
      />
      <meta property="og:image" content="https://pipabroker.com/og-image.png" />
      <meta property="og:site_name" content="Pipa Broker" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://pipabroker.com/" />
      <meta
        property="twitter:title"
        content="Pipa Broker - Pet Insurance Made Simple"
      />
      <meta
        property="twitter:description"
        content="Find the perfect pet insurance for your furry family members. Compare quotes from top providers and protect your pets with comprehensive coverage."
      />
      <meta
        property="twitter:image"
        content="https://pipabroker.com/twitter-image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href="https://pipabroker.com/" />
      <title>Pipa Broker - Pet Insurance Made Simple</title>

      <Header />

      <section
        className="w-full bg-[url('/backgrounds/old_cat_and_dog_mobile_800x1200.webp')] min-[768px]:bg-[url('/backgrounds/old_cat_and_dog_1920x800.webp')] bg-no-repeat bg-[70%_100%] min-[768px]:bg-[80%_0%] bg-cover"
        aria-label="Hero section with main call to action"
      >
        <div className="bg-(--light-pink-transparent) w-full p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 justify-center ml-4 md:ml-20 max-w-[600px] text-(--text-dark) mt-16 min-h-auto p-2 pt-16">
              <div>
                <span className="tracking-wide font-bold">
                  TRUSTED COVERAGE IN MINUTES
                </span>
                <h1
                  className="sansita-bold text-5xl"
                  aria-label="Main headline for pet insurance services"
                >
                  Compare Pet Insurance Quotes For Dogs & Cats
                </h1>
              </div>
              <div className="p-4 flex flex-col flex-nowrap min-[768px]:flex-row text-lg sansita-bold gap-2 min-[768px]:gap-10 justify-start items-start rounded-sm cursor-pointer">
                <ul className="flex flex-col list-disc gap-2">
                  <li>Customized coverage</li>
                  <li>100% FREE service</li>
                  <li>Risk free & no credit checks</li>
                </ul>
                <ul className="flex flex-col list-disc gap-2">
                  <li>Licensed and trusted providers</li>
                  <li>Fast and easy to use</li>
                  <li>Save money on vet care</li>
                  {/* <li>Risk-free cancellation</li> */}
                </ul>
              </div>
              <div aria-label="Primary call to action" className="mb-4">
                <FetchQuoteButton />
              </div>
            </div>
            <div
              className="w-full h-72"
              role="presentation"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </section>
      <section
        className="bg-(--primary-teal) w-full"
        aria-label="Top insurance carriers"
      >
        <div className="text-center flex flex-col min-[768px]:flex-row flex-nowrap justify-center items-center p-4 max-w-3xl mx-auto">
          <p className=" text-2xl font-extrabold w-full sansita-bold text-white mb-4">
            We proudly partner with...
          </p>
          <img
            className="cursor-pointer w-[200px]"
            src={prudentImage}
            alt="Prudent Pet Logo"
            onMouseEnter={() =>
              setPrudentImage("/insurers/prudent_logo_color_white_wide.svg")
            }
            onMouseLeave={() =>
              setPrudentImage("/insurers/prudent_logo_white_wide.svg")
            }
            onClick={() => {
              navigate("/info");
            }}
          />
          <img
            className="cursor-pointer w-[200px] mb-4"
            src={kanguroImage}
            alt="Kanguro Logo"
            onMouseEnter={() =>
              setKanguroImage("/insurers/kanguro_logo_color_white_wide.svg")
            }
            onMouseLeave={() =>
              setKanguroImage("/insurers/kanguro_logo_white_wide.svg")
            }
            onClick={() => {
              navigate("/info");
            }}
          />
        </div>
      </section>
      <section
        className="bg-(--light-pink)"
        aria-label="Introduction to Pipa Broker services"
      >
        <div className="p-8 flex flex-col items-center text-center gap-12 max-w-4xl mx-auto">
          <h2
            className="sansita-bold text-4xl text-(--primary-teal-dark-transparent) mt-4"
            aria-label="Company introduction heading"
          >
            Hi, we're your modern day pet insurance broker.
          </h2>
          <p aria-label="Service description" className="nunito-sans-medium">
            You answer a few simple questions and we bring you pet insurance
            quotes from trusted carriers. Fast and simple - it couldn't be any
            easier to protect the ones we love.
          </p>
          <div aria-label="Secondary call to action">
            <FetchQuoteButton />
          </div>
        </div>
      </section>

      <div
        className="bg-white w-full h-[90px]"
        role="presentation"
        aria-hidden="true"
      >
        <div className="w-full bg-(--light-pink) h-full background-clip"></div>
      </div>

      <section
        className="bg-white"
        aria-label="Trusted insurance carriers showcase"
      >
        <div className="flex flex-col items-center text-center gap-12 p-4 text-(--text-dark) pb-16">
          <h2
            className="sansita-bold text-5xl text-(--primary-coral) pink m-2 p-4"
            aria-label="Insurance carriers section heading"
          >
            Get quotes from trusted carriers.
          </h2>
          <div
            className="flex flex-row flex-wrap justify-evenly items-start gap-1 mt-5"
            role="list"
            aria-label="List of insurance carrier options"
          >
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/kanguro_logo_blue_horz.svg"
                altImageText="Embrace Pet Insurance logo - Personalized pet insurance solutions"
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/prudent_logo_blue_horz.svg"
                altImageText="Prudent Pet Insurance logo - Top pet insurance provider"
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/fetch_logo_blue_horz.svg"
                altImageText="Fetch Pet Insurance logo - Comprehensive pet coverage provider"
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/aspca_logo_blue_horz.svg"
                altImageText="ASPCA Pet Insurance logo - Trusted pet insurance provider"
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/and_more_blue_horz.svg"
                altImageText="ASPCA Pet Insurance logo - Trusted pet insurance provider"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-(--primary-coral) w-full"
        aria-label="Pet insurance coverage information"
      >
        <div className="px-2 py-24 flex flex-col gap-5 text-white max-w-6xl mx-auto">
          <h2
            className="sansita-bold large-heading text-white text-4xl font-bold mx-16 flex flex-row justify-center items-center gap-4 flex-wrap mb-4 text-center"
            aria-label="What pet insurance covers section heading"
          >
            What does insurance cover?
          </h2>
          <div
            className="flex flex-row justify-evenly items-start gap-5 flex-wrap mt-5"
            role="list"
            aria-label="List of pet insurance coverage types"
          >
            <div role="listitem">
              <CoverageItem
                imagePath="./icons/diagnostics_icon_light_pink_circle.svg"
                title="Diagnostics"
                details="Pet insurance helps cover essential diagnostic services like blood tests, urinalysis, x-rays, MRIs, labwork, CT scans, and ultrasounds. With coverage that supports comprehensive care, you can feel confident knowing you're doing everything you can for your four-legged family member."
              />
            </div>
            <div role="listitem">
              <CoverageItem
                imagePath="./icons/procedures_icon_light_pink_circle.svg"
                title="Procedures"
                details="Pet insurance helps with the costs of outpatient treatments, specialty and emergency care, hospitalization, and even surgery—so your pet can get the expert attention they need, when they need it most."
              />
            </div>
            <div role="listitem">
              <CoverageItem
                imagePath="./icons/medication_icon_light_pink_circle.svg"
                title="Medications"
                details="If your pet requires ongoing medication or prescription food to manage a chronic condition or recovery, pet insurance can help cover those costs. Many plans reimburse for approved medications prescribed by your veterinarian, helping make long-term care more affordable."
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full bg-[url('/backgrounds/mrc_wide_quote.webp')] min-h-[200px] bg-no-repeat bg-cover bg-right flex justify-start py-8"
        aria-label="Hero section with main call to action"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col justify-center items-start">
          <div className="max-w-[200px] ml-[10vw] min-[768px]:max-w-[400px] text-center flex flex-col items-center justify-center">
            <span className="sansita-bold text-xl min-[768px]:text-3xl">
              Thanks to PIPA Broker, I'm getting all nine lives I was promised.
            </span>
            <FetchQuoteButton className="py-2 px-4 text-nowrap mt-4" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
