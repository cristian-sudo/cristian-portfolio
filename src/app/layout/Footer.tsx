"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import GitHubIcon from '../components/icons/GitHubIcon';
import DiscordIcon from '../components/icons/DiscordIcon';

interface FooterData {
    discord: string;
    email: string;
    github: string;
    it_job_title: string;
    it_media_label: string;
    job_title: string;
    media_label: string;
    name: string;
    ro_job_title: string;
    ro_media_label: string;
    ru_job_title: string;
    ru_media_label: string;
}

const Footer: React.FC = () => {
    const { language } = useLanguage();
    const [footerData, setFooterData] = useState<FooterData | null>(null);
    const getLocalizedJobTitle = (data: FooterData, language: string): string => {
        const key = `${language}_job_title`;
        return ((data as unknown) as Record<string, string>)[key] || data.job_title;
    };
    const getLocalizedMediaLabel = (data: FooterData, language: string): string => {
        const key = `${language}_media_label`;
        return ((data as unknown) as Record<string, string>)[key] || data.media_label;
    };

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/globals/footer`);
                const result = await response.json();
                setFooterData(result.data);
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            }
        };

        fetchFooterData().catch(error => {
            console.error('Error in fetchFooterData:', error);
        });
    }, []);

    if (!footerData) {
        return null;
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
                    <p className="text-gray-400">{getLocalizedJobTitle(footerData, language.toLowerCase())}</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-2">{getLocalizedMediaLabel(footerData, language.toLowerCase())}</h4>
                    <div className="flex space-x-4">
                        <a href={footerData.github} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                            {renderIcon('GitHubIcon')}
                        </a>
                        <a href={footerData.discord} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                            {renderIcon('DiscordIcon')}
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-4">
                © {new Date().getFullYear()} {footerData.name}
            </div>
        </footer>
    );
};

export default Footer;