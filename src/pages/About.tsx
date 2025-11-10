import Footer from "@/components/Footer";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-(--light-pink)">

  <meta name="title" content="About PIPA Broker - Pet Insurance Made Simple" />
  <meta name="description"
    content="About PIPA Broker, A modern pet insurance broker simplifying coverage. Get fast quotes from trusted carriers with AI tools for informed pet care decisions." />
  <meta name="keywords"
    content="pet insurance, dog insurance, cat insurance, pet health, veterinary care, pet coverage" />
  <meta name="author" content="PIPA Broker" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pipabroker.com/about" />
  <meta property="og:title" content="About PIPA Broker - Pet Insurance Made Simple" />
  <meta property="og:description"
    content="About PIPA Broker, A modern pet insurance broker simplifying coverage. Get fast quotes from trusted carriers with AI tools for informed pet care decisions." />
  <meta property="og:image" content="https://pipabroker.com/og-image.png" />
  <meta property="og:site_name" content="Pipa Broker" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://pipabroker.com/about" />
  <meta property="twitter:title" content="About PIPA Broker - Pet Insurance Made Simple" />
  <meta property="twitter:description"
    content="About PIPA Broker, A modern pet insurance broker simplifying coverage. Get fast quotes from trusted carriers with AI tools for informed pet care decisions." />
  <meta property="twitter:image" content="https://pipabroker.com/twitter-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <link rel="canonical" href="https://pipabroker.com/about" />

  <title>About PIPA Broker - Pet Insurance Made Simple</title>
      
      <Header />
      <div className="flex flex-col p-10 pt-36 md:flex-row justify-center items-center max-w-5xl mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl text-(--primary-teal-dark) sansita-bold">
              Who we are
            </h1>
            <p className="whitespace-pre-wrap">
              Bottom line, we love our furry family members. And we want to help
              you find the best coverage for them.{" "}
            </p>
            <p className="whitespace-pre-wrap">
              We do the digging - through all the mud and the litter in the pet
              insurance world - to find the best coverage options for your pets.
            </p>
            <p className="whitespace-pre-wrap">
              Fast, friendly, & simple - we make purchasing pet insurance modern
              and streamlined. Just answer a few questions and you’re only a few
              clicks away from financial protection for the ones we love.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl text-(--primary-teal-dark) sansita-bold">
              Licensing information
            </h1>
            <p className="whitespace-pre-wrap">
              Individuals involved in selling, promoting, or arranging insurance
              policies are typically required to hold a license in each state
              they operate. These individuals are commonly referred to as
              “insurance producers.”{" "}
              <button
                onClick={() => {
                  navigate("/licenses");
                }}
                className="text-(--primary-coral) font-semibold underline cursor-pointer"
              >
                Here
              </button>{" "}
              is a summary of states in which we hold active licenses.
            </p>
            <p className="whitespace-pre-wrap">
              All solicitations to apply for insurance and applications for
              insurance are made through PIPA Broker LLC via its Designated
              Responsible Licensed Producer (DRLP).
            </p>
          </div>
        </div>
        <img src={"/about-cat.webp"} alt="cat" className="w-72 m-16" />
      </div>
      <Footer />
    </div>
  );
};

export default About;
