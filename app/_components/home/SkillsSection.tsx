"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SkillsCard from "../SkillsCard";
const Frontendskills = [
  {
    name: "nextjs2",
    title: "Next.js",
  },
  {
    name: "reactjs",
    title: "React",
  },
  {
    name: "html5",
    title: "HTML5",
  },
  {
    name: "css3",
    title: "CSS3",
  },
  {
    name: "js",
    title: "JavaScript",
  },
  {
    name: "typescript",
    title: "TypeScript",
  },
  {
    name: "tailwindcss",
    title: "Tailwind CSS",
  },
  {
    name: "sass",
    title: "Sass",
  },
  {
    name: "reactquery",
    title: "React Query",
  },
  {
    name: "reactrouter",
    title: "React Router",
  },
];
const Backendskills = [
  {
    name: "nodejs",
    title: "Node.js",
  },
  {
    name: "express",
    title: "Express.js",
  },
  {
    name: "mongodb",
    title: "MongoDB",
  },
  {
    name: "postgresql",
    title: "PostgreSQL",
  },
  {
    name: "redis",
    title: "Redis",
  },
  {
    name: "oracle",
    title: "Oracle",
  },

  {
    name: "prisma",
    title: "Prisma",
  },

  {
    name: "firebase",
    title: "Firebase",
  },
  {
    name: "mysql",
    title: "MySQL",
  },
  {
    name: "sequelize",
    title: "Sequelize",
  },
];
const Cloudskills = [
  {
    name: "aws",
    title: "AWS",
  },
  {
    name: "gcp",
    title: "Google Cloud",
  },
  {
    name: "digitalocean",
    title: "DigitalOcean",
  },
  {
    name: "netlify",
    title: "Netlify",
  },
  {
    name: "vercel",
    title: "Vercel",
  },
];
function SkillsSection() {
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

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col bg-neutral-900 items-center w-full min-h-screen p-5 md:p-14 gap-8"
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
                border: "1px solid rgb(255, 255, 255)",
              }}
            />
          ))}
          <motion.p
            variants={fadeInUp}
            className="relative text-2xl font-bold py-3 px-5 text-neutral-100 rounded-full z-10"
          >
            Skills
          </motion.p>
        </div>
      </div>
      <motion.div className="relative mb-6">
        <motion.p
          variants={fadeInUp}
          className="text-base text-neutral-100 md:text-xl w-full leading-relaxed text-left md:text-left italic pl-4 border-l-4 border-neutral-200"
        >
          &ldquo;Skill is the unified force of experience, intellect, and
          passion in their operation.&rdquo;
          <span className="block mt-2 text-sm text-neutral-400">
            — John Ruskin, art critic and philosopher
          </span>
        </motion.p>
      </motion.div>
      <motion.div
        variants={staggerContainer}
        className=" rounded-lg relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 text-neutral-300 w-full border-4 border-neutral-100 p-8"
      >
        <div className="absolute md:text-xl -top-5 left-1 bg-neutral-900 text-neutral-100 px-2 py-1 text-sm font-semibold">
          Frontend Stack
        </div>
        {Frontendskills.map((skill, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <SkillsCard name={skill.name} title={skill.title} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={staggerContainer}
        className=" rounded-lg relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 text-neutral-300 w-full border-4 border-neutral-100 px-4 py-8 "
      >
        <div className="absolute md:text-xl -top-5  right-1 bg-neutral-900 text-neutral-100 px-2 py-1 text-sm font-semibold">
          Backend Stack
        </div>
        {Backendskills.map((skill, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <SkillsCard name={skill.name} title={skill.title} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={staggerContainer}
        className="rounded-lg relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 text-neutral-300 w-full border-4 border-neutral-100 p-8"
      >
        <div className="absolute md:text-xl -top-5  left-1 bg-neutral-900 text-neutral-100 px-2 py-1 text-sm font-semibold">
          Cloud Stack
        </div>
        {Cloudskills.map((skill, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <SkillsCard name={skill.name} title={skill.title} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default SkillsSection;
