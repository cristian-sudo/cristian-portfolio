"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import data from '../../../public/data.json';
import { DataStructure, AboutSection } from '../types';

const AboutMeSection: React.FC = () => {
    const { language } = useLanguage();
    const contentData: DataStructure = data as DataStructure;

    const aboutContent: AboutSection | undefined = contentData.content[language]?.aboutSection;

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
                        <AnimatedBorderTrail
                            className=" bg-zinc-600 hover:bg-zinc-500"
                            contentClassName=" bg-zinc-800"
                            trailColor="purple"
                        >
                            <button className=" px-3 py-1 text-2xl text-white">
                                {highlightText(aboutContent.buttonText)} →
                            </button>
                        </AnimatedBorderTrail>
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