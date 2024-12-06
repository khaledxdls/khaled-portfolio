"use client";

import { motion, useInView } from "framer-motion";

import { useRef } from "react";
import ProjectsCard from "../ProjectsCard";
import Link from "next/link";
type ProjectInfoType = Record<
  string,
  {
    title: string;
    description: string;
    link?: string;
    live?: string;
    stack: string;
    src: string;
  }
>;
const ProjectInfo: ProjectInfoType = {
  project1: {
    title: "Superettiii",
    description:
      "Superettii is a powerful web app designed to simplify grocery store management. It covers everything from point-of-sale operations to vault management, supplier coordination, and borrower (credit) tracking. The app also provides detailed performance statistics and interactive graphs to help store owners make informed, data-driven decisions. Superettii streamlines daily operations, improves efficiency, and supports smarter business management.",
    link: "https://github.com",
    stack:
      "React, TypeScript and Tailwind CSS,Node.js,Express.js,Sequelize,PostgreSQL",
    src: "/projects_images/superettiii.png",
  },
  project2: {
    title: "Kalima",
    description:
      "Kalima is an innovative web app for learning Arabic, built on constructivism learning theory and powered by AI. It features an AI-driven quiz system where users explore Arabic through images, with AI-generated questions and multiple-choice answers. Additionally, it offers a customizable chatbot that adapts to various real-life scenarios, providing an engaging, personalized learning experience. Kalima makes mastering Arabic interactive, intuitive, and tailored to individual needs.",
    link: "https://github.com",
    stack:
      "React, and Tailwind CSS,Node.js,Express.js,Sequelize,MySQL,fastApi,pytorch",
    src: "/projects_images/qus1.png",
  },
  project3: {
    title: "Clothing",
    description:
      "Clothing is a dynamic multi-seller eCommerce platform connecting buyers and sellers. Clients can explore and order items from various sellers in a seamless shopping experience. Sellers can create personalized stores, showcase their boutique products, and access detailed performance statistics to track their sales and growth. Clothing provides a comprehensive platform for fostering online retail success.",
    link: "https://github.com",
    stack: "HTML, and CSS,Node.js,Express.js,Sequelize,PostgreSQL",
    src: "/projects_images/ol.png",
  },
};
function ProjectSection() {
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

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col items-center w-full min-h-screen p-5 px-6 md:p-14 gap-8 "
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
            Projects
          </motion.p>
        </div>
      </div>
      <motion.div className="relative mb-6">
        <motion.p
          variants={fadeInUp}
          className="text-base text-neutral-900 md:text-xl w-full leading-relaxed text-left md:text-left italic pl-4 border-l-4 border-neutral-900"
        >
          &ldquo;Talk is cheap. Show me the code.&rdquo;
          <span className="block mt-2 text-sm text-neutral-400">
            — Linus Torvalds, creator of Linux
          </span>
        </motion.p>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="flex flex-col  gap-10 justify-between w-full"
      >
        {Object.keys(ProjectInfo).map((key, i) => {
          const { title, description, link, stack, src } = ProjectInfo[key];
          return (
            <ProjectsCard
              key={key}
              title={title}
              description={description}
              link={link}
              stack={stack}
              src={src}
              index={i}
            />
          );
        })}
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="w-full md:w-fit flex flex-col md:flex-row gap-4 md:gap-7 items-center justify-center md:justify-start"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full md:w-auto transition-colors bg-neutral-900 text-neutral-100  px-6 py-2 rounded-full border-2 "
        >
          <Link href="/portfolio"> See all projects</Link>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

export default ProjectSection;
