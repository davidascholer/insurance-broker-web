import Footer from "@/components/Footer";
import Header from "../components/header/Header";
import React, { useEffect } from "react";
import { licenses } from "@/data/licenses";
import ReactGA from "react-ga4";

const Licenses = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/licenses",
      title: "Licenses",
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="p-12 pt-36 flex flex-col gap-12 bg-(--light-pink) min-h-screen">
        <h1 className="text-5xl text-(--primary-teal-dark) sansita-bold">
          State Licenses
        </h1>
        <ul
          data-rte-list="default"
          className="list-disc pl-8 flex flex-col gap-2"
        >
          {licenses.map((license) => (
            <React.Fragment key={license.state}>
              {license.license !== "TBD" ? (
                <li key={license.state}>
                  {license.state === "Washington" ? (
                    <p className="whitespace-pre-wrap">
                      <strong>{license.state}</strong> -
                      <strong>{license.license}</strong>{" "}
                    </p>
                  ) : (
                    <p className="whitespace-pre-wrap">
                      {license.state} -{license.license}
                    </p>
                  )}
                </li>
              ) : null}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Licenses;
