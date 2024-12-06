"use client";
import { useState } from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-4 md:px-5 py-4 md:py-5">
      <div className="flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <MainNav />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-current block transition-all"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-current block transition-all"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-current block transition-all"
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed inset-0 bg-white  z-40 md:hidden flex items-center justify-center"
            >
              <div className="w-full">
                <MainNav mobile={true} setIsOpen={setIsOpen} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default NavBar;
