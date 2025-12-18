import Footer from "@/components/Footer";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import FetchQuoteButton from "@/components/FetchQuoteButton";

const pipaColorOptions = {
  teal: "--primary-teal",
  tealDark: "--primary-teal-dark",
  coral: "--primary-coral",
  coralPink: "--coral-pink",
  pink: "--coral-pink",
  lightPink: "--light-pink",
};

const UITCustomContainer = ({
  children,
  flexClassNames,
  flexDirection = "flex-row",
  backgroundColorClassName,
  className,
}: {
  children: React.ReactNode;
  flexClassNames?: string;
  flexDirection?: string;
  backgroundColorClassName?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full m-0 p-0 mx-auto",
        backgroundColorClassName,
        className
      )}
    >
      <div
        className={cn(
          "flex flex-row flex-wrap justify-center items-center gap-2 p-2 max-w-7xl mx-auto",
          flexClassNames,
          flexDirection
        )}
      >
        {children}
      </div>
    </div>
  );
};

const UITCustomPreHeader = ({
  text,
  textColor,
  preHeaderClassNames,
}: {
  text: string;
  textColor: string;
  preHeaderClassNames?: string;
}) => {
  return (
    <h2
      className={cn(
        `text-(${textColor}) text-lg font-bold whitespace-pre-wrap tracking-widest text-center`,
        preHeaderClassNames
      )}
    >
      {text}
    </h2>
  );
};

const UITCustomHeader = ({
  text,
  textColor,
  headerClassNames,
}: {
  text: string;
  textColor: string;
  headerClassNames?: string;
}) => {
  return (
    <div className="w-full p-2">
      <h1
        className={cn(
          `text-(${textColor}) text-5xl sansita-bold whitespace-pre-wrap text-center`,
          headerClassNames
        )}
      >
        {text}
      </h1>
    </div>
  );
};

const UITCustomSecondaryHeader = ({
  text,
  textColor,
  headerClassNames,
}: {
  text: string;
  textColor: string;
  headerClassNames?: string;
}) => {
  return (
    <h1
      className={cn(
        `text-(${textColor}) text-4xl sansita-bold whitespace-pre-wrap text-center`,
        headerClassNames
      )}
    >
      {text}
    </h1>
  );
};

const UITCustomArrow = ({
  arrowColor,
  backgroundColor,
  className,
}: {
  arrowColor: string;
  backgroundColor: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("w-full h-[90px]", `bg-(${backgroundColor})`, className)}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className={cn("w-full h-full background-clip", `bg-(${arrowColor})`)}
      ></div>
    </div>
  );
};

const UITCustomParagraph = ({
  text,
  textColor,
  paragraphClassNames,
}: {
  text: string | React.ReactNode;
  textColor: string;
  paragraphClassNames?: string;
}) => {
  return (
    <p
      className={cn(
        `text-(${textColor}) nunito-sans font-light whitespace-pre-wrap text-center`,
        paragraphClassNames
      )}
    >
      {text}
    </p>
  );
};

// const UITCustomButton = ({
//   buttonClasses,
//   buttonText,
//   buttonColor,
//   font,
//   buttonTextColor,
//   onClick,
// }: {
//   onClick: () => void;
//   buttonClasses?: string;
//   buttonText: string;
//   buttonColor?: string;
//   buttonTextColor?: string;
//   font?: string;
// }) => {
//   return (
//     <button
//       className={cn(
//         "max-w-[200px] p-4 cursor-pointer text-white border-none text-sm transition-transform duration-300 ease space-y-0.5 shadow-lg font-600 tracking-wide rounded-full hover:bg-(--primary-coral) hover:shadow-lg hover:transition-transform hover:duration-200 hover:ease hover:-translate-y-1 min-w-[150px] text-center",
//         buttonClasses,
//         font,
//         buttonColor,
//         buttonTextColor
//       )}
//       onClick={onClick}
//     >
//       {buttonText}
//     </button>
//   );
// };

const UITCustomText = ({
  text,
  textColor,
  textClassNames,
}: {
  text: string;
  textColor: string;
  textClassNames?: string;
}) => {
  return (
    <span
      className={cn(
        `text-(${textColor}) w-full nunito-sans font-bold tracking-normal whitespace-pre-wrap text-sm text-center`,
        textClassNames
      )}
    >
      {text}
    </span>
  );
};

const UITCustomParagraphWithHeader = ({
  headerText,
  paragraphText,
  textColor,
  containerClassName,
}: {
  headerText: string;
  paragraphText: string | React.ReactNode;
  textColor: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("max-w-sm", containerClassName)}>
      <UITCustomContainer flexDirection="flex-col" flexClassNames="gap-6 p-8">
        <UITCustomSecondaryHeader
          text={headerText}
          textColor={textColor}
          headerClassNames="text-3xl"
        />
        <UITCustomParagraph text={paragraphText} textColor={textColor} />
      </UITCustomContainer>
    </div>
  );
};

const UITCustomCircularImage = ({
  src,
  alt,
  imageClassName,
  className,
}: {
  src: string;
  alt?: string;
  imageClassName?: string;
  className?: string;
}) => {
  return (
    <div className={cn(`p-2 flex justify-center items-center`, className)}>
      <img
        src={src}
        alt={alt ?? ""}
        className={cn(
          `rounded-full w-56 aspect-square object-cover object-center`,
          imageClassName
        )}
      />
    </div>
  );
};

const AboutUsPage = () => {
  // const navigate = useNavigate();

  return (
    <div className="bg-(--light-pink) pt-24">

      <meta name="title" content="About PIPA Broker | Simplifying Pet Insurance Decisions" />
<meta name="description"
  content="Learn about PIPA Broker and our mission to simplify pet insurance. We help pet owners compare trusted plans, understand coverage, and make smarter decisions with confidence." />
<meta name="keywords"
  content="about PIPA Broker, pet insurance broker, pet insurance comparison, dog insurance, cat insurance, pet coverage options" />
<meta name="author" content="PIPA Broker" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.pipabroker.com/about-us" />
<meta property="og:title" content="About PIPA Broker | Simplifying Pet Insurance Decisions" />
<meta property="og:description"
  content="Learn about PIPA Broker and our mission to simplify pet insurance. We help pet owners compare trusted plans, understand coverage, and make smarter decisions with confidence." />
<meta property="og:image" content="https://www.pipabroker.com/og-image.png" />
<meta property="og:site_name" content="PIPA Broker" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://www.pipabroker.com/about-us" />
<meta property="twitter:title" content="About PIPA Broker | Simplifying Pet Insurance Decisions" />
<meta property="twitter:description"
  content="Learn about PIPA Broker and our mission to simplify pet insurance. We help pet owners compare trusted plans, understand coverage, and make smarter decisions with confidence." />
<meta property="twitter:image" content="https://www.pipabroker.com/twitter-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="robots" content="index, follow" />
<meta name="language" content="English" />
<meta name="revisit-after" content="7 days" />
<link rel="canonical" href="https://www.pipabroker.com/about-us" />

<title>About PIPA Broker | Simplifying Pet Insurance Decisions</title>

      

      
      <Header />
      <UITCustomContainer
        backgroundColorClassName={`bg-(${pipaColorOptions.tealDark})`}
        flexDirection="flex-col"
        flexClassNames="gap-12 p-12 pb-18"
      >
        <UITCustomPreHeader
          text="TRANSPARENCY, CARE, AND CONNECTION—EVERY STEP OF THE WAY."
          textColor={pipaColorOptions.lightPink}
          preHeaderClassNames="text-xl"
        />
        <UITCustomHeader
          text="Your Tool to Find to the Right Pet Insurance."
          textColor={pipaColorOptions.lightPink}
          headerClassNames="spacing-widest"
        />
      </UITCustomContainer>
      <UITCustomArrow
        arrowColor={pipaColorOptions.tealDark}
        backgroundColor={""}
        className="bg-white"
      />
      <UITCustomContainer
        backgroundColorClassName="bg-white"
        flexDirection="flex-col"
        flexClassNames="gap-8 p-24 bg-white"
      >
        <UITCustomHeader
          text="Who We Are"
          textColor={pipaColorOptions.tealDark}
        />
        <UITCustomParagraph
          text="Bottom line: we love our furry family members—and we want to help you protect yours.

PIPA Broker is a free-to-use pet insurance marketplace that compares top providers for you. We sort through the fine print, options, and costs to bring you the best coverage choices for your pets.

Fast and simple, we make finding pet insurance modern and stress-free. Answer a few questions, explore personalized plan options, and choose the right financial protection for the pets you love—all in just a few clicks.
"
          textColor={pipaColorOptions.tealDark}
        />
        <FetchQuoteButton />
      </UITCustomContainer>
      <UITCustomContainer
        backgroundColorClassName={`bg-(${pipaColorOptions.lightPink})`}
        flexClassNames="max-w-4xl items-start"
      >
        <UITCustomContainer>
          <UITCustomHeader
            text="Why Choose PIPA Broker?"
            textColor={pipaColorOptions.tealDark}
            headerClassNames="p-12"
          />
        </UITCustomContainer>
        <UITCustomParagraphWithHeader
          headerText="We’re Free to Use"
          paragraphText="Our partnerships allow us to offer our services at no cost to you. We clearly disclose which pet insurance providers we partner with, and if you choose a plan through one of them, they pay us—you don’t. You’ll never pay extra for using PIPA."
          textColor={pipaColorOptions.tealDark}
          containerClassName=""
        />
        <UITCustomParagraphWithHeader
          headerText="We’re Licensed"
          paragraphText={
            <>
              We’re a licensed Property & Casualty producer in the U.S.A. What
              does that mean? That means you can trust that everything we
              provide follows industry standards and complies with the laws and
              regulations that protect you. See a list of where we are licensed{" "}
              <Link
                className="text-(--primary-coral) font-semibold"
                to="/licenses"
              >
                here
              </Link>
              .
            </>
          }
          textColor={pipaColorOptions.tealDark}
          containerClassName=""
        />
        <UITCustomParagraphWithHeader
          headerText="We’re Independent"
          paragraphText={
            <>
              We exist to serve you—our customers. Being independent means being
              able to bring the pet insurance market and all the best options
              directly to you.{" "}
              <Link
                className="text-(--primary-coral) font-semibold"
                to="/quotes"
              >
                Our recommendations
              </Link>{" "}
              are always based on your pet’s needs, your budget, and your
              preferences.
            </>
          }
          textColor={pipaColorOptions.tealDark}
          containerClassName=""
        />
        <UITCustomParagraphWithHeader
          headerText="We’re Experienced"
          paragraphText="PIPA Broker may be new, but our expertise isn’t. We’re a team of dedicated pet parents who understand the importance of choosing the right coverage. Our founder has 14+ years in the insurance industry, bringing well over a decade of data-driven insight to help you make confident, informed decisions for your pets."
          textColor={pipaColorOptions.tealDark}
          containerClassName=""
        />
      </UITCustomContainer>
      <UITCustomContainer
        backgroundColorClassName="bg-white"
        flexClassNames="gap-12 p-24"
      >
        <UITCustomHeader
          text="Meet the PIPA Team"
          textColor={pipaColorOptions.tealDark}
        />
        <UITCustomContainer flexClassNames="gap-2 justify-center items-center flex-row flex-wrap">
          <UITCustomContainer
            flexClassNames="flex-col justify-center items-center gap-0"
            className="max-w-60"
          >
            <UITCustomCircularImage
              src="/people/jeff_crispy_team.webp"
              alt="Team member"
            />
            <UITCustomHeader
              text="Jeffrey Hanschmann"
              textColor={pipaColorOptions.tealDark}
              headerClassNames="text-3xl"
            />
            <UITCustomText
              text="CHIEF EXECUTIVE OFFICER"
              textColor={pipaColorOptions.tealDark}
              textClassNames="text-md"
            />
            <UITCustomText
              text="CO-FOUNDER"
              textColor={pipaColorOptions.tealDark}
              textClassNames="text-md"
            />
          </UITCustomContainer>
          <UITCustomContainer
            flexClassNames="flex-col gap-0 justify-center items-center"
            className="max-w-60"
          >
            <UITCustomCircularImage
              src="/people/david_kitties_team.webp"
              alt="Team member"
            />
            <UITCustomHeader
              text="David Scholer"
              textColor={pipaColorOptions.tealDark}
              headerClassNames="text-3xl"
            />
            <UITCustomText
              text="CHIEF TECHNOLOGY OFFICER"
              textColor={pipaColorOptions.tealDark}
              textClassNames="text-sm"
            />
            <UITCustomText
              text="CO-FOUNDER"
              textColor={pipaColorOptions.tealDark}
              textClassNames="text-sm"
            />
          </UITCustomContainer>

          <UITCustomContainer
            flexClassNames="flex-col gap-0 justify-center items-center"
            className="max-w-60"
          >
            <UITCustomCircularImage
              src="/people/caitlin_crispy_team.webp"
              alt="Team member"
            />
            <UITCustomHeader
              text="Caitlin Stoskopf"
              textColor={pipaColorOptions.tealDark}
              headerClassNames="text-3xl"
            />
            <UITCustomText
              text="CHIEF MARKETING OFFICER"
              textColor={pipaColorOptions.tealDark}
              textClassNames="text-sm"
            />
          </UITCustomContainer>
        </UITCustomContainer>
      </UITCustomContainer>
      <UITCustomContainer
        backgroundColorClassName={`bg-(${pipaColorOptions.coralPink})`}
        flexClassNames="p-24"
      >
        <UITCustomPreHeader
          text="THE PURPOSE THAT POWERS PIPA"
          textColor={pipaColorOptions.tealDark}
          preHeaderClassNames="text-xl"
        />
        <UITCustomHeader
          text="Our Mission Statement"
          textColor={pipaColorOptions.tealDark}
        />
        <UITCustomParagraph
          text="At PIPA Broker, our mission is to make pet insurance available, simple, and customizable for every pet parent. We’re dedicated to helping families protect their dogs and cats by providing clear comparisons, trusted information, and effortless guidance—because every paw deserves the best care without the stress."
          textColor={pipaColorOptions.tealDark}
          paragraphClassNames="text-lg max-w-3xl font-semibold"
        />
      </UITCustomContainer>
      <UITCustomContainer
        backgroundColorClassName={"bg-(" + pipaColorOptions.tealDark + ") p-12"}
        flexClassNames="gap-6 flex-col"
      >
        <UITCustomPreHeader
          text="PRINCIPLES THAT GUIDE EVERY DECISION"
          textColor={""}
          preHeaderClassNames="text-xl text-white"
        />
        <UITCustomHeader
          text="Our Core Values"
          textColor={""}
          headerClassNames="text-white"
        />

        <UITCustomContainer>
          <UITCustomContainer className="max-w-[225px] items-center justify-center place-self-start">
            <UITCustomCircularImage
              src="/icons/core_value_integrity.svg"
              alt="Integrity Icon"
              className="size-38"
            />
            <UITCustomHeader
              text={"Integrity"}
              textColor={""}
              headerClassNames="text-white text-4xl"
            />
            <UITCustomParagraph
              text={
                "We believe in honest, clear communication and always act with the best interests of pets and their families at heart."
              }
              textColor={""}
              paragraphClassNames="text-white text-sm font-medium"
            />
          </UITCustomContainer>
          <UITCustomContainer className="max-w-[225px] items-center justify-center place-self-start">
            <UITCustomCircularImage
              src="/icons/core_value_accessibility.svg"
              alt="Accessible Icon"
              className="size-38"
            />
            <UITCustomHeader
              text={"Accessible"}
              textColor={""}
              headerClassNames="text-white text-3xl text-center"
            />
            <UITCustomParagraph
              text={
                "We make pet insurance easy to understand for every pet parent, removing barriers and streamlining the process."
              }
              textColor={""}
              paragraphClassNames="text-white text-sm font-medium"
            />
          </UITCustomContainer>
          <UITCustomContainer className="max-w-[225px] items-center justify-center place-self-start">
            <UITCustomCircularImage
              src="/icons/core_value_empowerment.svg"
              alt="Empowerment Icon"
              className="size-38"
            />
            <UITCustomHeader
              text={"Empowerment"}
              textColor={""}
              headerClassNames="text-white text-3xl text-center"
            />
            <UITCustomParagraph
              text={
                "We empower pet parents by providing trusted knowledge, education and guidance, allowing them to make confident and informed decisions."
              }
              textColor={""}
              paragraphClassNames="text-white text-sm font-medium"
            />
          </UITCustomContainer>
          <UITCustomContainer className="max-w-[225px] items-center justify-center place-self-start">
            <UITCustomCircularImage
              src="/icons/core_value_continuous_improvement.svg"
              alt="Continuous Improvement Icon"
              className="size-38"
            />
            <UITCustomHeader
              text={"Continuous Improvement"}
              textColor={""}
              headerClassNames="text-white text-3xl text-center"
            />
            <UITCustomParagraph
              text={
                "We are committed to constantly improving our services, processes, and products with our customers in mind—reducing worries for pet parents and enhancing the lives of pets."
              }
              textColor={""}
              paragraphClassNames="text-white text-sm font-medium"
            />
          </UITCustomContainer>
          <UITCustomContainer className="max-w-[225px] items-center justify-center place-self-start">
            <UITCustomCircularImage
              src="/icons/core_value_connection.svg"
              alt="Connection Icon"
              className="size-38"
            />
            <UITCustomHeader
              text={"Connection"}
              textColor={""}
              headerClassNames="text-white text-3xl text-center"
            />
            <UITCustomParagraph
              text={
                "We foster partnerships with pet parents, veterinarians, rescues, and insurers to build a supportive, informed community centered on pet wellbeing."
              }
              textColor={""}
              paragraphClassNames="text-white text-sm font-medium"
            />
          </UITCustomContainer>
        </UITCustomContainer>
      </UITCustomContainer>
      <section
        className={cn(
          "w-full bg-[url('/backgrounds/bear_quote_16x9.webp')] min-h-[600px] bg-no-repeat bg-cover bg-[30%_90%] flex justify-start py-8 text-white min-md:bg-left-top"
        )}
        aria-label="Hero section with main call to action"
      >
        <div className="w-full mx-auto flex flex-col justify-center items-start">
          <div className="max-w-[200px] ml-[60vw] min-[768px]:max-w-[400px] text-center flex flex-col items-center justify-center gap-2">
            <span className="sansita-bold text-3xl min-[768px]:text-5xl">
              “I take pet insurance ‘Beary’ seriously.”
            </span>
            <span className="sansita-bold text-xl min-[768px]:text-2xl tracking-widest">
              -BEAR THE DOG
            </span>
            <FetchQuoteButton className="py-2 px-4 text-nowrap mt-4" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
