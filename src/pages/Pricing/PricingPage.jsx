import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import Navbar from "../../components/Navbar/Navbar";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LiquidOcean from "../../components/LiquidOcean/LiquidOcean";
import AnimatedDashboardBG from "../../components/AnimatedHero/AnimatedHero";
import "./PricingPage.css";

function ThreePricingBG() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9933ff,
      emissive: 0x440088,
      metalness: 0.7,
      roughness: 0.2,
    });

    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const light = new THREE.PointLight(0xc084fc, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      knot.rotation.x += 0.003;
      knot.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="three-bg" ref={mountRef} />;
}

const plans = [
  {
    name: "Personal",
    users: "Up to 5 collaborators",
    oldPrice: "$8",
    price: "$0",
    description: "Perfect for freelancers and small teams getting started.",
    features: [
      "Single team workspace",
      "Task-based time tracking",
      "Basic dashboards",
      "Sprint board",
      "Email support",
    ],
  },
  {
    name: "Team",
    users: "Up to 25 collaborators",
    price: "$29",
    highlight: true,
    description: "Built for growing startups managing multiple teams.",
    features: [
      "Multiple teams",
      "Advanced Scrum boards",
      "Collaboration rooms",
      "Performance analytics",
      "Priority support",
    ],
  },
  {
    name: "Business",
    users: "Up to 250 collaborators",
    price: "$79",
    description: "Operational intelligence for scaling organizations.",
    features: [
      "Department structure",
      "Manager dashboards",
      "Workload balancing",
      "Advanced reporting",
      "Role-based permissions",
    ],
  },
  {
    name: "Enterprise",
    users: "Up to 5,000 collaborators",
    price: "Custom",
    description: "Enterprise-grade infrastructure and support.",
    features: [
      "Unlimited departments & teams",
      "Custom integrations",
      "Enterprise security",
      "Dedicated support",
      "SLA guarantees",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="pricing-container">
      <LiquidOcean />
      <AnimatedDashboardBG />
      <ThreePricingBG />

      <div className="pricing-content">
        <Navbar />
        <ThemeToggle />

        <section className="pricing-hero">
          <h1 className="pricing-title">Flexible Pricing for Every Scale</h1>
          <p className="pricing-subtitle">
            From personal productivity to enterprise orchestration — choose a
            plan that grows with your organization.
          </p>
        </section>

        <section className="pricing-grid">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
            >
              <h2>{plan.name}</h2>
              <p className="users">{plan.users}</p>
              <div className="price">
                {plan.oldPrice && (
                  <span className="old-price">{plan.oldPrice}</span>
                )}
                {plan.price}
              </div>
              <p className="description">{plan.description}</p>

              <ul>
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <button className="primary-btn">Get Started</button>
            </div>
          ))}
        </section>

        <section className="pricing-footer">
          <h2>Enterprise-ready architecture</h2>
          <p>
            Built to scale with real organizations, our platform structures work the way companies actually operate — employees organized into teams, teams into departments, and departments into a unified organization — giving leadership clear visibility, controlled growth, and measurable performance across up to 5,000 employees.
          </p>
        </section>
      </div>
    </div>
  );
}
