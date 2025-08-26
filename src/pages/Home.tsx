import { useContext, useEffect } from "react";
import CoverageItem from "../components/CoverageItem";
import FetchQuoteButton from "../components/FetchQuoteButton";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import InsurerItem from "../components/InsurerItem";
import { hitsTracker } from "@/api/trackers";
import { useLocation } from "react-router-dom";
import AppThemeContext from "@/theme/AppThemeContext";
import { PIPA_USER_ID_KEY } from "@/lib/constants";
import { generateRandomAlphanumeric } from "@/lib/utils";

const Home = () => {
  const location = useLocation();
  const { theme } = useContext(AppThemeContext);

  console.log("Current theme:", theme);

  useEffect(() => {
    /*
    Note:
    This is a temporary implementation to check that the user has been to the site before.
    This will be replaced after we add user data to the terms and/or privacy policy pages.
    */
    if (!localStorage.getItem(PIPA_USER_ID_KEY)) {
      console.log("Tracking hit.");

      const queryParams = new URLSearchParams(location.search);

      const origin = queryParams.get("fbclid")
        ? "facebook/instagram"
        : queryParams.get("origin")
        ? queryParams.get("origin")
        : "";
      const referrer = document.referrer ? document.referrer : "";
      hitsTracker({ referrer: referrer || "", origin: origin || "" });
      // Set the user to a random 16 char alphanumeric string used for tacking. 
      // Duplicates are possible but unlikely and ok if so.
      localStorage.setItem(PIPA_USER_ID_KEY, generateRandomAlphanumeric(16));
    } else {
      console.log("User has visited before, not tracking hit.");
    }
  }, [location.search]);

  return (
    <div>
      <section className="w-screen h-screen bg-[url('/header.jpg')] bg-no-repeat bg-cover bg-[70%_0%] relative">
        <Header />
        <div className="top-0 left-0 right-0 bottom-0 bg-(--light-pink-transparent) absolute">
          <div className="flex flex-col gap-12 justify-center ml-4 md:ml-20 max-w-[600px] text-(--text-dark) mt-12">
            <h1 className="sansita-bold text-5xl mt-36 sm:mt-20 md:mt-4 max-w-[300px] md:max-w-[1000px]">
              Get the insurance that works best for you and your fur baby today.
            </h1>
            <FetchQuoteButton />
          </div>
        </div>
      </section>
      <section className="bg-(--light-pink)">
        <div className="p-8 flex flex-col items-center text-center gap-12">
          <h1 className="sansita-bold text-5xl text-(--primary-teal-dark-transparent) mt-4">
            Hi, we’re your modern day pet insurance broker.
          </h1>
          <p>
            You answer a few simple questions and we bring you pet insurance
            quotes from trusted carriers. Fast and simple - it couldn’t be any
            easier to protect the ones we love.
          </p>
          <FetchQuoteButton />
        </div>
      </section>

      <div className="bg-white w-full h-[90px]">
        <div className="w-full bg-(--light-pink) h-full background-clip"></div>
      </div>

      <section className="bg-white">
        <div className="flex flex-col items-center text-center gap-12 p-4 text-(--text-dark)">
          <h1 className="sansita-bold text-5xl text-(--primary-coral) pink m-2 p-4">
            Get quotes from trusted carriers.
          </h1>
          <div className="flex flex-row justify-evenly items-start gap-5 flex-wrap mt-5">
            <InsurerItem
              imagePath="./aspca_title.jpg"
              altImageText="ASPCA logo"
              priceText="$45/month or $486/12 months*"
              details="Get quotes from America’s top pet insurance carriers right on your phone or desktop."
            />
            <InsurerItem
              imagePath="./fetch_title.jpg"
              altImageText="Fetch logo"
              priceText="$40/month or $432/12 months*"
              details="Compare pet insurance quotes without the hassle of visiting several different sites."
            />
            <InsurerItem
              imagePath="./embrace_title.png"
              altImageText="Embrace logo"
              priceText="$48/month or $510/12 months*"
              details="Not sure which coverage is best?  Don’t worry - as your pet insurance broker we’ll lay out the coverage in simple terms so you know what you’re buying."
            />
          </div>
          <span className="text-sm text-(--primary-coral) italic">
            *Illustrative purposes only; click “fetch a quote” for live policy
            quotes.
          </span>
        </div>
      </section>
      <section className="bg-(--primary-coral) w-full">
        <div className="px-2 py-24 flex flex-col gap-5 text-white">
          <h1 className="sansita-bold large-heading text-white text-3xl mx-16 flex flex-row justify-center items-center gap-4 flex-wrap">
            What does pet insurance cover?
          </h1>
          <div className="flex flex-row justify-evenly items-start gap-5 flex-wrap mt-5">
            <CoverageItem
              imagePath="./diagnostics_pet.jpeg"
              title="Diagnostics"
              details="Pet insurance helps cover essential diagnostic services like blood tests, urinalysis, x-rays, MRIs, labwork, CT scans, and ultrasounds. With coverage that supports comprehensive care, you can feel confident knowing you're doing everything you can for your four-legged family member."
            />
            <CoverageItem
              imagePath="./procedures_pet.jpeg"
              title="Procedures"
              details="Pet insurance helps with the costs of outpatient treatments, specialty and emergency care, hospitalization, and even surgery—so your pet can get the expert attention they need, when they need it most."
            />
            <CoverageItem
              imagePath="./medications_pet.jpg"
              title="Medications"
              details="If your pet requires regular medication or special food, pet insurance may help alleviate those costs."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
