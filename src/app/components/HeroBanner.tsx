import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import GibberishText from "@/app/components/animata/text/gibberish-text";
import Image from "next/image";
import {HeroBannerSection} from "@/app/types";

const HeroBanner: React.FC<HeroBannerSection> = (section) => {
    const { language } = useLanguage();
    const [localizedContent, setLocalizedContent] = useState({
        title: section.title || "Default Title",
        buttonLabel: section.button_label || "Default Button Label",
        underImageText: section.under_image_text || "Default Under Image Text"
    });

    useEffect(() => {
        const languageSelected = language.toLowerCase();
        const titleKey = `${languageSelected}_title` as keyof HeroBannerSection;
        const buttonLabelKey = `${languageSelected}_button_label` as keyof HeroBannerSection;
        const underImageTextKey = `${languageSelected}_under_image_text` as keyof HeroBannerSection;

        setLocalizedContent({
            title: (section[titleKey] || section.title || "Default Title") as string,
            buttonLabel: (section[buttonLabelKey] || section.button_label || "Default Button Label") as string,
            underImageText: (section[underImageTextKey] || section.under_image_text || "Default Under Image Text") as string
        });
    }, [language, section]);

    return (
        <div className="py-16 my-6 mt-28">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
                <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                    <p className="text-lg mb-6">
                        <GibberishText text={localizedContent.title} className={'text-2xl'}/>
                    </p>
                    <AnimatedBorderTrail
                        className=" bg-zinc-600 hover:bg-zinc-500"
                        contentClassName=" bg-zinc-800"
                        trailColor="red"
                    >
                        <a href={section.link} className=" px-3 text-2xl">
                            {highlightText(localizedContent.buttonLabel)} →
                        </a>
                    </AnimatedBorderTrail>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-end flex-col md:ml-6">
                    {section.image && (
                        <Image
                            src={section.image.permalink}
                            width={500}
                            height={500}
                            alt={section.image.alt || "Hero Image"}
                            className="w-full max-w-sm rounded-lg shadow-lg"
                        />
                    )}
                    <span className='my-3 border w-fit p-1 flex flex-row items-center gap-3'>
                        <span className="w-5 h-5 bg-accent inline-block"></span>
                        <p>{highlightText(localizedContent.underImageText)}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;