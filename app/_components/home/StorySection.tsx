"use client";
import Image from "next/image";
import image_1 from "@/public/home_image_1.jpg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function StorySection() {
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

  const imageAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
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
      className="flex flex-col bg-neutral-900 md:flex-row gap-10 justify-between min-h-screen p-5 md:p-14"
    >
      <motion.div
        variants={imageAnimation}
        className="w-full md:w-1/2 flex flex-col "
      >
        <motion.div className="relative mb-6">
          <motion.p
            variants={fadeInUp}
            className="text-base text-neutral-100 md:text-base w-full leading-relaxed text-left md:text-left italic pl-4 border-l-4 border-neutral-200"
          >
            &ldquo;The only way to do great work is to love what you do.&rdquo;
            <span className="block mt-2 text-sm text-neutral-400">
              — Steve Jobs, co-founder of Apple
            </span>
          </motion.p>
        </motion.div>

        <Image
          src={image_1}
          alt="Picture of the author"
          placeholder="blur"
          loading="lazy"
          className="shadow-lg rounded-xl w-[90%] md:w-[80%] shadow-black filter brightness-75 contrast-125"
          quality={80}
        />
      </motion.div>

      <div className="flex flex-col justify-between self-center max-w-full  md:w-1/2 gap-10 p-5 h-full">
        <div className="relative self-center md:self-start">
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
              Story
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          className="flex flex-col gap-6 md:gap-10 text-neutral-300 max-w-full md:max-w-[90%]"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base w-full leading-relaxed text-left md:text-left"
          >
            DELASSI Khaled Bachir, based in Laghouat, Algeria, is a dedicated
            computer science professional with a Bachelor&apos;s degree in
            Computer Science and a Master&apos;s degree in Business
            Intelligence. Over the past three years, he has developed a strong
            passion for web development, mastering both front-end and back-end
            technologies.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base leading-relaxed text-left md:text-left"
          >
            On the front-end, Khaled leverages JavaScript and React.js to craft
            seamless, user-friendly interfaces. His back-end expertise lies in
            building scalable and efficient server-side applications using
            Node.js with Express. Khaled is also well-versed in database
            management, proficient in both relational databases like MySQL,
            PostgreSQL, and Oracle, as well as NoSQL solutions such as MongoDB,
            and Firebase.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base leading-relaxed text-left md:text-left"
          >
            Throughout his journey, Khaled has gained hands-on experience
            leading projects from inception to completion, ensuring optimal
            database performance and creating visually appealing, functional web
            applications. His continuous pursuit of innovation keeps him at the
            forefront of web development trends.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="w-fit flex gap-7 items-center"
        >
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            href="/CV.pdf"
            download="CV.pdf"
            className="px-5 py-3 bg-neutral-200 rounded-full text-neutral-900"
          >
            Get my resume
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default StorySection;
