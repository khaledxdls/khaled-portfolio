"use client";

import { motion, useInView } from "framer-motion";

import { useRef } from "react";
import PortfolioCard from "../PortfolioCard";
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

    stack:
      "React, TypeScript and Tailwind CSS,Node.js,Express.js,Sequelize,PostgreSQL",
    src: "/portfolio_images/superettiii.jpg",
  },
  project2: {
    title: "Kalima",
    description:
      "Kalima is an innovative web app for learning Arabic, built on constructivism learning theory and powered by AI. It features an AI-driven quiz system where users explore Arabic through images, with AI-generated questions and multiple-choice answers. Additionally, it offers a customizable chatbot that adapts to various real-life scenarios, providing an engaging, personalized learning experience. Kalima makes mastering Arabic interactive, intuitive, and tailored to individual needs.",

    stack:
      "React, and Tailwind CSS,Node.js,Express.js,Sequelize,MySQL,fastApi,pytorch",
    src: "/portfolio_images/kalima.jpg",
  },
  project3: {
    title: "Clothing",
    description:
      "Clothing is a dynamic multi-seller eCommerce platform connecting buyers and sellers. Clients can explore and order items from various sellers in a seamless shopping experience. Sellers can create personalized stores, showcase their boutique products, and access detailed performance statistics to track their sales and growth. Clothing provides a comprehensive platform for fostering online retail success.",

    stack: "HTML, and CSS,Node.js,Express.js,Sequelize,PostgreSQL",
    src: "/portfolio_images/Clothing.jpg",
  },
  project10: {
    title: "Wild Oasis",
    description:
      "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests. The hotel offers a variety of activities, including hiking, skiing, and mountain biking. The hotel also features a gourmet restaurant, a spa, and a wellness center. Wild Oasis is the perfect destination for nature lovers and adventure seekers.",
    link: "https://github.com/khaledxdls/the-wild-oasis",
    stack: "HTML, and CSS,Node.js,Express.js,Sequelize,PostgreSQL",
    live: "https://stellular-trifle-ba72d4.netlify.app",
    src: "/portfolio_images/brandbird.webp",
  },

  project4: {
    title: "Alpha",
    description:
      "Alpha is a web app tailored for insurance organizations to streamline vehicle accident management. It connects key stakeholders—experts, mechanics, and clients—while efficiently handling contracts, payments, and re-subscriptions. Alpha simplifies operations, enhances collaboration, and ensures a seamless experience for all parties involved.",

    stack:
      "React, React Qurey,and Tailwind CSS,Node.js,Express.js,Sequelize,MySQL",
    src: "/portfolio_images/Alpha.jpg",
  },
  project5: {
    title: "FLIR",
    description:
      "FLIR is a landing page designed to simplify  school management company. It covers everything from student enrollment to teacher management, course scheduling, and exam grading.  also provides detailed performance statistics and interactive graphs to help student make informed, data-driven decisions.",
    link: "https://github.com/khaledxdls/education-site",
    stack: "HTML, and CSS, tailwind Css",
    live: "https://stately-queijadas-53f458.netlify.app",
    src: "/portfolio_images/FLIR.jpg",
  },
  project6: {
    title: "Nadam",
    description:
      "Nadam is a a landing page designed for prjects management company. It covers everything from project management to team management, project scheduling, and project grading.  also provides detailed performance statistics and interactive graphs to help project manager make informed, data-driven decisions.",
    link: "https://github.com/khaledxdls/task_managment",
    live: "https://aquamarine-lolly-d448d1.netlify.app",
    stack: "HTML, and CSS, tailwind Css",
    src: "/portfolio_images/Nadam.jpg",
  },

  project7: {
    title: "Goldan Tailor",
    description:
      "Goldan Tailor is a a landing page designed for Tailor company. It covers services and clinet testimonials also about the tailor also  sechuling.",

    stack: "React js, tailwind Css",
    live: "https://golden-tailor.vercel.app/",
    src: "/portfolio_images/GoldenTailor.jpg",
  },
  project8: {
    title: "Carati",
    description:
      "Carati is IU INTRFACE FOR CAR INFO page , It covers everything from car info  with nice interactive ui .",
    link: "https://github.com/khaledxdls/Interactive-card-details-form",
    stack: "HTML, and CSS,javaScript",
    live: "https://jovial-squirrel-4f6316.netlify.app",
    src: "/portfolio_images/brandbird.jpg",
  },
  project9: {
    title: "NETFLIX VOL 2",
    description:
      "NETFLIX VOL 2 is a NETFLIX CLONE  page , It covers everything from movie info  with nice interactive ui .",
    link: "https://github.com/khaledxdls/Netflix-Vol2",
    live: "https://peaceful-bavarois-8c5604.netlify.app",
    stack: "HTML, and CSS,javaScript",
    src: "/portfolio_images/NETFLIXVol2.jpg",
  },
};
function ProjectSectiom() {
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

      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 sm:grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-between w-full"
      >
        {Object.keys(ProjectInfo).map((key, i) => {
          const { title, description, link, stack, src, live } =
            ProjectInfo[key];
          return (
            <PortfolioCard
              key={key}
              title={title}
              description={description}
              link={link}
              live={live}
              stack={stack}
              src={src}
              index={i}
            />
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default ProjectSectiom;
