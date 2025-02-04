"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import DiscordIcon from "@/app/components/icons/DiscordIcon";
import EmailIcon from "@/app/components/icons/EmailIcon";
import data from "../../../public/data.json";
import { DataStructure, ContactSection as ContactSectionType } from "../types";

const ContactSection: React.FC = () => {
    const { language } = useLanguage();
    const [contactInfo, setContactInfo] = useState<ContactSectionType | null>(null);

    useEffect(() => {
        const contentData: DataStructure = data as DataStructure;
        const fetchedContactInfo: ContactSectionType | undefined = contentData.content[language]?.contactSection;
        setContactInfo(fetchedContactInfo || null);
    }, [language]);

    if (!contactInfo) {
        return <div className="text-center py-10">Loading...</div>; // Display a loading state while fetching data
    }

    return (
        <div className="p-6 py-12 my-6">
            <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold text-accent mb-4">#{contactInfo.label}</h2>
                    <p className="text-lg">{contactInfo.description}</p>
                </div>

                <div className="w-full md:w-1/3 border p-6 rounded-lg shadow-md ml:0 md:ml-6">
                    <h3 className="font-bold mb-4">{contactInfo.contactMeText}</h3>
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                            <DiscordIcon />
                            <span>{contactInfo.discord}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <EmailIcon />
                            <span>{contactInfo.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;