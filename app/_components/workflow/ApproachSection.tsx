"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CallToAction from "../home/CallToAction";
import ContactSection from "../home/ContactSection";

const steps = [
  {
    id: "01",
    title: "Acquaintance",
    description:
      "15 minute call — we get to know each other, discuss the details and goals of the project.",
    points: [
      "Estimate the terms and budget.",
      "Prepare commercial options.",
      "Clarify all uncertainties.",
    ],
  },
  {
    id: "02",
    title: "Analysis and Logic",
    description:
      "Deadlines are set, contracts are signed, and advance payment is received.",
    points: [
      "Analysis of competitors.",
      "Sitemap creation.",
      "Help with texts and structure.",
    ],
  },
  {
    id: "03",
    title: "Design",
    description:
      "The texts are written, the prototype is ready, and designs are finalized.",
    points: [
      "Moodboard and references.",
      "Design variants and concepts.",
      "Drawing layouts and adaptives.",
    ],
  },
  {
    id: "04",
    title: "Development",
    description: "Layouts are adapted, designed, and ready for implementation.",
    points: [
      "Site implementation ",
      "Adapting permissions.",
      "Basic SEO setup.",
    ],
  },
  {
    id: "🎉",
    title: "Done, You are Amazing",
    description: "The site is up and running, bringing in the first results.",
    points: ["Stay in touch for unforeseen situations."],
  },
];

export default function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rippleAnimation = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.2, 1.4, 1.6, 1.8, 2],
      opacity: [1, 0.5, 0.4, 0.3, 0.2, 0],
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  const lineAnimation = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center w-full min-h-screen p-5 md:p-14 gap-8 bg-neutral-100 text-neutral-900 rounded-lg"
      >
        {/* Ripple Effect Title */}
        <div className="relative justify-items-center ">
          <div className="w-[140px] h-[60px] relative flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial="initial"
                animate="animate"
                variants={rippleAnimation}
                transition={{
                  duration: 2.5,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "9999px",
                  border: "1px solid rgba(38, 38, 38, 0.4)",
                }}
              />
            ))}
            <motion.p
              variants={fadeInUp}
              className="relative text-2xl font-bold py-3 px-5 text-neutral-900 rounded-full z-10"
            >
              Workflow
            </motion.p>
          </div>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={staggerContainer}
          className="rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 text-neutral-300 w-full p-8 border-4 border-neutral-700 bg-neutral-800"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="p-6 rounded-lg bg-neutral-800 shadow-lg"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 flex items-center justify-center  rounded-full text-black bg-neutral-200 font-bold">
                  {step.id}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-neutral-400 mb-4">{step.description}</p>
              <ul className="space-y-1 text-neutral-300 text-sm">
                {step.points.map((point, idx) => (
                  <li key={idx}>• {point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <CallToAction />
      </motion.section>
      <ContactSection />
    </>
  );
}
