"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import GibberishText from "@/app/components/animata/text/gibberish-text";
import data from '../../../public/data.json';
import { DataStructure } from '../types';

const HeroBanner: React.FC = () => {
    const { language } = useLanguage();
    const content = (data as DataStructure).content;
    const heroContent = content[language]?.heroSection;

    if (!heroContent) {
        return null;
    }

    return (
        <div className="text-white py-16 my-6 mt-28">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
                <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                    <p className="text-lg text-gray-300 mb-6">
                        <GibberishText text={heroContent.title} className={'text-3xl'}/>
                    </p>
                    <AnimatedBorderTrail
                        className=" bg-zinc-600 hover:bg-zinc-500"
                        contentClassName=" bg-zinc-800"
                        trailColor="red"
                    >
                        <button className=" px-3 py-1 text-2xl text-white">
                            {highlightText(heroContent.buttonText)} →
                        </button>
                    </AnimatedBorderTrail>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center flex-col md:ml-6">
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