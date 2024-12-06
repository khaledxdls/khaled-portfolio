"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
      <motion.div
        variants={fadeInUp}
        className=" text-neutral-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row"
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4 mr-6 mb-6 md:mb-0">
          {/* Year */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" self-start bg-neutral-900  text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm"
          >
            02/2024 - 03/2024
          </motion.div>

          {/* Timeline Element Container */}
          <div className="relative flex items-center justify-center mx-2">
            {/* Connector */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute md:w-1 md:h-[280px] sm:h-0 sm:w-0 lg:h-[280px] lg:w-1 bg-neutral-900  origin-top "
            >
              {/* Highlighted Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className=" absolute top-0 -left-[6px] z-10 md:w-4 md:h-4 sm:w-0 sm:h-0 w-0 h-0 lg:w-4 lg:h-4 bg-yellow-400 rounded-full shadow-md ring-2 ring-yellow-500 ring-opacity-50"
              ></motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl font-bold text-neutral-900 mb-2"
          >
            Software Developer Internship
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-600 mb-4"
          >
            National Social Security Fund - CNAS, Laghouat, Algeria
          </motion.p>
          <motion.ul
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="list-disc ml-6 space-y-2"
          >
            <li>
              Optimized search functionality, reducing search time by 30% and
              increasing user satisfaction by 40%.
            </li>
            <li>
              Introduced real-time search suggestions, resulting in a 25%
              increase in user engagement.
            </li>
            <li>
              Implemented cutting-edge technologies such as React, Node.js, and
              Mellisearch for efficient website performance.
            </li>
            <li>
              Collaborated with team members to design and develop a
              user-friendly website for CNAS employees.
            </li>
            <li>
              Managed the integration of Mellisearch to enable quick and
              accurate search capabilities within PDF documents.
            </li>
            <li>
              Took ownership of project deliverables and deadlines,
              demonstrating strong accountability and reliability.
            </li>
          </motion.ul>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default ExperinceSection;
