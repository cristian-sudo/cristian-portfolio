"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { highlightText } from "../utils/textUtils";
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import { AboutMeSection as AboutMeSectionType } from "../types";
import Image from "next/image";

// Utility function to get the localized title
function getLocalizedTitle(section: AboutMeSectionType, language: string): string {
    const key = `${language}_title`;
    return ((section as unknown) as Record<string, string>)[key] || section.title;
}

// Utility function to get the localized description
function getLocalizedDescription(section: AboutMeSectionType, language: string): string {
    const key = `${language}_description`;
    return ((section as unknown) as Record<string, string>)[key] || section.description;
}

// Utility function to get the localized button label
function getLocalizedButtonLabel(section: AboutMeSectionType, language: string): string {
    const key = `${language}_button_label`;
    return ((section as unknown) as Record<string, string>)[key] || section.button_label;
}

const AboutMeSection: React.FC<AboutMeSectionType> = (section) => {
    const { language } = useLanguage();
    const [aboutContent, setAboutContent] = useState<AboutMeSectionType | null>(null);

    useEffect(() => {
        // Simulate fetching data based on language
        const localizedTitle = getLocalizedTitle(section, language.toLowerCase());
        const localizedDescription = getLocalizedDescription(section, language.toLowerCase());
        const localizedButtonLabel = getLocalizedButtonLabel(section, language.toLowerCase());

        const updatedAboutContent: AboutMeSectionType = {
            ...section,
            title: localizedTitle,
            description: localizedDescription,
            button_label: localizedButtonLabel,
        };

        setAboutContent(updatedAboutContent);
    }, [language, section]);

    if (!aboutContent) {
        return null;
    }

    return (
        <div className="py-12 my-6">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-bold text-accent text-center md:text-left mb-6">
                    #{aboutContent.title}
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
                                <a href={aboutContent.link} className=" px-3 text-2xl">
                                    {highlightText(aboutContent.button_label)} →
                                </a>
                            </AnimatedBorderTrail>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                            src={aboutContent.image.permalink}
                            alt={aboutContent.image.alt || "About Me Image"}
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