import React from 'react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const SocialMediaSidebar: React.FC = () => {
    return (
        <div className="fixed top-0 left-3 h-full justify-center items-center hidden md:flex">
            <div className="sticky top-0  flex flex-col justify-center items-center space-y-4">
                <div className="w-1 h-16 bg-white"></div>
                <a
                    href="https://github.com/cristian-sudo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600"
                >
                    <GitHubIcon />
                </a>
                <a
                    href="https://www.linkedin.com/in/cristian-plop-39572121b/"
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