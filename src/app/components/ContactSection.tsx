import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import DiscordIcon from "@/app/components/icons/DiscordIcon";
import { ContactSection as ContactSectionType } from "../types";

function getLocalizedTitle(section: ContactSectionType, language: string): string {
    const key = `${language}_title`;
    return ((section as unknown) as Record<string, string>)[key] || section.title;
}

function getLocalizedDescription(section: ContactSectionType, language: string): string {
    const key = `${language}_description`;
    return ((section as unknown) as Record<string, string>)[key] || section.description;
}

function getLocalizedContactMeLabel(section: ContactSectionType, language: string): string {
    const key = `${language}_contact_me_label`;
    return ((section as unknown) as Record<string, string>)[key] || section.contact_me_label;
}

const ContactSection: React.FC<ContactSectionType> = (section) => {
    const { language } = useLanguage();
    const [contactInfo, setContactInfo] = useState<ContactSectionType | null>(null);

    useEffect(() => {
        const localizedTitle = getLocalizedTitle(section, language.toLowerCase());
        const localizedDescription = getLocalizedDescription(section, language.toLowerCase());
        const localizedContactMeLabel = getLocalizedContactMeLabel(section, language.toLowerCase());

        const updatedContactInfo: ContactSectionType = {
            ...section,
            title: localizedTitle,
            description: localizedDescription,
            contact_me_label: localizedContactMeLabel,
        };

        setContactInfo(updatedContactInfo);
    }, [language, section]);

    if (!contactInfo) {
        return null;
    }

    return (
        <div className="p-6 py-12 my-6">
            <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold text-accent mb-4">#{contactInfo.title}</h2>
                    <p className="text-lg">{contactInfo.description}</p>
                </div>

                <div className="w-full md:w-1/3 border p-6 rounded-lg shadow-md ml:0 md:ml-6">
                    <h3 className="font-bold mb-4">{contactInfo.contact_me_label}</h3>
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                            <DiscordIcon />
                            <span>{contactInfo.discord}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;