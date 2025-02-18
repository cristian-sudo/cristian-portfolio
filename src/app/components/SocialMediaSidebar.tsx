"use client";

import React, { useEffect, useState } from 'react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

// Define the structure of the fetched data
interface SocialMediaData {
    github: string;
    linkedin: string;
}

const SocialMediaSidebar: React.FC = () => {
    const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaData | null>(null);

    useEffect(() => {
        const fetchSocialMediaLinks = async () => {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/globals/social_media_side_banner`);
                const result = await response.json();
                setSocialMediaLinks(result.data);
            } catch (error) {
                console.error('Failed to fetch social media links:', error);
            }
        };

        fetchSocialMediaLinks();
    }, []);

    if (!socialMediaLinks) {
        return null;
    }

    return (
        <div className="fixed top-0 left-3 h-full justify-center items-center hidden md:flex">
            <div className="sticky top-0 flex flex-col justify-center items-center space-y-4">
                <div className="w-1 h-16 bg-white"></div>
                <a
                    href={socialMediaLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600"
                >
                    <GitHubIcon />
                </a>
                <a
                    href={socialMediaLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600"
                >
                    <LinkedInIcon />
                </a>
                <div className="w-1 h-16 bg-white"></div>
            </div>
        </div>
    );
};

export default SocialMediaSidebar;