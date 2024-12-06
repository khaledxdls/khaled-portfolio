"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/app/_lib/actions";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
  });
  const { pending } = useFormStatus();
  const handleChange = ({ e }: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async ({ formData }: any) => {
    try {
      await sendEmail(formData);
      toast.success("Message sent successfully!");
      // Reset form
      setFormData({ name: "", email: "", message: "", budget: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-neutral-900 text-neutral-100 px-4">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mt-12"
      >
        CONTACTS
      </motion.h1>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-8 text-lg font-medium mt-8"
      >
        <motion.a
          href="mailto:example@gmail.com"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          E-mail
        </motion.a>
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          LinkedIn
        </motion.a>
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          GitHub
        </motion.a>
        <motion.a
          href="tel:+1234567890"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          Phone
        </motion.a>
      </motion.div>

      {/* Form */}
      <motion.form
        action={() => handleSubmit(formData)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-md mt-12"
      >
        <h2 className="text-xl font-medium mb-4">Freelance Work Inquiry</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
            rows={4}
            required
            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border-none focus:ring-2 focus:ring-neutral-500"
          ></textarea>
        </div>

        {/* Budget Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="budget">
            Budget (optional)
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter your budget"
            className="w-full p-2 rounded bg-neutral-700 text-gray-100 border-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={pending}
          className="w-full bg-neutral-700 text-neutral-100 py-2 px-4 rounded hover:bg-neutral-600 transition"
        >
          {pending ? "Sending..." : "Submit"}
        </motion.button>
      </motion.form>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-sm text-neutral-500 text-center mt-12"
      >
        <p>© DELASSI Khaled Bachir 2024</p>
        <p className="mt-2">delassi.khaled.bachir@gmail.com</p>
      </motion.div>

      {/* Upward Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12 mb-8"
      >
        <a href="#top">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-neutral-800 flex justify-center items-center hover:bg-neutral-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
};

export default ContactPage;
