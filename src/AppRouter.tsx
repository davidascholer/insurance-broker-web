import { Routes, Route } from "react-router-dom";
import ChatBot from "./pages/ChatBot";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import Home from "./pages/Home";
import Terminology from "./pages/Terminology";
import PartnerContact from "./pages/contact/PartnerContact";
import InvestorContact from "./pages/contact/InvestorContact";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terminology" element={<Terminology />} />
      <Route path="/partners" element={<PartnerContact />} />
      <Route path="/investors" element={<InvestorContact />} />
      <Route path="/quotes" element={<ChatBot />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default AppRouter;
