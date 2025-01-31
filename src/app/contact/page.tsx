"use client"
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ContactSection from "@/app/components/ContactSection";
import LocalNavigation from "@/app/components/LocalNavigation";

const Contact: React.FC = () => {
    const { language } = useLanguage();
    const [routeName, setRouteName] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const content = data.content[language];
                const projectsLink = content.navLinks.find(link => link.href === '/contact');
                if (projectsLink) {
                    setRouteName(projectsLink.label);
                }
            });
    }, [language]);

    return (
        <>
            <LocalNavigation routeName={routeName} />
            <ContactSection />
        </>
    );
};

export default Contact;