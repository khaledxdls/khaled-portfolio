"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import EducationCard from "../EducationCard";
function EducationSection() {
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
  const educationData = [
    {
      university: " Amar Telidji University Of Laghouat",
      title: " Master Degree In Business intelligence in Computer Science",
      startDate: "10/2022",
      endDate: "07/2024",
      location: "Laghouat, Algeria",
      gpa: "3.7",
      Relevantcoursework:
        "parallel algorithms, distributed databases and systems, advanced algorithms, Operations research ,project management, Linux, system design, decision theory, data warehouse, datamining, System Methods Engineering.",
    },
    {
      university: " Amar Telidji University Of Laghouat",
      title: " Bachelor Degree In Information System in Computer Science",
      startDate: "10/2019",
      endDate: "07/2022",
      location: "Laghouat, Algeria",
      gpa: "3.7",
      Relevantcoursework:
        "algebra, calculus, machine structure, data structures, and algorithms, statistics and probability, operating systems, Programming, Databases,  Networks, language theory, OOP, Web Development, computer architecture, Information system, graphs theory, Mathematical logic, Computer security, Mobile Development",
    },
  ];

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
            Education
          </motion.p>
        </div>
      </div>

      {educationData.map((education, index) => (
        <EducationCard key={index} {...education} />
      ))}
    </motion.section>
  );
}

export default EducationSection;
