import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

const PartnerContact = () => {
  return (
    <div className="bg-(--light-pink)">
      <Header />
      <div className="flex flex-col p-10 pt-36 lg:flex-row justify-start items-center max-w-5xl mx-auto min-h-screen">
        <div className="flex flex-col justify-start items-start gap-8 p-2 w-[320px] min-[400px]:w-[400px] min-[500px]:w-[500px] max-w-[600px]">
          <h1 className="text-(--primary-teal-dark) text-5xl sansita-bold whitespace-pre-wrap overflow-hidden">
            Contact Us
          </h1>
          <p>
            Interested in partnering with PIPA Broker to have your quotes reach potential customers? Let’s connect!
          </p>
          <p>
            admin@pipabroker.com<br></br>(747) 276-8262
          </p>
          <ContactForm />
        </div>
        <img
          src="./contact-partner.webp"
          alt="PiPA Broker"
          className="w-96 self-center"
        />
      </div>
      <Footer />
    </div>
  );
};

export default PartnerContact;
