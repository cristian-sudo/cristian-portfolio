"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import data from "../../../public/data.json";
import { DataStructure, Skills } from "../types";
import Image from "next/image";

type SkillsSectionProps = {
    showImage?: boolean;
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ showImage = true }) => {
    const { language } = useLanguage();
    const [skills, setSkills] = useState<Skills | null>(null);

    useEffect(() => {
        const jsonData = data as DataStructure;
        const fetchedSkills = jsonData.content[language]?.skills || null;
        setSkills(fetchedSkills);
    }, [language]);

    if (!skills) {
        return null;
    }

    return (
        <div className="py-12 my-6">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-bold text-accent text-center md:text-left mb-6">
                    #{skills.label}
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {showImage && (
                        <div className="w-full md:w-1/3 flex justify-center">
                            <Image
                                src={skills.image}
                                width={400}
                                height={400}
                                alt="Skills"
                                className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    <div className={`w-full ${showImage ? "md:w-2/3" : ""}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                            {Object.entries(skills.categories).map(([category, items], index) => (
                                <div key={index} className="border p-4">
                                    <h3 className="font-bold mb-2 text-center">{category}</h3>
                                    <ul className="text-center">
                                        {items.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-300">{item}</li>
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