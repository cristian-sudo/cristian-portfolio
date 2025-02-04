"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import data from '../../../public/data.json';
import { DataStructure, AboutSection } from '../types';

const AboutMeHeroBanner: React.FC = () => {
    const { language } = useLanguage();
    const [aboutContent, setAboutContent] = useState<AboutSection | null>(null);

    useEffect(() => {
        const contentData: DataStructure = data as DataStructure;
        const fetchedAboutContent: AboutSection | undefined = contentData.content[language]?.aboutSection;
        setAboutContent(fetchedAboutContent || null);
    }, [language]);

    if (!aboutContent) {
        return <div>Loading...</div>; // Display a loading state while fetching data
    }

    return (
        <div className="py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-full text-center md:text-left flex gap-3 flex-col">
                        <p className="text-lg mb-6">
                            {highlightText(aboutContent.longDescription || '')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMeHeroBanner;