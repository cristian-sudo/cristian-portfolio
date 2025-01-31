"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import GitHubIcon from './icons/GitHubIcon';
import DiscordIcon from './icons/DiscordIcon';

type FooterData = {
    name: string;
    email: string;
    description: string;
    copyright: string;
    media: { icon: string; link: string }[];
};

const Footer: React.FC = () => {
    const { language } = useLanguage();
    const [footerData, setFooterData] = useState<FooterData | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                if (data.content[language] && data.content[language].footer) {
                    setFooterData(data.content[language].footer);
                }
            })
            .catch(error => {
                console.error("Error fetching footer data:", error);
            });
    }, [language]);

    if (!footerData) {
        return <div>Loading...</div>;
    }

    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'GitHubIcon':
                return <GitHubIcon />;
            case 'DiscordIcon':
                return <DiscordIcon />;
            default:
                return null;
        }
    };

    return (
        <footer className="text-white py-8">
            <div className="w-full min-h-[2px] bg-accent mb-6"></div>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">{footerData.name}</h3>
                    <p>{footerData.email}</p>
                    <p className="text-gray-400">{footerData.description}</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">Media</h4>
                    <div className="flex space-x-4">
                        {footerData.media.map((mediaItem, index) => (
                            <a key={index} href={mediaItem.link} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                                {renderIcon(mediaItem.icon)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-4">
                {footerData.copyright}
            </div>
        </footer>
    );
};

export default Footer;