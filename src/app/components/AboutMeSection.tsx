"use client"
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';

type AboutContent = {
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    label: string;
};

const AboutMeSection: React.FC = () => {
    const { language } = useLanguage();
    const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setAboutContent(data.content[language].aboutSection);
            });
    }, [language]);

    if (!aboutContent) {
        return null;
    }

    return (
        <div className="text-white py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-2xl font-bold text-accent">#{aboutContent.label}</h2>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                        <p className="text-lg text-gray-300 mb-6">
                            {highlightText(aboutContent.description)}
                        </p>
                        <a
                            href={aboutContent.buttonLink}
                            className="text-white font-semibold py-3 px-6 transition w-fit border border-accent"
                        >
                            {highlightText(aboutContent.buttonText)}
                        </a>
                    </div>

                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center flex-col">
                        <img
                            src={aboutContent.imageSrc}
                            alt="Hero Image"
                            className="w-full max-w-sm rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMeSection;