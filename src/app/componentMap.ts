import HeroBanner from "@/app/components/HeroBanner";
import AboutMeSection from "@/app/components/AboutMeSection";
import Quote from "@/app/components/Quote";
import ProjectsSection from "@/app/components/ProjectsSection";
import SkillsSection from "@/app/components/SkillsSection";
import ContactSection from "@/app/components/ContactSection";
import AboutMeHeroBanner from "@/app/components/AboutMeHeroBanner";
import FunFacts from "@/app/components/FunFacts";

const componentMap: { [key: string]: React.FC<any> } = {
    hero_section: HeroBanner,
    quote_section: Quote,
    projects_section: ProjectsSection,
    skills_section: SkillsSection,
    about_me_section: AboutMeSection,
    contact_section: ContactSection,
    about_me_long: AboutMeHeroBanner,
    fun_facts_section: FunFacts,

};

export default componentMap;