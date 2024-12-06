"use client";
import Image from "next/image";
import image_2 from "@/public/about_image.jpg";
import { motion } from "framer-motion";

function HeroSection() {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
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
      initial="initial"
      animate="animate"
      className="flex flex-col md:flex-row gap-10 justify-between min-h-screen p-5 md:p-14"
    >
      <motion.div
        variants={containerVariants}
        className="flex flex-col justify-center self-center w-full md:w-1/2 gap-6 md:gap-10"
      >
        <div className="relative self-center md:self-end">
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
            <motion.p className="relative text-2xl font-bold py-3 px-5 rounded-full z-10">
              {" "}
              Junior{" "}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col">
          <motion.p className="relative text-4xl md:text-7xl tracking-widest font-bold rounded-full z-10 text-center md:text-left">
            Software
          </motion.p>
          <motion.p className="relative text-4xl md:text-7xl tracking-widest font-bold rounded-full z-10 text-center md:text-right">
            Engineer
          </motion.p>
        </div>

        <motion.div
          variants={fadeInUp}
          className="space-y-3 md:space-y-5 text-center md:text-left"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl font-bold"
          >
            Hello I am
          </motion.h2>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-primary-100"
          >
            Khaled bachir Delassi
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl font-bold"
          >
            I am a fullstack developer
          </motion.h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row gap-3 text-neutral-500"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-sm md:text-base text-center md:text-left"
          >
            Aspiring Software Engineer with a solid background in full-stack
            development and cloud technologies. Holding a Bachelor&apos;s in
            Information Systems and recently completing a Master&apos;s in
            Business Intelligence, I&apos;m eager to apply my academic knowledge
            to practical projects.
          </motion.h3>
          <motion.h3
            variants={fadeInUp}
            className="text-sm md:text-base text-center md:text-left"
          >
            I excel at problem-solving, rapidly adapting to new technologies,
            and contributing to innovative solutions. A strong team player,
            I&apos;m committed to continuous growth in the tech industry.
          </motion.h3>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="w-full md:w-fit flex flex-col md:flex-row gap-4 md:gap-7 items-center justify-center md:justify-start"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="w-full md:w-auto transition-colors bg-neutral-900 text-neutral-100  px-6 py-2 rounded-full border-2 "
          >
            Contact me
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <Image
          src={image_2}
          alt="Picture of the author"
          placeholder="blur"
          loading="lazy"
          className="shadow-lg rounded-xl w-[90%] md:w-[80%] shadow-black"
          quality={80}
        />
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
