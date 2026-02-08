import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PricingPage from "./pages/Pricing/PricingPage";
import OrgAuthPage from "./pages/Auth/OrgAuthPage";
import PersonalAuthPage from "./pages/Auth/PersonalAuthPage";

// Onboarding Flow
import LoadingScreen from "./pages/Onboarding/LoadingScreen";
import WelcomeScreen from "./pages/Onboarding/WelcomeScreen";
import TourModal from "./pages/Onboarding/TourModal";
import SetupFlow from "./pages/Onboarding/SetupFlow";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

// Auth utilities
import { isAuthenticated } from "./utils/auth";

// Protected Route Component
function ProtectedRoute({ children }) {
  const authed = isAuthenticated();
  return authed ? children : <Navigate to="/personal/signup" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* ========== AUTH ROUTES ========== */}
        <Route path="/org/signup" element={<OrgAuthPage />} />
        <Route path="/personal/signup" element={<PersonalAuthPage />} />

        {/* ========== ONBOARDING FLOW (Protected) ========== */}
        <Route
          path="/onboarding/loading"
          element={
            // <ProtectedRoute>
              <LoadingScreen />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/welcome"
          element={
            // <ProtectedRoute>
              <WelcomeScreen />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/tour"
          element={
            // <ProtectedRoute>
              <TourModal />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/setup"
          element={
            // <ProtectedRoute>
              <SetupFlow />
            // </ProtectedRoute>
          }
        />

        {/* ========== DASHBOARD (Protected) ========== */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />

        {/* ========== FALLBACK ========== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
