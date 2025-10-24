import { Routes, Route } from "react-router-dom";
import InfoForm from "./pages/InfoForm";
import Home from "./pages/Home";
import Terminology from "./pages/Terminology";
import PartnerContact from "./pages/contact/PartnerContact";
import InvestorContact from "./pages/contact/InvestorContact";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Quotes from "./pages/Quotes";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Licenses from "./pages/Licenses";

import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Admin from "./pages/Admin";
import WhatIsPetInsurance from "./pages/blog/WhatIsPetInsurance";
import WhyConsiderPetInsurance from "./pages/blog/WhyConsiderPetInsurance";
import HowToComparePetInsurancePolicies from "./pages/blog/HowToComparePetInsurancePolicies";
import UnderstandPetInsuranceTypes from "./pages/blog/UnderstandingPetInsuranceTypes";
import PetInsuranceExclusions from "./pages/blog/PetInsuranceExclusions";
import HowMuchDoesPetInsuranceCost from "./pages/blog/HowMuchDoesPetInsuranceCost";
import KanguroEmbed from "./features/kanguro/pages/KanguroEmbed";

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
        <Route path="/kanguro" element={<KanguroEmbed />} />
        <Route path="/terminology" element={<Terminology />} />
        <Route path="/blog/what-is-pet-insurance" element={<WhatIsPetInsurance />} />
        <Route path="/blog/why-consider-pet-insurance" element={<WhyConsiderPetInsurance />} />
        <Route path="/blog/how-to-compare-pet-insurance-policies" element={<HowToComparePetInsurancePolicies />} />
        <Route path="/blog/understanding-pet-insurance-types" element={<UnderstandPetInsuranceTypes />} />
        <Route path="/blog/pet-insurance-exclusions" element={<PetInsuranceExclusions />} />
        <Route path="/blog/how-much-does-pet-insurance-cost" element={<HowMuchDoesPetInsuranceCost />} />
        <Route path="/partners" element={<PartnerContact />} />
        <Route path="/investors" element={<InvestorContact />} />
        <Route path="/info" element={<InfoForm />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/licenses" element={<Licenses />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </RouterWrapper>
  );
};

export default AppRouter;
