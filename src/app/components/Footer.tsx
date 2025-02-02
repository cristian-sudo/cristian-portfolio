"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import GitHubIcon from './icons/GitHubIcon';
import DiscordIcon from './icons/DiscordIcon';
import data from '../../../public/data.json';
import { Footer as FooterType } from '../types';

const Footer: React.FC = () => {
    const { language } = useLanguage();
    const contentData: { content: Record<string, { footer: FooterType }> } = data as any;
    const footerData: FooterType | undefined = contentData.content[language]?.footer;

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