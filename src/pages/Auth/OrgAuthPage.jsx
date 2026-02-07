import React, { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LiquidOcean from "../../components/LiquidOcean/LiquidOcean";
import AnimatedDashboardBG from "../../components/AnimatedHero/AnimatedHero";
import "./OrgAuthPage.css";

const steps = ["Organization", "Admin", "Structure", "Finish"];

/* ===================== */
/* Progress Sidebar */
/* ===================== */

function ProgressSidebar({ step }) {
  return (
    <div className="org-sidebar">
      {steps.map((label, i) => (
        <div key={i} className={`sidebar-item ${i === step ? "active" : ""}`}>
          <div className={`sidebar-dot ${i <= step ? "active" : ""}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ===================== */
/* Field Component */
/* ===================== */

function Field({ label, hint, register, name, error, ...props }) {
  return (
    <div className={`field ${error ? "field-error" : ""}`}>
      <div className="field-header">
        <label>{label}</label>

        {hint && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button type="button" className="info-icon">ⓘ</button>
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
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===================== */
/* Main Page */
/* ===================== */

export default function OrgAuthPage() {
  const [step, setStep] = useState(0);

  const {
    register,
    formState: { errors },
  } = useForm();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="org-auth-container">
      <LiquidOcean />
      <AnimatedDashboardBG />

      <div className="org-auth-content">
        <Navbar />
        <ThemeToggle />

        <section className="org-auth-hero">
          <h1>Create Your Organization</h1>
          <p>
            Set up a scalable digital workspace for your company. This guided
            onboarding mirrors how real organizations operate — teams,
            departments, and leadership — so you can start working immediately.
          </p>
        </section>

        <div className="org-layout">
          <ProgressSidebar step={step} />

          <div className="org-auth-card wide">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
  key="org"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -40 }}
  className="org-step split"
>
  <div className="step-left">
    <h2>Organization Details</h2>

    <p className="step-description">
      Tell us about your organization so we can configure a workspace
      optimized for your scale and structure.
    </p>

    <ul className="step-benefits">
      <li>✔ Smart workspace defaults</li>
      <li>✔ Scalable team architecture</li>
      <li>✔ Enterprise-ready permissions</li>
    </ul>
  </div>

  <div className="step-right">
    <Field
      label="Organization name"
      hint="Your company or workspace name"
      name="orgName"
      register={register}
      placeholder="Acme Technologies"
    />

    <Field
      label="Headquarters"
      hint="Primary operating region"
      name="hq"
      register={register}
      placeholder="New York, USA"
    />
  </div>
</motion.div>

              )}

              {step === 1 && (
                <motion.div
  key="admin"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -40 }}
  className="org-step split"
>
  <div className="step-left">
    <h2>Super Admin Account</h2>

    <p className="step-description">
      This account controls permissions, team structure, and
      organizational settings across your workspace.
    </p>

    <ul className="step-benefits">
      <li>✔ Full administrative control</li>
      <li>✔ Manage teams and departments</li>
      <li>✔ Add regional super admins later</li>
    </ul>
  </div>

  <div className="step-right">
    <Field
      label="Full name"
      hint="Primary organization owner"
      name="adminName"
      register={register}
      placeholder="Jane Doe"
    />

    <Field
      label="Work email"
      hint="Used for login and invites"
      name="email"
      register={register}
      placeholder="jane@company.com"
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

              {step === 2 && (
                 <motion.div
                key="structure"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="org-step split"
              >
                <div className="step-left">
                  <h2>Workspace Structure</h2>

                  <p className="step-description">
                    We automatically generate a scalable operating structure
                    based on modern organizational design. This gives your
                    teams a clean starting point while staying fully
                    customizable.
                  </p>

                  <ul className="step-benefits">
                    <li>✔ Department-based organization</li>
                    <li>✔ Dedicated team workspaces</li>
                    <li>✔ Role-ready permission layers</li>
                  </ul>
                </div>

                <div className="step-right">
                  <motion.div
                    className="structure-visual"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="structure-node org">Organization</div>

                    <div className="structure-connector" />

                    <div className="structure-row">
                      <div className="structure-node dept">
                        Department
                      </div>
                    </div>

                    <div className="structure-connector" />

                    <div className="structure-row">
                      <div className="structure-node team">
                        Core Team
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              )}

             {step === 3 && (
              <motion.div
                key="finish"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="org-step split"
              >
                <div className="step-left">
                  <h2>Ready to Launch 🚀</h2>

                  <p className="step-description">
                    Your organization workspace is fully prepared. You’re
                    seconds away from launching a structured, scalable
                    productivity environment.
                  </p>

                  <motion.ul
                    className="launch-workflow"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.4 }
                      }
                    }}
                  >
                    {[
                      "Initializing workspace",
                      "Generating core structure",
                      "Configuring admin account"
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        className="workflow-step"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                      >
                        <motion.span
                          className="workflow-dot"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.4 }}
                        />
                        <span>{text}</span>
                        <motion.span
                          className="workflow-check"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.4 + 0.25 }}
                        >
                          ✓
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
                    transition={{ delay: 0.15 }}
                  >
                    <div className="launch-glow" />
                    <h3>Organization Ready</h3>
                    <p>
                      Click create to enter your dashboard and start inviting
                      teams.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            <div className="org-actions">
              {step > 0 && (
                <button className="secondary-btn" onClick={back}>
                  Back
                </button>
              )}
              <button className="primary-btn" onClick={next}>
                {step === steps.length - 1 ? "Create" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
