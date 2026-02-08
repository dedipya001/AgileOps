import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#9933ff", "#c084fc", "#e9d5ff"],
    });
  }, []);

  return (
    <div className="welcome-screen">
      <motion.div
        className="welcome-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <motion.div
          className="welcome-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        >
          <Sparkles size={80} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to AgileOps!
        </motion.h1>

        <motion.p
          className="welcome-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Your workspace is ready. Let's take a quick tour to help you get started.
        </motion.p>

        <motion.div
          className="welcome-features"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
        >
          {[
            "🎯 Personalized dashboard",
            "📊 Task tracking & analytics",
            "⚡ Smart workflows",
            "👥 Team collaboration (optional)",
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="welcome-feature"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="welcome-cta"
          onClick={() => navigate("/onboarding/tour")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Tour
          <ArrowRight size={20} />
        </motion.button>

        <motion.button
          className="welcome-skip"
          onClick={() => navigate("/dashboard")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Skip for now
        </motion.button>
      </motion.div>
    </div>
  );
}
