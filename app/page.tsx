import { Metadata } from "next";
import CallToAction from "./_components/home/CallToAction";
import ContactSection from "./_components/home/ContactSection";
import ExperinceSection from "./_components/home/ExperinceSection";
import HeroSection from "./_components/home/HeroSection";
import ProjectSection from "./_components/home/ProjectSection";
import SkillsSection from "./_components/home/SkillsSection";
import StorySection from "./_components/home/StorySection";

export const metadata: Metadata = {
  title: "Khaled Bachir Delassi | Full-Stack Software Engineer",
  description:
    "Official portfolio of Khaled Bachir Delassi — full-stack software engineer. Master's in Business Intelligence. React, Next.js, Node.js, TypeScript, PostgreSQL, AWS.",
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Khaled Bachir Delassi",
  alternateName: ["Khaled Delassi", "Khaled bachir Delassi"],
  url: "https://khaled-dls.vercel.app",
  image: "https://khaled-dls.vercel.app/about_image.jpg",
  jobTitle: "Full-Stack Software Engineer",
  description:
    "Full-stack software engineer specializing in React, Next.js, Node.js, TypeScript, and cloud technologies.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Amar Telidji University",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Full-Stack Web Development",
    "Business Intelligence",
  ],
  sameAs: [
    "https://github.com/khaledxdls",
    "https://www.linkedin.com/in/khaled-bachir-delassi/",
    "https://x.com/Khaledxdls",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Khaled Bachir Delassi Portfolio",
  url: "https://khaled-dls.vercel.app",
  author: {
    "@type": "Person",
    name: "Khaled Bachir Delassi",
  },
};

function page() {
  return (
    <div className="w-full ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <StorySection />
      <SkillsSection />
      <ProjectSection />
      <ExperinceSection />
      <CallToAction />
      <ContactSection />
    </div>
  );
}

export default page;
