import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Terminology from "./pages/Terminology";
// import PartnerContact from "./pages/contact/PartnerContact";
import FAQs from "./pages/FAQs";
import Quotes from "./pages/Quotes";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Licenses from "./pages/Licenses";
import InfoForm from "./pages/InfoFormPage";

import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { IS_PROD } from "./lib/constants";
import Admin from "./pages/Admin";
import WhatIsPetInsurance from "./pages/blog/WhatIsPetInsurance";
import WhyConsiderPetInsurance from "./pages/blog/WhyConsiderPetInsurance";
import HowToComparePetInsurancePolicies from "./pages/blog/HowToComparePetInsurancePolicies";
import UnderstandPetInsuranceTypes from "./pages/blog/UnderstandingPetInsuranceTypes";
import PetInsuranceExclusions from "./pages/blog/PetInsuranceExclusions";
import HowMuchDoesPetInsuranceCost from "./pages/blog/HowMuchDoesPetInsuranceCost";
import PetInsuranceDogs from "./pages/blog/PetInsuranceDogs";
import PetInsuranceCats from "./pages/blog/PetInsuranceCats";
import KanguroEmbed from "./features/kanguro/pages/KanguroEmbed";
import PartnerPage from "./pages/PartnerPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrudentPet from "./pages/partner/PrudentPet";
import Kanguro from "./pages/partner/Kanguro";
import BlogPage from "./pages/BlogPage";
import BlogCreationList from "./features/blog-creator/BlogCreationList";
import BlogCreator from "./features/blog-creator/BlogCreator";
import TestServer from "./pages/TestServer";
import AnalyticsCharts from "./pages/AnalyticsCharts";

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
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/kanguro" element={<KanguroEmbed />} />
        <Route path="/terminology" element={<Terminology />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/partner/prudent-pet" element={<PrudentPet />} />
        <Route path="/partner/kanguro" element={<Kanguro />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/blog/what-is-pet-insurance"
          element={<WhatIsPetInsurance />}
        />
        <Route
          path="/blog/why-consider-pet-insurance"
          element={<WhyConsiderPetInsurance />}
        />
        <Route
          path="/blog/how-to-compare-pet-insurance-policies"
          element={<HowToComparePetInsurancePolicies />}
        />
        <Route
          path="/blog/understanding-pet-insurance-types"
          element={<UnderstandPetInsuranceTypes />}
        />
        <Route
          path="/blog/pet-insurance-exclusions"
          element={<PetInsuranceExclusions />}
        />
        <Route
          path="/blog/how-much-does-pet-insurance-cost"
          element={<HowMuchDoesPetInsuranceCost />}
        />
        <Route path="/blog/pet-insurance-dogs" element={<PetInsuranceDogs />} />
        <Route path="/blog/pet-insurance-cats" element={<PetInsuranceCats />} />
        {/* <Route path="/partner-contact" element={<PartnerContact />} /> */}
        <Route path="/info" element={<InfoForm />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/licenses" element={<Licenses />} />
        {!IS_PROD && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/blog/creator" element={<BlogCreationList />} />
            <Route
              path="/admin/blog/creator/:pageName"
              element={<BlogCreator />}
            />
            <Route
              path="/admin/analytics/charts"
              element={<AnalyticsCharts />}
            />
            <Route path="/admin/test-server" element={<TestServer />} />
          </>
        )}
      </Routes>
    </RouterWrapper>
  );
};

export default AppRouter;
