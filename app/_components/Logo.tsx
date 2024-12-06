"use client";
import { motion } from "framer-motion";

function Logo() {
  const spinAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: 0, // Changed from Infinity to 0 for single rotation
      },
    },
  };

  return (
    <div className="text-2xl font-bold relative w-fit">
      <motion.div
        className="flex p-0 rounded-md"
        initial="initial"
        animate="animate"
        variants={spinAnimation}
        style={{ transformOrigin: "right bottom" }}
      >
        <p>DLS</p>
        <div className="w-2 h-2 rounded-full text-zinc-800 bg-zinc-800 self-end"></div>
      </motion.div>
    </div>
  );
}

export default Logo;
