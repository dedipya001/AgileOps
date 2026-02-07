import Navbar from "../../components/Navbar/Navbar";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LiquidOcean from "../../components/LiquidOcean/LiquidOcean";
import AnimatedDashboardBG from "../../components/AnimatedHero/AnimatedHero";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="hero-container">

      {/* Background layers */}
      <LiquidOcean />
      <AnimatedDashboardBG />

      {/* Foreground */}
      <div className="hero-content">

        <Navbar />
        <ThemeToggle />

        <section className="hero">

  <h1 className="hero-title">
    Agile Productivity, Reinvented.
  </h1>

  <p className="hero-subtitle">
    Experience the future of work with our AI-powered agile workforce platform. A unified workspace for teams to manage tasks,
          track time, and collaborate intelligently.
  </p>

  <div className="hero-actions">
    <button className="primary-btn" onClick={() => window.location.href = "/pricing"}>
      Get Started
    </button>

    <button className="secondary-btn">
      Watch Demo
    </button>
  </div>

</section>


      </div>

    </div>
  );
}
