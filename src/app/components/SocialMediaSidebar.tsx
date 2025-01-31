import React from 'react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const SocialMediaSidebar: React.FC = () => {
    return (
        <div className="fixed top-0 left-3 h-full flex justify-center items-center">
            <div className="sticky top-0  flex flex-col justify-center items-center space-y-4">
                <div className="w-1 h-16 bg-white"></div>
                <a
                    href="https://github.com/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600"
                >
                    <GitHubIcon />
                </a>
                <a
                    href="https://linkedin.com/in/your-profile"
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