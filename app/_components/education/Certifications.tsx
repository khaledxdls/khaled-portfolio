"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CertificationCard from "../CertificationCard";

const certificationList = [
  // Frontend Fundamentals
  {
    id: 10,
    title: "TypeScript 5+ Fundamentals, v4",
    description:
      "Learn the basics of TypeScript, a superset of JavaScript that adds optional types.",
    tags: ["TypeScript", "JavaScript", "Types"],
    imageUrl: "/certification/typescript-v4.jpg",
  },
  {
    id: 11,
    title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
    description:
      "Learn how to build modern web applications using React, Next.js, and Redux.",
    tags: ["React", "Next.js", "Redux", "React Query", "Supabase"],
    imageUrl: "/certification/certReact.jpg",
  },
  {
    id: 8,
    title: "Introduction to Next.js, v3",
    description:
      "Learn how to build server-rendered React applications with Next.js.",
    tags: ["Next.js", "React", "Server-Rendered"],
    imageUrl: "/certification/next-js-v3.jpg",
  },

  // Backend & API Development
  {
    id: 4,
    title: "Introduction to Node.js, v3",
    description:
      "Learn the basics of Node.js, including modules, file systems, and asynchronous programming.",
    tags: ["Node.js", "Modules", "File Systems", "Asynchronous Programming"],
    imageUrl: "/certification/node-js-v3.jpg",
  },
  {
    id: 5,
    title: "Complete Intro to Databases",
    description:
      "Learn the basics of using four of the most popular open-source types of databases: document-based database MongoDB, relational database PostgreSQL, graph database Neo4j, and key-value store Redis.",
    tags: ["Databases", "MongoDB", "PostgreSQL", "Neo4j", "Redis"],
    imageUrl: "/certification/databases.jpg",
  },
  {
    id: 3,
    title: "API Design in Node.js, v4",
    description:
      "Learn how to design and build APIs in Node.js using Express and Prisma with SqLite.",
    tags: ["API", "Node.js", "Express", "Prisma", "SqLite"],
    imageUrl: "/certification/api-design-nodejs-v4.jpg",
  },

  // DevOps & Cloud
  {
    id: 1,
    title: "Introducing DevOps for Developers",
    description:
      "Learn the basics of DevOps, including continuous integration, continuous delivery, and infrastructure automation.",
    tags: ["DevOps", "AWS", "Developer"],
    imageUrl: "/certification/devops.jpg",
  },
  {
    id: 2,
    title: "AWS For Front-End Engineers, v2",
    description:
      "Learn how to deploy, host, and serve your front-end applications using AWS services.",
    tags: ["AWS", "Front-End", "Engineers"],
    imageUrl: "/certification/aws-v2_page.jpg",
  },

  // Performance & Security
  {
    id: 6,
    title: "Web Performance Fundamentals",
    description: "Learn how to make your web applications run faster.",
    tags: ["Web Performance", "load time", "LCP", "FID", "CLS"],
    imageUrl: "/certification/web-perf.jpg",
  },
  {
    id: 9,
    title: "Web Security, v2",
    description:
      "Learn how to secure your web applications and protect your users from cyber attacks.",
    tags: ["Web Security", "Cyber Attacks", "CORS", "CSP", "XSS", "CSRF"],
    imageUrl: "/certification/web-security-v2.jpg",
  },

  // Full Stack
  {
    id: 7,
    title: "Full Stack for Front-End Engineers, v3",
    description:
      "Learn what it means to become a full-stack engineer. Get hands-on with setting up your own server to build and deploy web applications from scratch. You'll dive deep into servers, work with the command line, understand networking and security, set up continuous integration and deployment, manage databases, and build containers.",
    tags: [
      "Full-Stack",
      "nginx",
      "DigitalOcean",
      "Server",
      "CI/CD",
      "Databases",
      "Containers",
    ],
    imageUrl: "/certification/fullstack-v3.jpg",
  },
];

function Certifications() {
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
      className="flex flex-col   items-center w-full min-h-screen p-5 md:p-14 gap-8"
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
            Courses
          </motion.p>
        </div>
      </div>
      <motion.div
        variants={staggerContainer}
        className=" rounded-lg relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 text-neutral-300 w-full border-4 border-neutral-100 p-8"
      >
        {certificationList.map((cert) => (
          <CertificationCard key={cert.id} {...cert} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Certifications;
