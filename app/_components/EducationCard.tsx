"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
type EducationCardProps = {
  startDate: string;
  endDate: string;
  title: string;
  university: string;
  location: string;
  gpa: string;
  Relevantcoursework: string;
  key: number;
};

function EducationCard({
  startDate,
  endDate,
  title,
  university,
  location,
  gpa,
  Relevantcoursework,
}: EducationCardProps) {
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
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col  items-center p-5 md:p-14 gap-8"
    >
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
            {startDate} - {endDate}
          </motion.div>

          {/* Timeline Element Container */}
          <div className="relative flex items-center justify-center mx-2">
            {/* Connector */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute md:w-1 md:h-[280px] sm:h-0 sm:w-0 lg:h-[200px] lg:w-1 bg-neutral-900  origin-top "
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
        <div className="w-[80%]">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl font-bold text-neutral-900 mb-2"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-600 mb-4"
          >
            {university} - {location}
          </motion.p>
          <motion.ul
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="list-disc ml-6 space-y-2"
          >
            <li>GPA: {gpa}</li>
            <li>Relevant coursework: {Relevantcoursework}</li>
          </motion.ul>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default EducationCard;
