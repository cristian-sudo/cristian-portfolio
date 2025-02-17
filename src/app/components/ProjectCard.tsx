"use client";

import React, { useEffect, useState } from "react";
import { Project, Tag } from "../types";
import { useLanguage } from "../context/LanguageContext";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { language } = useLanguage();
    const [projectDetails, setProjectDetails] = useState<Project | null>(null);

    useEffect(() => {
        const fetchLocalizedData = async () => {
            try {
                const response = await fetch(project.api_url);
                if (!response.ok) {
                    throw new Error("Failed to fetch project details");
                }
                const result = await response.json();
                const data = result.data;

                const titleKey = `${language.toLowerCase()}_title`;
                const descriptionKey = `${language.toLowerCase()}_description`;

                const localizedProject: Project = {
                    ...project,
                    title: data[titleKey] || data.title || project.title,
                    description: data[descriptionKey] || data.description || project.description,
                    tags: (data.tags || []).map((tag: Tag) => ({
                        ...tag,
                        title: tag.title,
                    })),
                    image: data.image[0].permalink,
                };

                setProjectDetails(localizedProject);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchLocalizedData().catch(error => {
            console.error('Error in fetchLocalizedData:', error);
        });
    }, [language, project]);

    if (!projectDetails) {
        return <div>Loading...</div>;
    }

    const { title, description, tags, image, link } = projectDetails;
    const tagTitles = tags.map(tag => tag.title).join(", ");

    return (
        <div className="border border-gray-600 rounded-b-lg overflow-hidden shadow-lg bg-gray-800">
            <div
                className="h-40 sm:h-48 w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'calc(100% - 20px)',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            ></div>
            <div className="p-4 text-center sm:text-left">
                <div className="text-xs text-gray-400 mb-2">{tagTitles}</div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-gray-300 mb-3">{description}</p>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 text-white px-4 py-2 rounded w-full sm:w-auto"
                    >
                        Live ↔
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;