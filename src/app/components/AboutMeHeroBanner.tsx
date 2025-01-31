"use client"
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';

type AboutContent = {
    longDescription: string;
    imageSrc: string;
};

const AboutMeHeroBanner: React.FC = () => {
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
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                        <p className="text-lg text-gray-300 mb-6">
                            {highlightText(aboutContent.longDescription)}
                        </p>
                    </div>

                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center flex-col ml-6">
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

export default AboutMeHeroBanner;