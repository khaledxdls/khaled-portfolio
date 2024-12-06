import type { Metadata } from "next";
import { Varela } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import { Toaster } from "sonner";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};
const varela = Varela({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | Khaled Delassi`,
    default: `Software Engineer | Khaled Delassi`,
  },
  description:
    "Full-stack developer specializing in React, Node.js, and cloud technologies. Expert in building responsive web applications with modern tech stack.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Khaled Delassi",
    "Sequlize js",
  ],
  authors: [{ name: "Khaled Bachir Delassi" }],
  creator: "Khaled Bachir Delassi",
  publisher: "Khaled Bachir Delassi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Khaled Delassi Portfolio",
    title: "Khaled Delassi | Software Engineer",
    description:
      "Full-stack developer specializing in React, Node.js, and cloud technologies",
    images: [
      {
        url: "/about_image.jpg",
        width: 1200,
        height: 630,
        alt: "Khaled Delassi - Software Engineer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
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
        className={`${varela.className}  antialiased bg-stone-50 text-neutral-900 77`}
      >
        <NavBar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
