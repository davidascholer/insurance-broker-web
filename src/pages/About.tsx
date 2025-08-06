import Footer from "@/components/Footer";
import Header from "../components/header/Header";

const About = () => {
  return (
    <div className="bg-(--light-pink)">
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
              and streamlined. Just answer a few questions with our PIPA brokers
              and you’re only a few clicks away from financial protection for
              the ones we love.
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
              <a
                href="/licenses"
                className="text-(--primary-coral) font-semibold underline "
              >
                Here
              </a>{" "}
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
