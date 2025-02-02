"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import data from '../../../public/data.json';
import { DataStructure, AboutSection } from '../types';

const AboutMeHeroBanner: React.FC = () => {
    const { language } = useLanguage();
    const contentData: DataStructure = data as DataStructure;
    const aboutContent: AboutSection | undefined = contentData.content[language]?.aboutSection;

    if (!aboutContent) {
        return null;
    }

    return (
        <div className="text-white py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                        <p className="text-lg text-gray-300 mb-6">
                            {highlightText(aboutContent.longDescription || '')}
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