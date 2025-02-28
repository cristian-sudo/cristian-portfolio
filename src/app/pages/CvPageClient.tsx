"use client";

import React, { useState, useEffect } from "react";
import { Timeline } from "@/app/components/ui/timeline";
import { useLanguage } from "../context/LanguageContext";
import {CvPageClientProps, TimelineEntry, HeroSection, TransformedTimelineEntry} from "@/app/types";
import Image from "next/image";

const CvPageClient = ({ data, domain = "", heroSection }: CvPageClientProps) => {
    const { language } = useLanguage();
    const [transformedData, setTransformedData] = useState<TransformedTimelineEntry[]>([]);

    useEffect(() => {
        const selectedLanguage = language.toLowerCase();

        const titleKey = `${selectedLanguage}_title` as keyof HeroSection;
        const subtitleKey = `${selectedLanguage}_subtitle` as keyof HeroSection;

        const newTitle = heroSection[titleKey] || heroSection.title;
        const newSubtitle = heroSection[subtitleKey] || heroSection.subtitle;

        const newTransformedData = data.map(entry => {
            const contentKey = `${selectedLanguage}_content` as keyof TimelineEntry;
            const content = entry[contentKey] || entry.content;

            return {
                year: entry.year,
                content: (
                    <div>
                        <div
                            className="text-neutral-800 dark:text-neutral-200 md:text-2xl text-lg font-normal mb-8 prose prose-invert"
                            dangerouslySetInnerHTML={{ __html: content as string }}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            {entry.images.map(image => (
                                <Image
                                    key={image.id}
                                    width={400}
                                    height={400}
                                    src={`${domain}${image.url}`}
                                    alt={image.alt || "Image"}
                                    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                                />
                            ))}
                        </div>
                    </div>
                ),
                title: newTitle,
                subtitle: newSubtitle,
            };
        });

        setTransformedData(newTransformedData);
    }, [language, data, domain, heroSection]);

    return (
        <div className="w-full mt-24">
            <Timeline data={transformedData} />
        </div>
    );
};
export default CvPageClient;