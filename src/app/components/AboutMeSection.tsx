"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { highlightText } from "../utils/textUtils";
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import data from "../../../public/data.json";
import { DataStructure, AboutSection } from "../types";
import Image from "next/image";

const AboutMeSection: React.FC = () => {
    const { language } = useLanguage();
    const [aboutContent, setAboutContent] = useState<AboutSection | null>(null);

    useEffect(() => {
        const contentData: DataStructure = data as DataStructure;
        const fetchedAboutContent: AboutSection | undefined = contentData.content[language]?.aboutSection;
        setAboutContent(fetchedAboutContent || null);
    }, [language]);

    if (!aboutContent) {
        return null;
    }

    return (
        <div className="py-12 my-6">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-bold text-accent text-center md:text-left mb-6">
                    #{aboutContent.label}
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
                        <p className="text-lg">{highlightText(aboutContent.description)}</p>

                        {/* Center Button on Mobile, Left on Larger Screens */}
                        <div className="flex justify-center md:justify-start">
                            <AnimatedBorderTrail
                                className=" bg-zinc-600 hover:bg-zinc-500"
                                contentClassName=" bg-zinc-800"
                                trailColor="red"
                            >
                                <a href={'/about-me'} className=" px-3 text-2xl">
                                    {highlightText(aboutContent.buttonText)} →
                                </a>
                            </AnimatedBorderTrail>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                            src={aboutContent.imageSrc}
                            alt="About Me Image"
                            width={400}
                            height={400}
                            className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMeSection;