"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Skills = {
    image: string;
    label: string;
    categories: {
        [category: string]: string[];
    };
};

type SkillsSectionProps = {
    showImage?: boolean;
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ showImage = true }) => {
    const { language } = useLanguage();
    const [skills, setSkills] = useState<Skills | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                if (data.content[language] && data.content[language].skills) {
                    setSkills(data.content[language].skills);
                }
            })
            .catch(error => {
                console.error("Error fetching skills:", error);
            });
    }, [language]);

    if (!skills) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white p-8 py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-2xl font-bold text-accent mb-6">#{skills.label}</h2>
                <div className="flex flex-col md:flex-row">
                    {showImage && (
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <img src={skills.image} alt="Skills" className="max-w-full" />
                        </div>
                    )}
                    <div className={`w-full ${showImage ? 'md:w-2/3' : ''}`}>
                        <div className={`grid grid-cols-1 ${showImage ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 p-6`}>
                            {Object.entries(skills.categories).map(([category, items], index) => (
                                <div key={index} className="border p-4">
                                    <h3 className="font-bold mb-2">{category}</h3>
                                    <ul>
                                        {items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
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