import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FolderPlus,
  ListPlus,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import "./SetupFlow.css";

const focusModeTemplates = {
  solo: {
    project: "Personal Project",
    task: "Complete profile setup",
    description: "Focus mode optimized for individual work",
  },
  creator: {
    project: "Creative Campaign",
    task: "Draft first content piece",
    description: "Tools for creative workflows",
  },
  collab: {
    project: "Team Initiative",
    task: "Schedule kickoff meeting",
    description: "Collaborative workspace ready",
  },
};

export default function SetupFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");

  // Get focus mode from localStorage (set during signup)
  const focusMode = localStorage.getItem("focusMode") || "solo";
  const template = focusModeTemplates[focusMode];

  const steps = [
    {
      title: "Create Your First Project",
      description: `Let's start with a ${template.project} to organize your work`,
      icon: FolderPlus,
    },
    {
      title: "Add Your First Task",
      description: "Quick win! Add a task to get started",
      icon: ListPlus,
    },
    {
      title: "Explore Your Dashboard",
      description: "You're all set! Let's check out your personalized workspace",
      icon: Sparkles,
    },
  ];

  const currentStepData = steps[step];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save to backend here
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="setup-flow">
      <div className="setup-container">
        <div className="setup-progress-bar">
          <motion.div
            className="setup-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="setup-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="setup-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <Icon size={48} />
            </motion.div>

            <h2>{currentStepData.title}</h2>
            <p className="setup-description">{currentStepData.description}</p>

            {step === 0 && (
              <motion.div
                className="setup-input-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label>Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder={template.project}
                  className="setup-input"
                  autoFocus
                />
                <span className="setup-hint">
                  Based on your {focusMode} focus mode
                </span>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                className="setup-input-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label>Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder={template.task}
                  className="setup-input"
                  autoFocus
                />
                <div className="setup-quick-win">
                  <Check size={16} />
                  <span>Quick win moment! Your first task is ready</span>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                className="setup-ready-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="ready-checkmarks">
                  {[
                    "Project created",
                    "First task added",
                    "Dashboard configured",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="ready-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Check size={18} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="setup-actions">
          {step > 0 && step < 2 && (
            <button className="setup-btn secondary" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          <button
            className="setup-btn primary"
            onClick={handleNext}
            style={{ marginLeft: step === 0 ? "auto" : "0" }}
          >
            {step === steps.length - 1 ? "Enter Dashboard" : "Continue"}
            <ArrowRight size={18} />
          </button>
        </div>

        <button className="setup-skip" onClick={handleSkip}>
          Skip setup
        </button>
      </div>
    </div>
  );
}
