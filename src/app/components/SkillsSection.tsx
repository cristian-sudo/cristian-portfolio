"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import { Section, Skill } from '../types';

const SkillsSection: React.FC<Section> = (section) => {
    const { language } = useLanguage();
    const [skillsContent, setSkillsContent] = useState<Skill[] | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            if (!section || !section.skils) {
                console.error('Skills section data is undefined');
                return;
            }

            try {
                // Fetch additional data for each skill, if necessary
                const skillsData = await Promise.all(section.skils.map(async (skill) => {
                    if (skill.api_url) {
                        const response = await fetch(skill.api_url);
                        const result = await response.json();
                        const data = result.data;

                        return {
                            ...skill,
                            tags: data.skils.map((s: any) => s.title) || [],
                        };
                    }
                    return skill;
                }));

                setSkillsContent(skillsData);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, [section]);

    if (!skillsContent) {
        return null;
    }

    const selectedLanguage = language.toLowerCase();
    const title = section[`${selectedLanguage}_title`] || section.title;

    return (
        <div className="py-12 my-6">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-bold text-accent text-center md:text-left mb-6">
                    #{title}
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {section.image && (
                        <div className="w-full md:w-1/3 flex justify-center">
                            <Image
                                src={section.image.url}
                                width={400}
                                height={400}
                                alt="Skills"
                                className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    <div className={`w-full ${section.image ? "md:w-2/3" : ""}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                            {skillsContent.map((skill, index) => (
                                <div key={index} className="border p-4">
                                    <h3 className="font-bold mb-2 text-center">{skill.title}</h3>
                                    <ul className="text-center">
                                        {(skill.tags || []).map((tag, idx) => (
                                            <li key={idx} className="text-sm text-gray-300">{tag}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsSection;