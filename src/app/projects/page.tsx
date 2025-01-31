"use client"
import React, { useEffect, useState } from 'react';
import LocalNavigation from "@/app/components/LocalNavigation";
import { useLanguage } from '../context/LanguageContext';
import ProjectSection from "@/app/components/ProjectSection";

const Projects: React.FC = () => {
    const { language } = useLanguage();
    const [routeName, setRouteName] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const content = data.content[language];
                const projectsLink = content.navLinks.find(link => link.href === '/projects');
                if (projectsLink) {
                    setRouteName(projectsLink.label);
                }
            });
    }, [language]);

    return (
        <>
            <LocalNavigation routeName={routeName} />
            <ProjectSection showAll={true}/>
        </>
    );
};

export default Projects;