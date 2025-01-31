"use client"
import React, { useEffect, useState } from 'react';
import LocalNavigation from "@/app/components/LocalNavigation";
import { useLanguage } from '../context/LanguageContext';
import AboutMeHeroBanner from "@/app/components/AboutMeHeroBanner";
import SkillsSection from "@/app/components/SkillsSection";
import FunFacts from "@/app/components/FunFacts";

const AboutMe: React.FC = () => {
    const { language } = useLanguage();
    const [routeName, setRouteName] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const content = data.content[language];
                const projectsLink = content.navLinks.find(link => link.href === '/about-me');
                if (projectsLink) {
                    setRouteName(projectsLink.label);
                }
            });
    }, [language]);

    return (
        <>
            <LocalNavigation routeName={routeName} />
            <AboutMeHeroBanner />
            <SkillsSection showImage={false}/>
            <FunFacts />
        </>
    );
};

export default AboutMe;