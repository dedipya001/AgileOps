import React, { useMemo, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Palette,
  Users,
  Zap,
  Calendar,
  Rocket,
  Check,
  Sparkles,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LiquidOcean from "../../components/LiquidOcean/LiquidOcean";
import AnimatedDashboardBG from "../../components/AnimatedHero/AnimatedHero";
import "./PersonalAuthPage.css";

const steps = ["Profile", "Focus", "Workspace", "Launch"];

const focusOptions = [
  {
    id: "solo",
    title: "Solo Focus",
    description: "Stay in flow with personal productivity rituals.",
    icon: Target,
  },
  {
    id: "creator",
    title: "Creator Mode",
    description: "Track creative tasks and deep-work sessions.",
    icon: Palette,
  },
  {
    id: "collab",
    title: "Mini Team",
    description: "Invite up to 5 collaborators to share priorities.",
    icon: Users,
  },
];

const cadenceOptions = [
  {
    id: "daily",
    title: "Daily Pulse",
    description: "Short, daily check-ins and lightweight goals.",
    icon: Zap,
  },
  {
    id: "weekly",
    title: "Weekly Sprint",
    description: "Plan weekly sprints with structured outcomes.",
    icon: Calendar,
  },
  {
    id: "project",
    title: "Project Focus",
    description: "Longer milestones for bigger initiatives.",
    icon: Rocket,
  },
];

/* ===================== */
/* Progress Sidebar */
/* ===================== */

function ProgressRail({ step }) {
  return (
    <div className="personal-progress">
      {steps.map((label, index) => (
        <motion.div
          key={label}
          className={`personal-progress-item ${index === step ? "active" : ""} ${
            index < step ? "completed" : ""
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="personal-progress-dot"
            animate={{
              scale: index === step ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              repeat: index === step ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            {index < step && (
              <motion.span
                className="check-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Check size={10} strokeWidth={3} />
              </motion.span>
            )}
          </motion.div>
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ===================== */
/* Field Component */
/* ===================== */

function Field({ label, hint, register, name, error, ...props }) {
  return (
    <motion.div
      className={`personal-field ${error ? "field-error" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="field-header">
        <label>{label}</label>
        {hint && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.button
                  type="button"
                  className="info-icon"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⓘ
                </motion.button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="tooltip-content" sideOffset={8}>
                  {hint}
                  <Tooltip.Arrow className="tooltip-arrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>

      <input {...register(name)} {...props} />

      <AnimatePresence>
        {error && (
          <motion.div
            className="field-error-text"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ===================== */
/* Option Card Component */
/* ===================== */

function OptionCard({ title, description, IconComponent, active, onClick }) {
  return (
    <motion.button
      type="button"
      className={`option-card ${active ? "active" : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="option-icon"
        animate={{
          scale: active ? [1, 1.15, 1] : 1,
          rotate: active ? [0, 5, -5, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <IconComponent size={28} strokeWidth={1.8} />
      </motion.div>
      <h4>{title}</h4>
      <p>{description}</p>
      <motion.span
        className="option-indicator"
        animate={{
          scale: active ? 1.2 : 1,
          boxShadow: active
            ? "0 0 20px rgba(192, 132, 252, 0.8)"
            : "0 0 0px rgba(192, 132, 252, 0)",
        }}
        transition={{ duration: 0.3 }}
      />
      <AnimatePresence>
        {active && (
          <motion.div
            className="option-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ===================== */
/* Main Component */
/* ===================== */

export default function PersonalAuthPage() {
  const [step, setStep] = useState(0);
  const [focusMode, setFocusMode] = useState("solo");
  const [cadence, setCadence] = useState("weekly");

  const {
    register,
    formState: { errors },
  } = useForm();

  const next = () => setStep((value) => Math.min(value + 1, steps.length - 1));
  const back = () => setStep((value) => Math.max(value - 1, 0));

  const activeFocus = useMemo(
    () => focusOptions.find((item) => item.id === focusMode),
    [focusMode]
  );

  const activeCadence = useMemo(
    () => cadenceOptions.find((item) => item.id === cadence),
    [cadence]
  );

  return (
    <div className="personal-auth-container">
      <LiquidOcean />
      <AnimatedDashboardBG />

      <div className="personal-auth-content">
        <Navbar />
        <ThemeToggle />

        <motion.section
          className="personal-auth-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="plan-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            Personal Plan · Free
          </motion.p>
          <h1>Launch Your Personal Workspace</h1>
          <p>
            Design a focused productivity environment built around how you work.
            The Personal Plan gives you powerful tracking, sprint boards, and
            beautiful analytics — without the overhead.
          </p>
        </motion.section>

        <div className="personal-layout">
          <ProgressRail step={step} />

          <motion.div
            className="personal-auth-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {/* ========== STEP 0: PROFILE ========== */}
              {step === 0 && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="personal-step split"
                >
                  <div className="step-left">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Personal Profile
                    </motion.h2>
                    <motion.p
                      className="step-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Create your individual workspace identity. This keeps your
                      task history, focus analytics, and productivity streaks in
                      one secure place.
                    </motion.p>
                    <motion.ul
                      className="step-benefits"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                        },
                      }}
                    >
                      {[
                        "Secure personal workspace",
                        "Private productivity insights",
                        "Optional collaborator invites",
                      ].map((benefit, i) => (
                        <motion.li
                          key={i}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <Check size={16} strokeWidth={2.5} /> {benefit}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div className="step-right">
                    <Field
                      label="Full name"
                      hint="Shown on your personal dashboard"
                      name="fullName"
                      register={register}
                      placeholder="Alex Rivera"
                    />

                    <Field
                      label="Email address"
                      hint="Used for login and alerts"
                      name="email"
                      register={register}
                      placeholder="you@studio.com"
                    />

                    <Field
                      label="Password"
                      hint="Minimum 8 characters"
                      name="password"
                      type="password"
                      register={register}
                      placeholder="Create password"
                    />
                  </div>
                </motion.div>
              )}

              {/* ========== STEP 1: FOCUS ========== */}
              {step === 1 && (
                <motion.div
                  key="focus"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="personal-step split"
                >
                  <div className="step-left">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Choose Your Focus
                    </motion.h2>
                    <motion.p
                      className="step-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Tailor AgileOps to the way you work. Pick a productivity
                      style and planning cadence so your dashboard feels
                      effortless from day one.
                    </motion.p>

                    <motion.div
                      className="focus-summary"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div>
                        <h4>Focus Mode</h4>
                        <motion.p
                          key={focusMode}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="focus-summary-value"
                        >
                          {activeFocus && (
                            <>
                              <activeFocus.icon size={18} strokeWidth={2} />
                              {activeFocus.title}
                            </>
                          )}
                        </motion.p>
                      </div>
                      <div>
                        <h4>Cadence</h4>
                        <motion.p
                          key={cadence}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="focus-summary-value"
                        >
                          {activeCadence && (
                            <>
                              <activeCadence.icon size={18} strokeWidth={2} />
                              {activeCadence.title}
                            </>
                          )}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="step-right">
                    <motion.div
                      className="option-grid"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.08 },
                        },
                      }}
                    >
                      {focusOptions.map((option, i) => (
                        <motion.div
                          key={option.id}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <OptionCard
                            title={option.title}
                            description={option.description}
                            IconComponent={option.icon}
                            active={focusMode === option.id}
                            onClick={() => setFocusMode(option.id)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="option-grid"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                        },
                      }}
                    >
                      {cadenceOptions.map((option, i) => (
                        <motion.div
                          key={option.id}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <OptionCard
                            title={option.title}
                            description={option.description}
                            IconComponent={option.icon}
                            active={cadence === option.id}
                            onClick={() => setCadence(option.id)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ========== STEP 2: WORKSPACE ========== */}
              {step === 2 && (
                <motion.div
                  key="workspace"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="personal-step split"
                >
                  <div className="step-left">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Workspace Setup
                    </motion.h2>
                    <motion.p
                      className="step-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Configure how your personal space should feel. Name your
                      workspace, pick a role, and set your time zone for
                      precision tracking.
                    </motion.p>
                    <motion.ul
                      className="step-benefits"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                        },
                      }}
                    >
                      {[
                        "Time zone synced insights",
                        "Personalized dashboard labels",
                        "Quick start templates",
                      ].map((benefit, i) => (
                        <motion.li
                          key={i}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <Check size={16} strokeWidth={2.5} /> {benefit}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div className="step-right">
                    <Field
                      label="Workspace name"
                      hint="Visible in your sidebar"
                      name="workspaceName"
                      register={register}
                      placeholder="Alex Studio"
                    />

                    <motion.div
                      className="personal-field"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="field-header">
                        <label>Primary role</label>
                      </div>
                      <select {...register("role")}>
                        <option className="opName">Founder</option>
                        <option className="opName">Designer</option>
                        <option className="opName">Developer</option>
                        <option className="opName">Consultant</option>
                        <option className="opName">Project Lead</option>
                      </select>
                    </motion.div>

                    <motion.div
                      className="personal-field"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="field-header">
                        <label>Time zone</label>
                      </div>
                      <select {...register("timezone")}>
                        <option className="opName">GMT -08:00 Pacific</option>
                        <option  className="opName">GMT -05:00 Eastern</option>
                        <option  className="opName">GMT +00:00 London</option>
                        <option className="opName">GMT +01:00 Berlin</option>
                        <option className="opName">GMT +05:30 India</option>
                        <option className="opName">GMT +08:00 Singapore</option>
                      </select>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ========== STEP 3: LAUNCH ========== */}
              {step === 3 && (
                <motion.div
                  key="launch"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="personal-step split"
                >
                  <div className="step-left">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    >
                      Ready to Start
                      <Sparkles size={28} strokeWidth={2} />
                    </motion.h2>
                    <motion.p
                      className="step-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Your personal workspace is ready. We'll spin up your
                      dashboard, apply your focus settings, and preload your
                      starter sprint board.
                    </motion.p>

                    <motion.ul
                      className="launch-workflow"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.4, delayChildren: 0.3 },
                        },
                      }}
                    >
                      {[
                        "Personal dashboard created",
                        "Sprint board configured",
                        "Insight trackers enabled",
                      ].map((text, i) => (
                        <motion.li
                          key={i}
                          className="workflow-step"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <motion.span
                            className="workflow-dot"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: i * 0.4 + 0.3,
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                          />
                          <span>{text}</span>
                          <motion.span
                            className="workflow-check"
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                              delay: i * 0.4 + 0.5,
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                          >
                            <Check size={18} strokeWidth={2.5} />
                          </motion.span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div className="step-right">
                    <motion.div
                      className="launch-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <motion.div
                        className="launch-glow"
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.h3
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Personal Workspace
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Free forever for solo creators. Invite up to 5 teammates
                        any time.
                      </motion.p>
                      <motion.div
                        className="launch-tags"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.5,
                            },
                          },
                        }}
                      >
                        {[
                          { icon: activeFocus?.icon, text: `Focus: ${activeFocus?.title}` },
                          { icon: activeCadence?.icon, text: `Cadence: ${activeCadence?.title}` },
                        ].map((tag, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1 },
                            }}
                          >
                            {tag.icon && <tag.icon size={14} strokeWidth={2} />}
                            {tag.text}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="org-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {step > 0 && (
                <motion.button
                  className="secondary-btn"
                  onClick={back}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}
              <motion.button
                className="primary-btn"
                onClick={next}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow:
                    step === steps.length - 1
                      ? [
                          "0 0 20px rgba(192, 132, 252, 0.5)",
                          "0 0 40px rgba(192, 132, 252, 0.8)",
                          "0 0 20px rgba(192, 132, 252, 0.5)",
                        ]
                      : "0 0 20px rgba(192, 132, 252, 0.5)",
                }}
                transition={{
                  duration: 2,
                  repeat: step === steps.length - 1 ? Infinity : 0,
                }}
              >
                {step === steps.length - 1 ? "Create Workspace" : "Next"}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
