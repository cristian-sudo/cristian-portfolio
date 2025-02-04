"use client";
import React from 'react';
import LocalNavigation from "@/app/components/LocalNavigation";
import { useLanguage } from '../context/LanguageContext';
import AboutMeHeroBanner from "@/app/components/AboutMeHeroBanner";
import SkillsSection from "@/app/components/SkillsSection";
import FunFacts from "@/app/components/FunFacts";
import data from '../../../public/data.json';
import { DataStructure } from '../types';

const AboutMe: React.FC = () => {
    const { language } = useLanguage();

    const jsonData = data as DataStructure;
    const content = jsonData.content[language];
    const aboutMeLink = content.navLinks.find(link => link.href === '/about-me');
    const routeName = aboutMeLink ? aboutMeLink.label : '';

    return (
        <>
            <LocalNavigation routeName={routeName} />
            <AboutMeHeroBanner />
            <SkillsSection showImage={false} />
            <FunFacts />
        </>
    );
};

export default AboutMe;