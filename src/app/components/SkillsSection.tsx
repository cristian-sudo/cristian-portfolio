"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import data from '../../../public/data.json';
import { DataStructure, Skills } from '../types';

type SkillsSectionProps = {
    showImage?: boolean;
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ showImage = true }) => {
    const { language } = useLanguage();
    const jsonData = data as DataStructure;
    const skills: Skills | null = jsonData.content[language]?.skills || null;

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