"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { sendEmail } from "@/app/_lib/actions";

type FormState = {
  name: string;
  email: string;
  message: string;
  budget: string;
  company: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  message: "",
  budget: "",
  company: "",
};

const MESSAGE_MAX = 4000;

const ContactPage = () => {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    setIsPending(true);
    try {
      const result = await sendEmail(formData);

      if (result.ok === true) {
        toast.success("Message sent — I'll reply within 48 hours.");
        setFormData(INITIAL_STATE);
        setFieldErrors({});
        return;
      }

      setFieldErrors(result.fieldErrors ?? {});
      toast.error(result.error);
    } finally {
      setIsPending(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 transition ${
      fieldErrors[field] ? "border-red-500/70 focus:ring-red-500/70" : ""
    }`;

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-neutral-900 text-neutral-100 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mt-12"
      >
        CONTACTS
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-8 text-lg font-medium mt-8"
      >
        <motion.a
          href="mailto:khaleddls03@gmail.com"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          E-mail
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/khaled-delassi"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          LinkedIn
        </motion.a>
        <motion.a
          href="https://github.com/khaledxdls"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="hover:text-gray-400 transition"
        >
          GitHub
        </motion.a>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-md mt-12"
      >
        <h2 className="text-xl font-medium mb-1">Freelance Work Inquiry</h2>
        <p className="text-sm text-neutral-400 mb-5">
          Tell me about your project. I reply within 48 hours.
        </p>

        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-[-9999px]"
        >
          <label htmlFor="company">Company (leave blank)</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

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
            maxLength={80}
            autoComplete="name"
            disabled={isPending}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={inputClass("name")}
          />
          {fieldErrors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-400">
              {fieldErrors.name}
            </p>
          )}
        </div>

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
            placeholder="you@company.com"
            required
            maxLength={160}
            autoComplete="email"
            disabled={isPending}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={inputClass("email")}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium" htmlFor="message">
              Message
            </label>
            <span className="text-xs text-neutral-500">
              {formData.message.length}/{MESSAGE_MAX}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Briefly describe your project, timeline, and goals"
            rows={5}
            required
            maxLength={MESSAGE_MAX}
            disabled={isPending}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={
              fieldErrors.message ? "message-error" : undefined
            }
            className={inputClass("message")}
          />
          {fieldErrors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-400">
              {fieldErrors.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1" htmlFor="budget">
            Budget <span className="text-neutral-500">(optional)</span>
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. $2,000 – $5,000"
            maxLength={60}
            disabled={isPending}
            className={inputClass("budget")}
          />
        </div>

        <motion.button
          whileHover={isPending ? undefined : { scale: 1.02 }}
          whileTap={isPending ? undefined : { scale: 0.98 }}
          type="submit"
          disabled={isPending}
          className="w-full bg-neutral-700 text-neutral-100 py-2 px-4 rounded hover:bg-neutral-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <span className="h-4 w-4 rounded-full border-2 border-neutral-400 border-t-transparent animate-spin" />
          )}
          {isPending ? "Sending…" : "Send message"}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-sm text-neutral-500 text-center mt-12"
      >
        <p>© DELASSI Khaled Bachir {new Date().getFullYear()}</p>
        <p className="mt-2">khaleddls03@gmail.com</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12 mb-8"
      >
        <a href="#top" aria-label="Back to top">
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
