import HeroBanner from "@/app/components/HeroBanner";
import Quote from "@/app/components/Quote";
import ProjectSection from "@/app/components/ProjectSection";
import SkillsSection from "@/app/components/SkillsSection";
import AboutMeSection from "@/app/components/AboutMeSection";
import ContactSection from "@/app/components/ContactSection";

export default function Home() {
  return (
      <>
        <HeroBanner/>
        <Quote/>
        <ProjectSection/>
        <SkillsSection />
        <AboutMeSection />
        <ContactSection />
      </>
  );
}
