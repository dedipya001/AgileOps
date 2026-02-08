import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles, Database, Layout, CheckCircle2 } from "lucide-react";
import "./LoadingScreen.css";

const steps = [
  { icon: Database, text: "Setting up your workspace", duration: 1500 },
  { icon: Layout, text: "Configuring dashboard", duration: 1200 },
  { icon: Sparkles, text: "Personalizing experience", duration: 1000 },
  { icon: CheckCircle2, text: "All set! Redirecting...", duration: 800 },
];

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalTime = 0;
    const timers = steps.map((step, index) => {
      totalTime += step.duration;
      return setTimeout(() => {
        setCurrentStep(index);
        setProgress(((index + 1) / steps.length) * 100);
      }, totalTime);
    });

    const finalTimer = setTimeout(() => {
      navigate("/onboarding/welcome");
    }, totalTime + 500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [navigate]);

  return (
    <div className="loading-screen">
      <motion.div
        className="loading-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="loading-spinner-wrapper"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={64} className="loading-spinner" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Creating Your Workspace
        </motion.h1>

        <div className="loading-steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`loading-step ${index <= currentStep ? "active" : ""} ${
                index < currentStep ? "completed" : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="step-icon"
                animate={{
                  scale: index === currentStep ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <step.icon size={20} />
              </motion.div>
              <span>{step.text}</span>
              {index < currentStep && (
                <motion.div
                  className="step-check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 size={18} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="loading-progress-bar">
          <motion.div
            className="loading-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
