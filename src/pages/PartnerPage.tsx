import FetchQuoteButton from "@/components/FetchQuoteButton";
import Footer from "@/components/Footer";
import GetInTouchButton from "@/components/GetInTouchButton";
import Header from "@/components/header/Header";
import { cn } from "@/lib/utils";

const SectionBackground = ({
  color,
  children,
  className,
}: {
  color: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row portrait:flex-col gap-2 justify-center items-center p-12",
        color,
        className
      )}
    >
      {children}
    </div>
  );
};

const PartnerPage = () => {
  return (
    <div className="bg-(--light-pink) pt-24">
      <Header />
      <div className="flex flex-row gap-2 bg-white">
        <div className="flex flex-row portrait:flex-col-reverse gap-0">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center px-16 py-24">
            <h2 className="text-(--primary-teal-dark) text-lg font-bold whitespace-pre-wrap self-start tracking-widest">
              SUPPORTING PETS AND THEIR OWNERS, TOGETHER
            </h2>
            <h1 className="text-(--primary-teal-dark) text-5xl sansita-bold whitespace-pre-wrap self-start">
              Partner with PIPA
            </h1>
            <p className="text-(--primary-teal-dark) text-xl nunito-sans-medium whitespace-pre-wrap self-start">
              Join our growing network of trusted partners—from veterinarians
              and rescues to insurance providers—and connect your community with
              a valuable resource that helps pet parents find the right coverage
              with ease. Partners benefit from features on our site and
              collaborative promotions. Together we can make caring for pets
              more affordable and stress-free.
            </p>
          </div>
          <div className="flex-1 h-full">
            <img
              src="/partner/cats_dogs_photo_3x2.webp"
              alt="Partner with PIPA"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <SectionBackground color="bg-(--light-pink)">
        <div className="flex flex-row flex-wrap justify-center items-center gap-12 p-8 max-w-7xl mx-auto">
          <></>
          <h2 className="text-(--primary-teal) font-extrabold whitespace-pre-wrap self-start tracking-wide">
            FOR RESCUE SHELTERS
          </h2>
          <h2 className="text-(--primary-teal) font-extrabold whitespace-pre-wrap self-start tracking-widest">
            FOR VETERINARIANS
          </h2>
          <h2 className="text-(--primary-teal) font-extrabold whitespace-pre-wrap self-start tracking-widest">
            FOR PET INSURANCE PROVIDERS
          </h2>
        </div>
      </SectionBackground>
      <SectionBackground color="bg-(--coral-pink)">
        <div className="flex flex-row portrait:flex-col justify-center items-center gap-4 p-8 max-w-7xl mx-auto">
          <img
            src="/partner/connection.svg"
            alt="Connection Icon"
            className="size-26"
          />
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-(--primary-teal-dark) text-4xl sansita-bold whitespace-pre-wrap">
              Connection
            </h1>
            <p className="text-(--primary-teal-dark) text-xl text-center nunito-sans-medium whitespace-pre-wrap">
              Connection is one of PIPA’s core values. We believe strong
              partnerships lead to better care for pets and peace of mind for
              the people who love them. By collaborating with veterinarians,
              rescues, and insurance providers, we’re building a supportive
              community centered on pet wellbeing. Together, we’re making pet
              protection simpler and more accessible for everyone.
            </p>
          </div>
        </div>
      </SectionBackground>
      <SectionBackground color="bg-(--primary-teal-dark) ">
        <h2 className="text-2xl sansita-bold whitespace-pre-wrap text-white">
          Rescues save lives. We help those lives flourish.
        </h2>
      </SectionBackground>
      <SectionBackground color="bg-white" className="p-2">
        <div className="flex flex-row portrait:flex-col justify-center items-center gap-12 p-8 max-w-7xl mx-auto">
          <img
            src="/partner/hero_dog_sq.webp"
            alt="Connection Icon"
            className="w-[500px] aspect-square"
          />
          <div className="flex flex-col gap-4 justify-center items-start">
            <h2 className="text-(--primary-teal) text-lg font-bold whitespace-pre-wrap self-start tracking-widest">
              RESCUE SHELTERS X PIPA
            </h2>
            <h1 className="text-(--primary-teal) text-4xl sansita-bold whitespace-pre-wrap text-start">
              Support Pets from Day One
            </h1>
            <p className="text-(--primary-teal) text-xl text-start nunito-sans-medium whitespace-pre-wrap">
              Rescues play a vital role in giving pets a second chance and we
              want to support your mission. By partnering with us, you can offer
              new adopters access to affordable pet insurance options. We’ll
              also spotlight your rescue on our platform and our community
              channels to amplify your impact.
            </p>
            <GetInTouchButton />
          </div>
        </div>
      </SectionBackground>
      <SectionBackground color="bg-(--primary-coral) ">
        <h2 className="text-2xl sansita-bold whitespace-pre-wrap text-white">
          We make quality care accessible for every pet through partnerships with
          veterinarians.
        </h2>
      </SectionBackground>
      <SectionBackground color="bg-white" className="p-2">
        <div className="flex flex-row portrait:flex-col justify-center items-center gap-12 p-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 justify-center items-start">
            <h2 className="text-(--primary-teal) text-lg font-bold whitespace-pre-wrap self-start tracking-widest">
              VETERINARIANS X PIPA
            </h2>
            <h1 className="text-(--primary-teal) text-4xl sansita-bold whitespace-pre-wrap text-start">
              Enhance Pet Care Beyond the Clinic
            </h1>
            <p className="text-(--primary-teal) text-xl text-start nunito-sans-medium whitespace-pre-wrap">
              Your commitment to pet health goes beyond the exam room. Partner
              with us to provide your clients with trusted pet insurance options
              that can help ease the financial burden of unexpected veterinary
              care. We’ll work with you to share resources and offer educational
              tools that empower pet owners to make informed decisions about
              their pets’ health and wellness.
            </p>
            <GetInTouchButton />
          </div>
          <img
            src="/partner/vet_crispy_sq.webp"
            alt="Connection Icon"
            className="w-[500px] aspect-square"
          />
        </div>
      </SectionBackground>
      <SectionBackground color="bg-(--primary-teal-dark) ">
        <h2 className="text-2xl sansita-bold whitespace-pre-wrap text-white">
          PIPA + Pet Insurers: Making great coverage easier to find.
        </h2>
      </SectionBackground>
      <SectionBackground color="bg-white" className="p-2">
        <div className="flex flex-row portrait:flex-col justify-center items-center gap-12 p-8 max-w-7xl mx-auto">
          <img
            src="/partner/golden_retreiver_in_tie_sq.webp"
            alt="Connection Icon"
            className="w-[500px] aspect-square"
          />
          <div className="flex flex-col gap-4 justify-center items-start">
            <h2 className="text-(--primary-teal) text-lg font-bold whitespace-pre-wrap self-start tracking-widest">
              PET INSURANCE PROVIDERS X PIPA
            </h2>
            <h1 className="text-(--primary-teal) text-4xl sansita-bold whitespace-pre-wrap text-start">
              Reach More Pet Parents
            </h1>
            <p className="text-(--primary-teal) text-xl text-start nunito-sans-medium whitespace-pre-wrap">
              As a trusted pet insurance marketplace, partnering with us means
              gaining exposure to engaged pet owners actively seeking coverage.
              We feature your plans prominently on our comparison platform,
              driving leads your way while providing transparent,
              easy-to-understand options for pet parents. Together, we can help
              more pets get the protection they deserve.
            </p>
            <GetInTouchButton />
          </div>
        </div>
      </SectionBackground>
      <SectionBackground color="bg-(--light-pink)">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-4xl sansita-bold whitespace-pre-wrap text-(--primary-teal) ">
            Looking for pet insurance for your cat or your dog?
          </h2>
          <FetchQuoteButton />
        </div>
      </SectionBackground>

      <Footer />
    </div>
  );
};

export default PartnerPage;
