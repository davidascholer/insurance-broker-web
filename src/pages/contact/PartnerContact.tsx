import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const PartnerContact = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/partner-contact",
      title: "Partner Contact",
    });
  }, []);
  return (
    <div className="bg-(--light-pink)">

      <meta name="title" content="Pet Insurance Partnership Opportunities | Partner with PIPA Broker" />
<meta name="description"
  content="Partner with PIPA Broker to bring your pet insurance quotes directly to qualified customers. Connect with our team to explore partnership opportunities." />
<meta name="keywords"
  content="pet insurance partners, insurance partnership, pet insurance brokers, carrier partnerships, insurance API, pet insurance quotes" />
<meta name="author" content="PIPA Broker" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://pipabroker.com/partners" />
<meta property="og:title" content="Pet Insurance Partnership Opportunities | Partner with PIPA Broker" />
<meta property="og:description"
  content="Partner with PIPA Broker to bring your pet insurance quotes directly to qualified customers. Connect with our team to explore partnership opportunities." />
<meta property="og:image" content="https://pipabroker.com/og-image.png" />
<meta property="og:site_name" content="PIPA Broker" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://pipabroker.com/partners" />
<meta property="twitter:title" content="Pet Insurance Partnership Opportunities | Partner with PIPA Broker" />
<meta property="twitter:description"
  content="Partner with PIPA Broker to bring your pet insurance quotes directly to qualified customers. Connect with our team to explore partnership opportunities." />
<meta property="twitter:image" content="https://pipabroker.com/twitter-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="robots" content="index, follow" />
<meta name="language" content="English" />
<meta name="revisit-after" content="7 days" />
<link rel="canonical" href="https://pipabroker.com/partners" />

<title>Pet Insurance Partnership Opportunities | Partner with PIPA Broker</title>
      
      <Header />
      <div className="flex flex-col p-10 pt-36 lg:flex-row justify-start items-center max-w-5xl mx-auto min-h-screen">
        <div className="flex flex-col justify-start items-start gap-8 p-2 w-[320px] min-[400px]:w-[400px] min-[500px]:w-[500px] max-w-[600px]">
          <h1 className="text-(--primary-teal-dark) text-5xl sansita-bold whitespace-pre-wrap overflow-hidden">
            Contact Us
          </h1>
          <p>
            Interested in partnering with PIPA Broker to have your quotes reach
            potential customers? Let’s connect!
          </p>
          <p>
            admin@pipabroker.com<br></br>(747) 276-8262
          </p>
          <ContactForm type={"partner"} />
        </div>
        <img
          src="/contact-partner.webp"
          alt="PIPA Broker"
          className="w-96 self-center"
        />
      </div>
      <Footer />
    </div>
  );
};

export default PartnerContact;
