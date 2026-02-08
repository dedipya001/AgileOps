import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PricingPage from "./pages/Pricing/PricingPage";
import OrgAuthPage from "./pages/Auth/OrgAuthPage";
import PersonalAuthPage from "./pages/Auth/PersonalAuthPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public marketing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Organization auth */}
        <Route path="/org/signup" element={<OrgAuthPage />} />
        <Route path="/personal/signup" element={<PersonalAuthPage />} />

      </Routes>
    </Router>
  );
}

export default App;
