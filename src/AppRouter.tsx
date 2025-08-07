import { Routes, Route } from "react-router-dom";
import InfoForm from "./pages/quotes/InfoForm";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import Home from "./pages/Home";
import Terminology from "./pages/Terminology";
import PartnerContact from "./pages/contact/PartnerContact";
import InvestorContact from "./pages/contact/InvestorContact";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Quotes from "./pages/quotes/Quotes";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Licenses from "./pages/Licenses";

import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

const AppRouter = () => {
  return (
    <RouterWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/terminology" element={<Terminology />} />
        <Route path="/partners" element={<PartnerContact />} />
        <Route path="/investors" element={<InvestorContact />} />
        <Route path="/info" element={<InfoForm />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/results" element={<Results />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/licenses" element={<Licenses />} />
      </Routes>
    </RouterWrapper>
  );
};

export default AppRouter;
