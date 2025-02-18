"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AboutMeHeroBannerSection } from '../types';

const AboutMeHeroBanner: React.FC<AboutMeHeroBannerSection> = (section) => {
    const { language } = useLanguage();
    const [localizedContent, setLocalizedContent] = useState({
        title: section.title || "Default Title",
    });

    useEffect(() => {
        const languageSelected = language.toLowerCase();
        const titleKey = `${languageSelected}_title` as keyof AboutMeHeroBannerSection;

        setLocalizedContent({
            title: (section[titleKey] || section.title || "Default Title") as string,
        });
    }, [language, section]);

    return (
        <div className="py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-full text-center md:text-left flex gap-3 flex-col">
                        <div
                            className="text-lg mb-6"
                            dangerouslySetInnerHTML={{ __html: localizedContent.title }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMeHeroBanner;