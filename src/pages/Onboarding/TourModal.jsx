import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  TrendingUp,
  Users,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import "./TourModal.css";

const tourSteps = [
  {
    icon: LayoutDashboard,
    title: "Here's Your Dashboard",
    description:
      "Your command center. See all your tasks, progress, and insights at a glance. Customized based on your focus mode.",
    highlight: "dashboard-preview",
  },
  {
    icon: ListTodo,
    title: "This Is Your Task Board",
    description:
      "Organize work visually with drag-and-drop simplicity. Move tasks through stages from backlog to done.",
    highlight: "board-preview",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Beautiful analytics show your velocity, focus time, and productivity trends over time.",
    highlight: "analytics-preview",
  },
  {
    icon: Users,
    title: "Invite Teammates (Optional)",
    description:
      "Ready to collaborate? Invite up to 5 teammates to share projects and priorities.",
    highlight: "team-preview",
  },
];

export default function TourModal() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/onboarding/setup");
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    navigate("/onboarding/setup");
  };

  const step = tourSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="tour-modal-overlay">
      <motion.div
        className="tour-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <button className="tour-close" onClick={skip}>
          <X size={24} />
        </button>

        <div className="tour-progress-dots">
          {tourSteps.map((_, index) => (
            <div
              key={index}
              className={`tour-dot ${index === currentStep ? "active" : ""} ${
                index < currentStep ? "completed" : ""
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="tour-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="tour-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <Icon size={48} />
            </motion.div>

            <h2>{step.title}</h2>
            <p>{step.description}</p>

            <div className="tour-preview">
              <div className={`preview-placeholder ${step.highlight}`}>
                <span>Preview: {step.title}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="tour-actions">
          {currentStep > 0 && (
            <motion.button
              className="tour-btn secondary"
              onClick={back}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={18} />
              Back
            </motion.button>
          )}

          <motion.button
            className="tour-btn primary"
            onClick={next}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginLeft: currentStep === 0 ? "auto" : "0" }}
          >
            {currentStep === tourSteps.length - 1 ? "Start Setup" : "Next"}
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <button className="tour-skip-text" onClick={skip}>
          Skip tour
        </button>
      </motion.div>
    </div>
  );
}
