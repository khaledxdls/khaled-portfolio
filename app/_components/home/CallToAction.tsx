"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r w-[80%] mx-auto my-9 from-neutral-900 to-neutral-600 text-white rounded-xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Title and Description with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold">Start a project</h2>
          <p className="text-sm mt-2">
            Interested in working together? We should queue up a time to chat.
            I’ll buy the tea.
          </p>
        </motion.div>
        {/* Button with Unique Gradient */}
        <motion.div className="w-fit flex gap-7 items-center">
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="px-5 py-3 bg-neutral-200 rounded-full text-neutral-900"
          >
            <span>☕</span> Let’s do this
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
