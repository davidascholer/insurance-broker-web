import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const InvestorContact = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/investor-contact",
      title: "Investor Contact",
    });
  }, []);

  return (
    <div className="bg-(--light-pink)">

<meta name="title" content="Invest in PIPA Broker | Future of Pet Insurance Distribution" />
<meta name="description"
  content="Explore investor opportunities with PIPA Broker and help shape the future of pet insurance distribution. Connect with our team to learn more and get involved." />
<meta name="keywords"
  content="invest in pet insurance, pet insurance investment, insurance startup investment, investor opportunities, pet insurance distribution, insurtech investment" />
<meta name="author" content="PIPA Broker" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://pipabroker.com/investors" />
<meta property="og:title" content="Invest in PIPA Broker | Future of Pet Insurance Distribution" />
<meta property="og:description"
  content="Explore investor opportunities with PIPA Broker and help shape the future of pet insurance distribution. Connect with our team to learn more and get involved." />
<meta property="og:image" content="https://pipabroker.com/og-image.png" />
<meta property="og:site_name" content="PIPA Broker" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://pipabroker.com/investors" />
<meta property="twitter:title" content="Invest in PIPA Broker | Future of Pet Insurance Distribution" />
<meta property="twitter:description"
  content="Explore investor opportunities with PIPA Broker and help shape the future of pet insurance distribution. Connect with our team to learn more and get involved." />
<meta property="twitter:image" content="https://pipabroker.com/twitter-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="robots" content="index, follow" />
<meta name="language" content="English" />
<meta name="revisit-after" content="7 days" />
<link rel="canonical" href="https://pipabroker.com/investors" />

<title>Invest in PIPA Broker | Future of Pet Insurance Distribution</title>
      
      <Header />
      <div className="flex flex-col p-10 pt-36 lg:flex-row justify-start items-center max-w-5xl mx-auto min-h-screen">
        <div className="flex flex-col justify-start items-start gap-8 p-2 w-[320px] min-[400px]:w-[400px] min-[500px]:w-[500px] max-w-[600px]">
          <h1 className="text-(--primary-teal-dark) text-5xl sansita-bold whitespace-pre-wrap">
            Contact Us
          </h1>
          <p>
            Want to invest in the future of pet insurance distribution? Then
            let’s connect!
          </p>
          <p>
            admin@pipabroker.com<br></br>(747) 276-8262
          </p>
          <ContactForm type={"investor"} />
        </div>
        <img
          src="/contact-investor.webp"
          alt="PIPA Broker"
          className="w-96 self-center"
        />
      </div>
      <Footer />
    </div>
  );
};

export default InvestorContact;
