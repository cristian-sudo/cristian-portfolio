"use client"
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';

type HeroContent = {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    currentProject: string;
};

const HeroBanner: React.FC = () => {
    const { language } = useLanguage();
    const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setHeroContent(data.content[language].heroSection);
            });
    }, [language]);

    if (!heroContent) {
        return null; // or a loading spinner
    }

    return (
        <div className="text-white py-16 my-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
                {/* Left Side: Text Content */}
                <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                    <h1 className="text-4xl mb-4">
                        {highlightText(heroContent.title)}
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        {highlightText(heroContent.description)}
                    </p>
                    <a
                        href={heroContent.buttonLink}
                        className="text-white font-semibold py-3 px-6 transition w-fit border border-accent"
                    >
                        {highlightText(heroContent.buttonText)}
                    </a>
                </div>

                {/* Right Side: Image */}
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center flex-col">
                    <img
                        src={heroContent.imageSrc}
                        alt="Hero Image"
                        className="w-full max-w-sm rounded-lg shadow-lg"
                    />
                    <span className='my-3 border w-fit p-1 flex flex-row items-center gap-3'>
            <span className="w-5 h-5 bg-accent inline-block"></span>
            <p>{highlightText(heroContent.currentProject)}</p>
          </span>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;