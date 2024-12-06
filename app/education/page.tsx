import { Metadata } from "next";
import Certifications from "../_components/education/Certifications";
import EducationSection from "../_components/education/EducationSection";
import ContactSection from "../_components/home/ContactSection";
export const metadata: Metadata = {
  title: "Education",
  description:
    "Master's in Business Intelligence and Bachelor's in Information Systems from Amar Telidji University. View my academic achievements, relevant coursework, and professional certifications in software development, cloud computing, and web security.",
  keywords: [
    "Business Intelligence",
    "Computer Science Education",
    "Information Systems",
    "Software Development Certifications",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "DevOps",
    "Web Security",
    "Database Management",
    "Full Stack Development",
  ],
  openGraph: {
    title: "Academic Background & Certifications | Khaled Delassi",
    description:
      "Computer Science education and professional development journey in software engineering",
    url: "https://your-domain.com/education",
    type: "website",
    images: [
      {
        url: "/certification/typescript-v4.jpg", // Using one of your certification images
        width: 1200,
        height: 630,
        alt: "Education and Certifications Overview",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-domain.com/education",
  },
};
function page() {
  return (
    <div>
      <EducationSection />
      <Certifications />
      <ContactSection />
    </div>
  );
}

export default page;
