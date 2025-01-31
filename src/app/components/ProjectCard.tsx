import React from 'react';

const ProjectCard: React.FC<{ title: string; description: string; tags: string; image: string; }> = ({ title, description, tags, image }) => {
    return (
        <div className="border border-gray-600 rounded overflow-hidden max-w-sm">
            <div className="bg-cover bg-center h-40" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="p-4">
                <div className="text-sm text-gray-400 mb-2">{tags}</div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-gray-300 mb-3">{description}</p>
                <div className="flex space-x-2">
                    <button className="bg-gray-700 text-white px-3 py-1 rounded">Live ↔</button>
                    <button className="bg-gray-700 text-white px-3 py-1 rounded">Cached &gt;</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;