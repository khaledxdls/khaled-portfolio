import { Metadata } from "next";
import CallToAction from "./_components/home/CallToAction";
import ContactSection from "./_components/home/ContactSection";
import ExperinceSection from "./_components/home/ExperinceSection";
import HeroSection from "./_components/home/HeroSection";
import ProjectSection from "./_components/home/ProjectSection";
import SkillsSection from "./_components/home/SkillsSection";
import StorySection from "./_components/home/StorySection";
export const metadata: Metadata = {
  description: "My portfolio",
};
function page() {
  return (
    <div className="w-full ">
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
