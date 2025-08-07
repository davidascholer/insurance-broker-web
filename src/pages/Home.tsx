import CoverageItem from "../components/CoverageItem";
import FetchQuoteButton from "../components/FetchQuoteButton";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import InsurerItem from "../components/InsurerItem";

const Home = () => {
  return (
    <div>
      <section id="home-page-landing">
        <Header />
        <div id="home-page-landing-overlay">
          <div id="home-page-landing-content">
            <h1 className="sansita-bold text-5xl mt-36 sm:mt-20 md:mt-4 max-w-[300px] md:max-w-[1000px]">
              Get the insurance that works best for you and for your fur baby
              today.
            </h1>
            <FetchQuoteButton />
          </div>
        </div>
      </section>
      <section id="home-page-about">
        <div id="home-page-about-content">
          <h1 className="sansita-bold text-5xl text-(--primary-teal-dark-transparent)">
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
      <div className="chevron-bg-container">
        <div className="chevron-bg"></div>
      </div>
      <section id="home-page-carriers">
        <div id="home-page-carriers-content">
          <h1 className="sansita-bold text-5xl text-(--primary-coral) pink m-2">
            Get quotes from trusted carriers.
          </h1>
          <div className="flex-row-center">
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
            *Illustrative purposes only; click “fetch a quote” for live policy quotes.
          </span>
        </div>
      </section>
      <section id="home-page-coverage-container">
        <div id="home-page-coverage-content">
          <h1 className="sansita-bold large-heading">
            What does pet insurance cover?
          </h1>
          <div className="flex-row-center">
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
