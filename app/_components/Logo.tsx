"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

function Logo() {
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spinAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: 0,
      },
    },
  };

  const handleTap = () => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 3000);
    if (tapCountRef.current >= 7) {
      tapCountRef.current = 0;
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      window.dispatchEvent(new CustomEvent("activateStoryMode"));
    }
  };

  return (
    <div className="text-2xl font-bold relative w-fit" onClick={handleTap}>
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
