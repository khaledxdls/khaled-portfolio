import { Metadata } from "next";
import ContactPage from "../_components/portfolio/ContactPage/ContactPage";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for freelance work inquiries, project collaboration, or general questions. Professional software engineer specializing in full-stack web development.",
  keywords: [
    "Contact Form",
    "Freelance Developer",
    "Web Development",
    "Software Engineer",
    "Project Inquiry",
    "Professional Services",
    "Full Stack Developer",
    "Khaled Delassi Contact",
  ],
  openGraph: {
    title: "Contact Khaled Delassi | Software Engineer",
    description: "Let's discuss your next web development project",
    url: "https://your-domain.com/contact",
    type: "website",
    images: [
      {
        url: "/contact-preview.jpg", // Add an appropriate preview image
        width: 1200,
        height: 630,
        alt: "Contact Khaled Delassi",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-domain.com/contact",
  },
  verification: {
    google: "your-google-verification-code", // Add if you have one
  },
};
function page() {
  return (
    <>
      <ContactPage />
    </>
  );
}

export default page;
