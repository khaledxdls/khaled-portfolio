import type { Metadata } from "next";
import { Varela, Cinzel } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import StoryMode from "./_components/StoryMode";
import { Toaster } from "sonner";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
export const viewport: Viewport = {
  themeColor: "#fafaf9",
};
const varela = Varela({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ["400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khaled-dls.vercel.app"),
  title: {
    template: `%s | Khaled Bachir Delassi`,
    default: `Khaled Bachir Delassi | Full-Stack Software Engineer`,
  },
  description:
    "Khaled Bachir Delassi — full-stack software engineer specializing in React, Next.js, Node.js, TypeScript, and cloud technologies. Explore projects, experience, and education.",
  keywords: [
    "Khaled Delassi",
    "Khaled Bachir Delassi",
    "Khaled Delassi portfolio",
    "Khaled Delassi developer",
    "Khaled Delassi software engineer",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
  ],
  authors: [{ name: "Khaled Bachir Delassi", url: "https://khaled-dls.vercel.app" }],
  creator: "Khaled Bachir Delassi",
  publisher: "Khaled Bachir Delassi",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "Iz2NYgVY-kWIiG4ZvUuFYxhEjSXGchOPIrSRqydE6jQ",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khaled-dls.vercel.app",
    siteName: "Khaled Bachir Delassi Portfolio",
    title: "Khaled Bachir Delassi | Full-Stack Software Engineer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies.",
    images: [
      {
        url: "/about_image.jpg",
        width: 1200,
        height: 630,
        alt: "Khaled Bachir Delassi - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaled Bachir Delassi | Full-Stack Software Engineer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies.",
    images: ["/about_image.jpg"],
    creator: "@Khaledxdls",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${varela.className} ${cinzel.variable} antialiased bg-stone-50 text-neutral-900`}
      >
        <NavBar />
        {children}
        <StoryMode />
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
