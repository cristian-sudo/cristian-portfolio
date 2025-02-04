"use client"
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ContactSection from "@/app/components/ContactSection";
import LocalNavigation from "@/app/components/LocalNavigation";
import data from '../../../public/data.json';
import { DataStructure} from '../types';

const Contact: React.FC = () => {
    const { language } = useLanguage();

    const jsonData = data as DataStructure;
    const content = jsonData.content[language];
    const ContactLink = content.navLinks.find(link => link.href === '/contact');
    const routeName = ContactLink ? ContactLink.label : '';

    return (
        <>
            <LocalNavigation routeName={routeName} />
            <ContactSection />
        </>
    );
};

export default Contact;