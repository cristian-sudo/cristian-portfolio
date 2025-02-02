"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import DiscordIcon from "@/app/components/icons/DiscordIcon";
import EmailIcon from "@/app/components/icons/EmailIcon";
import data from '../../../public/data.json';
import { DataStructure, ContactSection as ContactSectionType } from '../types';

const ContactSection: React.FC = () => {
    const { language } = useLanguage();
    const contentData: DataStructure = data as DataStructure;
    const contactInfo: ContactSectionType | undefined = contentData.content[language]?.contactSection;

    if (!contactInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white p-8 py-16 my-6">
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold text-accent mb-6">
                        #{contactInfo.label}
                    </h2>
                    <p className="text-gray-400">{contactInfo.description}</p>
                </div>
                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <div className="border p-4 text-center">
                        <h3 className="font-bold mb-4">Message me here</h3>
                        <div className="flex items-center justify-center mb-2 gap-3">
                            <DiscordIcon />
                            <span className="text-gray-300">{contactInfo.discord}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <EmailIcon />
                            <span className="text-gray-300">{contactInfo.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;