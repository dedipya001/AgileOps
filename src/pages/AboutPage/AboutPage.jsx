import Navbar from "../../components/Navbar/Navbar";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LiquidOcean from "../../components/LiquidOcean/LiquidOcean";
import AnimatedDashboardBG from "../../components/AnimatedHero/AnimatedHero";
import { TestimonialsCard } from "../../components/ui/TestimonialCard";

import "./AboutPage.css";

const coreFeatures = [
  {
    id: 1,
    title: "Task-Centric Time Tracking",
    description:
      "High-precision timers directly linked to tasks. Capture real productivity with automatic logging, idle detection, and sprint analytics.",
    image: "/feature-1.jpg",
  },
  {
    id: 2,
    title: "Agile Ticket Management",
    description:
      "Professional Scrum workflows with sprint planning, drag-and-drop boards, and structured task pipelines.",
    image: "/feature-2.jpg",
  },
  {
    id: 3,
    title: "Real-Time Collaboration",
    description:
      "Slack-style communication embedded inside tasks with threaded discussions and shared documentation.",
    image: "/feature-3.jpg",
  },
  {
    id: 4,
    title: "Intelligent Analytics",
    description:
      "Data-driven dashboards for teams and managers with sprint health insights and productivity intelligence.",
    image: "/feature-4.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="about-container">
      <LiquidOcean />
      <AnimatedDashboardBG />

      <div className="about-content">
        <Navbar />
        <ThemeToggle />

        {/* HERO SECTION */}
        <section className="about-hero">
          <h1 className="about-title">
            Built for Modern Agile Teams.
          </h1>

          <p className="about-subtitle">
            The Agile Workforce Productivity Platform unifies task execution,
            time intelligence, and real-time collaboration into a single
            high-performance ecosystem designed for modern organizations.
          </p>
        </section>

        {/* LARGE FEATURE CAROUSEL */}
        <section className="carousel-section">
          <TestimonialsCard items={coreFeatures} />
        </section>

        {/* FEATURE BLOCKS */}
        <section className="feature-grid">

          <div className="feature-card">
            <h2>Precision Time Intelligence</h2>
            <p>
              Track every second of productive work with a resilient timer
              engine designed for real-world workflows. Automatic recovery,
              session syncing, and sprint summaries deliver unmatched
              visibility into performance.
            </p>
          </div>

          <div className="feature-card">
            <h2>Professional Scrum Execution</h2>
            <p>
              Plan sprints, manage backlogs, and visualize progress with a
              real-time Scrum board built for speed and clarity. Teams move
              faster with structured workflows and agile insights.
            </p>
          </div>

          <div className="feature-card">
            <h2>Centralized Collaboration</h2>
            <p>
              Every task becomes a collaborative workspace. Conversations,
              files, and decisions stay connected to work items, eliminating
              scattered communication.
            </p>
          </div>

          <div className="feature-card">
            <h2>Managerial Intelligence</h2>
            <p>
              Interactive dashboards transform raw activity into actionable
              insights. Understand workload balance, sprint health, and team
              efficiency instantly.
            </p>
          </div>

        </section>

        {/* VISION SECTION */}
        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            We believe productivity should empower teams — not control them.
            Our platform creates a transparent, trust-based environment where
            organizations scale efficiently while individuals gain clarity and
            focus.
          </p>
        </section>

        {/* CTA */}
<section className="about-cta">
  <div className="cta-card">

    <h2 className="cta-title">
      Experience the Future of Agile Work
    </h2>

    <p className="cta-subtitle">
      Join teams already transforming their workflows with intelligent
      productivity infrastructure built for modern organizations.
    </p>

    <div className="cta-actions">
      <button className="primary-btn">
        Start Free Trial
      </button>

      <button className="secondary-btn">
        Contact Sales
      </button>
    </div>

  </div>
</section>


      </div>
    </div>
  );
}
