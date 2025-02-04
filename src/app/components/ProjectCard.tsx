import React from "react";

const ProjectCard: React.FC<{ title: string; description: string; tags: string; image: string; link:string; }> =
    ({title, description, tags, image, link}) => {
    return (
        <div className="border border-gray-600 rounded-b-lg overflow-hidden shadow-lg bg-gray-800">
            <div className="h-40 sm:h-48 w-full bg-cover bg-center"
                 style={{
                     backgroundImage: `url(${image})`,
                     backgroundSize: 'calc(100% - 20px)',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className="p-4 text-center sm:text-left">
                <div className="text-xs text-gray-400 mb-2">{tags}</div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-gray-300 mb-3">{description}</p>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2">
                    <a href={link} target={"_blank"} className="bg-gray-700 text-white px-4 py-2 rounded w-full sm:w-auto">
                        Live ↔
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
