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
            Khaled Bachir Delassi
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

          {/* ── Artistic Story Mode trigger ── */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              window.dispatchEvent(new CustomEvent("activateStoryMode"))
            }
            className="group relative w-full md:w-auto cursor-pointer select-none"
          >
            {/* RPG item-frame border */}
            <div className="relative flex items-center justify-center gap-3 px-5 py-2.5 border border-neutral-300 group-hover:border-[#c9a96e] transition-colors duration-500">

              {/* ── Corner L-bracket accents ── */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-300 group-hover:border-[#c9a96e] -translate-x-px -translate-y-px transition-colors duration-500" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-300 group-hover:border-[#c9a96e] translate-x-px -translate-y-px transition-colors duration-500" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-300 group-hover:border-[#c9a96e] -translate-x-px translate-y-px transition-colors duration-500" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-300 group-hover:border-[#c9a96e] translate-x-px translate-y-px transition-colors duration-500" />

              {/* Breathing left sparkle */}
              <motion.span
                animate={{ opacity: [0.25, 0.75, 0.25] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[11px] text-neutral-300 group-hover:text-[#c9a96e] transition-colors duration-500"
              >
                ✦
              </motion.span>

              {/* Label */}
              <span
                className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-neutral-400 group-hover:text-[#c9a96e] transition-colors duration-500"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                The Legend
              </span>

              {/* Breathing right sparkle (offset) */}
              <motion.span
                animate={{ opacity: [0.75, 0.25, 0.75] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[11px] text-neutral-300 group-hover:text-[#c9a96e] transition-colors duration-500"
              >
                ✦
              </motion.span>
            </div>

            {/* Ambient glow on hover */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: "0 0 24px rgba(201,169,110,0.12), inset 0 0 12px rgba(201,169,110,0.04)",
              }}
            />

            {/* "Enter if you dare" — appears below on hover */}
            <div className="absolute -bottom-5 left-0 right-0 flex justify-center pointer-events-none">
              <span
                className="text-[7px] tracking-[0.45em] uppercase opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ fontFamily: "var(--font-cinzel)", color: "#c9a96e" }}
              >
                enter if you dare
              </span>
            </div>
          </motion.button>
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
          alt="Khaled Bachir Delassi - Full-Stack Software Engineer"
          placeholder="blur"
          priority
          className="shadow-lg rounded-xl w-[90%] md:w-[80%] shadow-black"
          quality={80}
        />
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
