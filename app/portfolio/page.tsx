import { Metadata } from "next";
import ContactSection from "../_components/home/ContactSection";
import ProjectSectiom from "../_components/portfolio/ProjectSectiom";
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore my portfolio of web development projects, including e-commerce platforms, educational apps, management systems, and landing pages. Built with React, Node.js, TypeScript, and modern web technologies.",
  keywords: [
    "Web Development Portfolio",
    "Full Stack Projects",
    "React Applications",
    "Node.js Projects",
    "E-commerce Solutions",
    "Educational Technology",
    "Management Systems",
    "Landing Pages",
    "TypeScript Development",
    "PostgreSQL",
    "MySQL",
  ],
  openGraph: {
    title: "Web Development Portfolio | Khaled Delassi",
    description:
      "A showcase of innovative web applications and solutions built with modern technologies",
    url: "https://your-domain.com/portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-domain.com/portfolio",
  },
};
function page() {
  return (
    <div className=" w-full">
      <ProjectSectiom />
      <ContactSection />
    </div>
  );
}

export default page;
