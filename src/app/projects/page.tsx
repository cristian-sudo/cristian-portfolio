"use client";
import React from 'react';
import LocalNavigation from "@/app/components/LocalNavigation";
import { useLanguage } from '../context/LanguageContext';
import ProjectSection from "@/app/components/ProjectSection";
import data from '../../../public/data.json';
import { DataStructure } from '../types';

const Projects: React.FC = () => {
    const { language } = useLanguage();

    const jsonData = data as DataStructure;
    const content = jsonData.content[language];
    const projectsLink = content.navLinks.find(link => link.href === '/projects');
    const routeName = projectsLink ? projectsLink.label : '';

    return (
        <>
            <LocalNavigation routeName={routeName} />
            <ProjectSection showAll={true} />
        </>
    );
};

export default Projects;