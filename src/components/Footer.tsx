import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const FooterColumn = ({
  header,
  items,
  children,
  className,
}: {
  header: string;
  items: { url: string; msg: string }[];
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col justify-start items-start", className)}>
      <h2 className="text-white text-2xl font-semibold mb-2 sansita-bold">
        {header}
      </h2>
      {items &&
        items.map((item: { url: string; msg: string }, index: number) => (
          <Link
            key={index}
            to={item.url}
            className="sansita-regular cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            {item.msg}
          </Link>
        ))}
      {children}
    </div>
  );
};

const Footer = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <footer
      className={cn(
        "bg-(--primary-teal-dark) sticky top-0 z-100 px-16 py-12",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto p-4 flex flex-col min-[768px]:flex-row items-center justify-between">
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="nav-link nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            <img
              src="/pipa_text_white.png"
              alt="PIPA Broker"
              className="w-32 mb-2"
            />
          </button>
        </div>

        <nav className="navigation flex flex-col flex-wrap min-[768px]:flex-row items-start gap-16 ml-16 px-6 text-(--primary-coral) flex-1 justify-start">
          <FooterColumn
            header="Resources"
            className=""
            items={[
              { url: "/faqs", msg: "FAQs" },
              { url: "/terminology", msg: "Pet Insurance 101 - Terminology" },
              {
                url: "/blog/what-is-pet-insurance",
                msg: "What is Pet Insurance and How It Works",
              },
              {
                url: "/blog/why-consider-pet-insurance",
                msg: "Why Consider Pet Insurance",
              },
              {
                url: "/blog/how-to-compare-pet-insurance-policies",
                msg: "How To Compare Pet Insurance Policies",
              },
              {
                url: "/blog/understanding-pet-insurance-types",
                msg: "Understanding Pet Insurance Types",
              },
              {
                url: "/blog/pet-insurance-exclusions",
                msg: "Pet Insurance Exclusions and Work Arounds",
              },
              {
                url: "/blog/how-much-does-pet-insurance-cost",
                msg: "How Much Does Pet Insurance Cost",
              },
            ]}
          />
          <FooterColumn
            header="Partners"
            items={[
              { url: "/info", msg: "Prudent Pet" },
              { url: "/info", msg: "Kanguro" },
              { url: "/partners", msg: "Become a Partner" },
            ]}
          />
          <FooterColumn
            header="About"
            items={[
              { url: "/about", msg: "About PIPA Broker" },
              { url: "/terms", msg: "Terms of Use" },
              { url: "/privacy", msg: "Privacy Policy" },
              { url: "/licenses", msg: "Licenses" },
            ]}
          />
          <FooterColumn
            header="Contact"
            items={[{ url: "/partners", msg: "Partner with Us" }]}
          >
            <Link
              to="mailto:admin@pipabroker.com"
              target="_blank"
              className="sansita-regular cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5"
            >
              Email Us
            </Link>
            <div className="w-full flex flex-row justify-center items-center mt-4 gap-2">
              <Link
                to="https://www.facebook.com/profile.php?id=61579696327519"
                target="_blank"
                className="sansita-regular cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5"
              >
                <img
                  className="inline-block mb-1 mr-1 size-8"
                  src="/icons/facebook_icon_light_pink_circle.svg"
                  alt="Facebook"
                />
              </Link>
              <Link
                to="https://www.instagram.com/pipabroker/"
                target="_blank"
                className="sansita-regular cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5"
              >
                <img
                  className="inline-block mb-1 mr-1 size-8"
                  src="/icons/instagram_icon_light_pink_circle.svg"
                  alt="Instagram"
                />
              </Link>
            </div>
          </FooterColumn>
        </nav>
      </div>
      {/* <hr className="w-full" /> */}
      <div className="flex flex-col items-center justify-center gap-8 p-4">
        <p className="text-white text-sm text-center mt-2 mb-4">
          PIPA Broker, LLC (“PIPA Broker”), with its principal place of business
          in Seattle, Washington, is a licensed independent insurance broker.
          The information provided on this site has been developed by PIPA
          Broker for general informational and educational purposes. We do our
          best to ensure that this information is up-to-date and accurate. Any
          insurance policy premium quotes or ranges displayed are non-binding.
          The final insurance policy premium for any policy is determined by the
          underwriting insurance company following application.
        </p>
        <div className="flex flex-col gap-0 justify-center items-center">
          <span className="text-sm text-white">
            © Copyright 2025 PIPA Broker, LLC. All rights reserved.
          </span>
          <span className="text-sm text-white">
            PIPA Broker conducts business as Insurance Services by PIPA in the
            following states: California; West Virginia.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
