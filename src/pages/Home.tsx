import { useState } from "react";
import CoverageItem from "../components/CoverageItem";
import FetchQuoteButton from "../components/FetchQuoteButton";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import InsurerItem from "../components/InsurerItem";

const Home = () => {
  const [prudentImage, setPrudentImage] = useState<string>(
    "/insurers/prudent-pet_black.svg"
  );
  const [kanguroImage, setKanguroImage] = useState<string>(
    "/insurers/kanguro.svg"
  );

  return (
    <main role="main" aria-label="Pipa Broker Homepage">
      <section
        className="w-screen h-screen bg-[url('/header.jpg')] bg-no-repeat bg-cover bg-[70%_0%] relative"
        aria-label="Hero section with main call to action"
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
        <meta
          property="og:image"
          content="https://pipabroker.com/og-image.png"
        />
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
        <div className="top-0 left-0 right-0 bottom-0 bg-(--light-pink-transparent) absolute pt-24">
          <div className="flex flex-col gap-12 justify-center ml-4 md:ml-20 max-w-[600px] text-(--text-dark) mt-12">
            <h1
              className="sansita-bold text-5xl mt-36 sm:mt-20 md:mt-4 max-w-[300px] md:max-w-[1000px]"
              aria-label="Main headline for pet insurance services"
            >
              Get the insurance that works best for you and your fur baby today.
            </h1>
            <div aria-label="Primary call to action">
              <FetchQuoteButton />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 min-w-[200px] min-[600px]:min-w-[400px] h-[400px] min-[600px]:h-[300px] w-full">
          <div className="text-center flex flex-col h-[300px] justify-center items-center p-4">
            <p className="float-right mr-1 text-lg font-extrabold w-full sansita-bold text-black mb-8">
              COMPARE PLANS AND PRICES FROM THE TOP COMPANIES
            </p>
            <div className="flex flex-col min-[600px]:flex-row gap-4">
              <img
                className="w-[250px]"
                src={prudentImage}
                alt="Prudent Pet Logo"
                onMouseEnter={() =>
                  setPrudentImage("/insurers/prudent-pet_color.svg")
                }
                onMouseLeave={() =>
                  setPrudentImage("/insurers/prudent-pet_black.svg")
                }
              />
              <img
                className="w-[250px]"
                src={kanguroImage}
                alt="Kanguro Logo"
                onMouseEnter={() =>
                  setKanguroImage("/insurers/kanguro_color.svg")
                }
                onMouseLeave={() =>
                  setKanguroImage("/insurers/kanguro_black.svg")
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-(--light-pink)"
        aria-label="Introduction to Pipa Broker services"
      >
        <div className="p-8 flex flex-col items-center text-center gap-12">
          <h2
            className="sansita-bold text-5xl text-(--primary-teal-dark-transparent) mt-4"
            aria-label="Company introduction heading"
          >
            Hi, we're your modern day pet insurance broker.
          </h2>
          <p aria-label="Service description">
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
        <div className="flex flex-col items-center text-center gap-12 p-4 text-(--text-dark)">
          <h2
            className="sansita-bold text-5xl text-(--primary-coral) pink m-2 p-4"
            aria-label="Insurance carriers section heading"
          >
            Get quotes from trusted carriers.
          </h2>
          <div
            className="flex flex-row justify-evenly items-start gap-5 flex-wrap mt-5"
            role="list"
            aria-label="List of insurance carrier options"
          >
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/aspca_title.jpg"
                altImageText="ASPCA Pet Insurance logo - Trusted pet insurance provider"
                priceText="$45/month or $486/12 months*"
                details="Get quotes from America's top pet insurance carriers right on your phone or desktop."
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/fetch_title.jpg"
                altImageText="Fetch Pet Insurance logo - Comprehensive pet coverage provider"
                priceText="$40/month or $432/12 months*"
                details="Compare pet insurance quotes without the hassle of visiting several different sites."
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/prudent_title.svg"
                altImageText="Prudent Pet Insurance logo - Top pet insurance provider"
                priceText="$8/month or $96/12 months*"
                details="Get affordable, customized quotes based on your pet's unique needs."
              />
            </div>
            <div role="listitem">
              <InsurerItem
                imagePath="./text_logos/embrace_title.png"
                altImageText="Embrace Pet Insurance logo - Personalized pet insurance solutions"
                priceText="$48/month or $510/12 months*"
                details="Not sure which coverage is best?  Don't worry - as your pet insurance broker we'll lay out the coverage in simple terms so you know what you're buying."
              />
            </div>
          </div>
          <span
            className="text-sm text-(--primary-coral) italic"
            role="note"
            aria-label="Pricing disclaimer"
          >
            *Illustrative purposes only; click "fetch a quote" for live policy
            quotes.
          </span>
        </div>
      </section>

      <section
        className="bg-(--primary-coral) w-full"
        aria-label="Pet insurance coverage information"
      >
        <div className="px-2 py-24 flex flex-col gap-5 text-white">
          <h2
            className="sansita-bold large-heading text-white text-3xl mx-16 flex flex-row justify-center items-center gap-4 flex-wrap"
            aria-label="What pet insurance covers section heading"
          >
            What does pet insurance cover?
          </h2>
          <div
            className="flex flex-row justify-evenly items-start gap-5 flex-wrap mt-5"
            role="list"
            aria-label="List of pet insurance coverage types"
          >
            <div role="listitem">
              <CoverageItem
                imagePath="./diagnostics_pet.jpeg"
                title="Diagnostics"
                details="Pet insurance helps cover essential diagnostic services like blood tests, urinalysis, x-rays, MRIs, labwork, CT scans, and ultrasounds. With coverage that supports comprehensive care, you can feel confident knowing you're doing everything you can for your four-legged family member."
              />
            </div>
            <div role="listitem">
              <CoverageItem
                imagePath="./procedures_pet.jpeg"
                title="Procedures"
                details="Pet insurance helps with the costs of outpatient treatments, specialty and emergency care, hospitalization, and even surgery—so your pet can get the expert attention they need, when they need it most."
              />
            </div>
            <div role="listitem">
              <CoverageItem
                imagePath="./medications_pet.jpg"
                title="Medications"
                details="If your pet requires regular medication or special food, pet insurance may help alleviate those costs."
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
