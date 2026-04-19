"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";

import { contactRatelimit } from "./ratelimit";

const SITE_URL = "https://khaled-dls.vercel.app";

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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeBudget = escapeHtml(budget || "Not specified");
  const safeMessage = escapeHtml(message);
  const preheader = `${name} · ${budget || "No budget specified"}`;
  const replySubject = encodeURIComponent(`Re: your inquiry`);
  const replyBody = encodeURIComponent(`Hi ${name},\n\n`);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>New inquiry from ${safeName}</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#171717;border:1px solid #262626;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px 40px 0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="font-size:20px;font-weight:700;color:#f5f5f5;letter-spacing:1px;line-height:1;padding-right:5px;vertical-align:bottom;">DLS</td>
                          <td style="vertical-align:bottom;padding-bottom:3px;">
                            <div style="width:7px;height:7px;background:#f5f5f5;border-radius:50%;font-size:0;line-height:0;">&nbsp;</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="display:inline-block;padding:4px 10px;background:#1e293b;color:#7dd3fc;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;">New inquiry</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 4px 40px;">
                <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;color:#f5f5f5;letter-spacing:-0.2px;">
                  ${safeName}
                </h1>
                <div style="margin-top:4px;font-size:13px;color:#a3a3a3;">
                  <a href="mailto:${safeEmail}" style="color:#a3a3a3;text-decoration:none;">${safeEmail}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px 0 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0f0f0f;border:1px solid #262626;border-radius:8px;">
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #262626;">
                      <div style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:2px;">Budget</div>
                      <div style="font-size:14px;color:#f5f5f5;">${safeBudget}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;">
                      <div style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:2px;">Reply to</div>
                      <div style="font-size:14px;color:#f5f5f5;">${safeName} &lt;${safeEmail}&gt;</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 0 40px;">
                <div style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:8px;">Message</div>
                <div style="padding:16px 18px;background:#0f0f0f;border:1px solid #262626;border-radius:8px;font-size:15px;line-height:1.65;color:#e5e5e5;white-space:pre-wrap;word-break:break-word;">${safeMessage}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background:#f5f5f5;border-radius:8px;">
                      <a href="mailto:${safeEmail}?subject=${replySubject}&body=${replyBody}"
                         style="display:inline-block;padding:12px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0a0a0a;text-decoration:none;letter-spacing:0.2px;">
                        Reply to ${safeName} →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="padding:16px 8px 0 8px;font-size:11px;color:#525252;max-width:600px;">
            Sent from the contact form on
            <a href="${SITE_URL}/contact" style="color:#737373;text-decoration:underline;">khaled-dls.vercel.app</a>.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

function buildAutoReply(name: string) {
  const text = [
    `Hi ${name},`,
    "",
    "Thanks for reaching out — your message has been received.",
    "I usually reply within 48 hours.",
    "",
    "In the meantime, feel free to browse my work:",
    `${SITE_URL}/portfolio`,
    "",
    "— Khaled Delassi",
    "khaleddls03@gmail.com",
  ].join("\n");

  const safeName = escapeHtml(name);
  const preheader =
    "Thanks for reaching out — I'll get back to you within 48 hours.";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>Thanks for reaching out</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#171717;border:1px solid #262626;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:32px 40px 8px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#f5f5f5;letter-spacing:1px;line-height:1;padding-right:6px;vertical-align:bottom;">DLS</td>
                    <td style="vertical-align:bottom;padding-bottom:3px;">
                      <div style="width:8px;height:8px;background:#f5f5f5;border-radius:50%;font-size:0;line-height:0;">&nbsp;</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 8px 40px;">
                <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:600;color:#f5f5f5;letter-spacing:-0.2px;">
                  Thanks for reaching out
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 40px 0 40px;font-size:15px;line-height:1.65;color:#d4d4d4;">
                <p style="margin:0 0 16px 0;">Hi ${safeName},</p>
                <p style="margin:0 0 16px 0;">
                  I've received your message and I'll get back to you within
                  <strong style="color:#f5f5f5;">48 hours</strong>.
                </p>
                <p style="margin:0;">
                  In the meantime, feel free to browse my work or connect with me below.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 8px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background:#f5f5f5;border-radius:8px;">
                      <a href="${SITE_URL}/portfolio"
                         style="display:inline-block;padding:12px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0a0a0a;text-decoration:none;letter-spacing:0.2px;">
                        View my portfolio →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 0 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:20px;">
                      <a href="https://github.com/khaledxdls" style="color:#a3a3a3;text-decoration:none;font-size:13px;">GitHub</a>
                    </td>
                    <td style="padding-right:20px;">
                      <a href="https://www.linkedin.com/in/khaled-delassi" style="color:#a3a3a3;text-decoration:none;font-size:13px;">LinkedIn</a>
                    </td>
                    <td>
                      <a href="mailto:khaleddls03@gmail.com" style="color:#a3a3a3;text-decoration:none;font-size:13px;">Email</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 32px 40px;">
                <div style="border-top:1px solid #262626;padding-top:20px;font-size:12px;line-height:1.6;color:#737373;">
                  <div style="color:#a3a3a3;font-weight:500;">Khaled Bachir Delassi</div>
                  <div>Software Engineer &middot; Full-Stack Web Development</div>
                </div>
              </td>
            </tr>
          </table>
          <div style="padding:16px 8px 0 8px;font-size:11px;color:#525252;max-width:560px;">
            You received this email because you contacted me via
            <a href="${SITE_URL}/contact" style="color:#737373;text-decoration:underline;">khaled-dls.vercel.app</a>.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
