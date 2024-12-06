import { Metadata } from "next";
import ApproachSection from "../_components/workflow/ApproachSection";
export const metadata: Metadata = {
  title: "Workflow",
  description:
    "Learn about my professional workflow process - from initial contact through project completion. I follow a structured 5-step approach: Acquaintance, Analysis, Design, Development, and Delivery.",
  keywords: [
    "Development Process",
    "Project Workflow",
    "Web Development Methodology",
    "Software Engineering Process",
    "Project Management",
    "Design Process",
    "Client Collaboration",
  ],
  openGraph: {
    title: "Development Workflow | Khaled Delassi",
    description:
      "A detailed look at my professional development process and project workflow",
    url: "https://khaled-dls.vercel.app/workflow",
    type: "website",
    images: [
      {
        url: "/workflow-preview.jpg", // Add an appropriate preview image
        width: 1200,
        height: 630,
        alt: "Development Workflow Process",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://khaled-dls.vercel.app/workflow",
  },
};
function page() {
  return (
    <>
      <ApproachSection />
    </>
  );
}

export default page;
