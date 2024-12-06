"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const ContactSection = () => {
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
      className="bg-neutral-900 text-neutral-100 py-16 px-6 flex flex-col items-center"
    >
      {/* Title */}
      <div className="relative justify-items-center mb-9 ">
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
            Contacts
          </motion.p>
        </div>
      </div>

      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex space-x-8 text-lg font-medium"
      >
        <a
          href="mailto:khaleddls03@gmail.com"
          className="hover:text-gray-600 transition duration-300"
        >
          E-mail
        </a>
        <a
          href="https://www.linkedin.com/in/khaled-bachir-delassi/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition duration-300"
        >
          Linkedin
        </a>
        <a
          href="https://github.com/khaledxdls"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition duration-300"
        >
          Github
        </a>
        <a
          href="https://x.com/Khaledxdls"
          className="hover:text-gray-600 transition duration-300"
        >
          X(Twitter)
        </a>
      </motion.div>

      {/* Scroll Up Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-gray-200 transition duration-300"
        >
          <motion.span
            initial={{ y: 4 }}
            animate={{ y: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.6,
            }}
            className="text-neutral-100"
          >
            ↑
          </motion.span>
        </button>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 text-sm text-gray-600 flex justify-between w-full max-w-4xl">
        <span>© Khaled Delassi</span>
        <a
          href="mailto:khaleddelassi@gmail.com"
          className="hover:text-gray-800 transition duration-300"
        >
          khaleddelassi@gmail.com
        </a>
      </div>
    </motion.section>
  );
};

export default ContactSection;
