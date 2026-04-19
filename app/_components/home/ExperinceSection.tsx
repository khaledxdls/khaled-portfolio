"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Experience = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    title: "Software Design and Development Engineer",
    company: "Groupement Berkine (Sonatrach) — Hassi Berkine, Algeria",
    startDate: "11/2025",
    endDate: "Present",
    current: true,
    bullets: [
      "Design and build internal software to support employees across departments — automating manual workflows, streamlining reporting, and reducing time spent on repetitive operational tasks.",
      "Develop applications that support oil and gas production operations — data tracking, operational dashboards, and integrations with field systems to give engineers and management real-time visibility into production metrics.",
      "Provide IT support to end users on-site and remotely — diagnosing and resolving hardware, software, and network issues to minimize downtime across production-critical workstations.",
      "Act as systems administrator — managing user accounts, access controls, backups, and server health to ensure infrastructure reliability and security in a 24/7 operational environment.",
      "Collaborate with multidisciplinary teams (engineering, operations, HSE) to translate business requirements into scalable software solutions tailored to the upstream oil and gas domain.",
    ],
  },
  {
    title: "Software Developer Internship",
    company: "National Social Security Fund - CNAS, Laghouat, Algeria",
    startDate: "02/2024",
    endDate: "03/2024",
    bullets: [
      "Optimized search functionality, reducing search time by 30% and increasing user satisfaction by 40%.",
      "Introduced real-time search suggestions, resulting in a 25% increase in user engagement.",
      "Implemented cutting-edge technologies such as React, Node.js, and Mellisearch for efficient website performance.",
      "Collaborated with team members to design and develop a user-friendly website for CNAS employees.",
      "Managed the integration of Mellisearch to enable quick and accurate search capabilities within PDF documents.",
      "Took ownership of project deliverables and deadlines, demonstrating strong accountability and reliability.",
    ],
  },
];

function ExperinceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const rippleAnimation = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.2, 1.4, 1.6, 1.8, 2],
      opacity: [1, 0.5, 0.4, 0.3, 0.2, 0],
    },
  };
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col  items-center w-full min-h-screen p-5 md:p-14 gap-8"
    >
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
            Experience
          </motion.p>
        </div>
      </div>

      <motion.div className="relative mb-6">
        <motion.p
          variants={fadeInUp}
          className="text-base text-neutral-900 md:text-xl w-full leading-relaxed text-left md:text-left italic pl-4 border-l-4 border-neutral-900"
        >
          &ldquo;We are what we repeatedly do. Excellence, then, is not an act,
          but a habit.&rdquo;
          <span className="block mt-2 text-sm text-neutral-400">
            — Aristotle, philosopher
          </span>
        </motion.p>
      </motion.div>

      {experiences.map((exp, i) => (
        <motion.div
          key={`${exp.company}-${exp.startDate}`}
          variants={fadeInUp}
          className="w-full max-w-6xl text-neutral-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row"
        >
          {/* Left Section */}
          <div className="flex items-center space-x-4 mr-6 mb-6 md:mb-0">
            {/* Year + optional current pill */}
            <div className="flex flex-col gap-2 self-start">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-neutral-900 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm whitespace-nowrap"
              >
                {exp.startDate} - {exp.endDate}
              </motion.div>
              {exp.current && (
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide w-fit"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Current
                </motion.div>
              )}
            </div>

            {/* Timeline Element Container */}
            <div className="relative flex items-center justify-center mx-2">
              {/* Connector */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                className="absolute md:w-1 md:h-[280px] sm:h-0 sm:w-0 lg:h-[280px] lg:w-1 bg-neutral-900  origin-top "
              >
                {/* Highlighted Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.3 + i * 0.1,
                  }}
                  className=" absolute top-0 -left-[6px] z-10 md:w-4 md:h-4 sm:w-0 sm:h-0 w-0 h-0 lg:w-4 lg:h-4 bg-yellow-400 rounded-full shadow-md ring-2 ring-yellow-500 ring-opacity-50"
                ></motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              className="text-2xl font-bold text-neutral-900 mb-2"
            >
              {exp.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
              className="text-gray-600 mb-4"
            >
              {exp.company}
            </motion.p>
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 + i * 0.1 }}
              className="list-disc ml-6 space-y-2"
            >
              {exp.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}

export default ExperinceSection;
