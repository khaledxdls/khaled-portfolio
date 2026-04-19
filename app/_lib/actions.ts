"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";

import { contactRatelimit } from "./ratelimit";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().email("Invalid email address").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(4000, "Message is too long"),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.input<typeof ContactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "127.0.0.1";
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildOwnerEmail(data: {
  name: string;
  email: string;
  message: string;
  budget?: string;
}) {
  const { name, email, message, budget } = data;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Budget: ${budget || "Not specified"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,Segoe UI,sans-serif;max-width:560px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">New freelance inquiry</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <tr><td style="padding:6px 0;color:#666;width:90px">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666">Budget</td><td>${escapeHtml(budget || "Not specified")}</td></tr>
      </table>
      <div style="padding:12px 16px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>`;

  return { text, html };
}

function buildAutoReply(name: string) {
  const text = [
    `Hi ${name},`,
    "",
    "Thanks for reaching out — your message has been received.",
    "I usually reply within 48 hours.",
    "",
    "— Khaled Delassi",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,Segoe UI,sans-serif;max-width:520px;line-height:1.6;color:#111">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for reaching out — your message has been received. I usually reply within <strong>48 hours</strong>.</p>
      <p style="margin-top:32px;color:#555">— Khaled Delassi</p>
    </div>`;

  return { text, html };
}

export async function sendEmail(formData: ContactInput): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(formData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  if (parsed.data.company) {
    return { ok: true };
  }

  if (contactRatelimit) {
    const ip = await getClientIp();
    const { success, reset } = await contactRatelimit.limit(ip);
    if (!success) {
      const minutes = Math.max(1, Math.ceil((reset - Date.now()) / 60_000));
      return {
        ok: false,
        error: `Too many requests. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      };
    }
  }

  const { name, email, message, budget } = parsed.data;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.error("[contact] Missing EMAIL_USER / EMAIL_PASS env vars");
    return {
      ok: false,
      error: "The contact form is temporarily unavailable. Please email me directly.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const owner = buildOwnerEmail({ name, email, message, budget });
  const reply = buildAutoReply(name);

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Portfolio Contact" <${user}>`,
        to: user,
        replyTo: `"${name}" <${email}>`,
        subject: `New inquiry from ${name}${budget ? ` — ${budget}` : ""}`,
        text: owner.text,
        html: owner.html,
      }),
      transporter.sendMail({
        from: `"Khaled Delassi" <${user}>`,
        to: email,
        subject: "Thanks — I received your message",
        text: reply.text,
        html: reply.html,
      }),
    ]);

    return { ok: true };
  } catch (err) {
    console.error("[contact] sendMail failed", err);
    return {
      ok: false,
      error: "Failed to send message. Please try again or email me directly.",
    };
  }
}
