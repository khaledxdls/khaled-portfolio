"use server";

import nodemailer from "nodemailer";
export async function sendEmail(formData: any) {
  const { name, email, message, budget } = formData;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email app password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email
    subject: `Freelance Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nBudget: ${
      budget || "Not specified"
    }`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch ({ error }) {
    throw new Error("Failed to send email. Please try again.");
  }
}
