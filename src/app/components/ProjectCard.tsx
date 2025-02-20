import React, { useEffect, useState } from "react";
import { Project, Tag } from "../types";
import { useLanguage } from "../context/LanguageContext";
import CodeHighlighter from "@/app/components/CodeHighlighter";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { language } = useLanguage();
    const [projectDetails, setProjectDetails] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                const moreKey = `${language.toLowerCase()}_more`;

                const localizedProject: Project = {
                    ...project,
                    title: data[titleKey] || data.title || project.title,
                    description: data[descriptionKey] || data.description || project.description,
                    more: data[moreKey] || data.more,
                    tags: (data.tags || []).map((tag: Tag) => ({
                        ...tag,
                        title: tag.title,
                    })),
                    image: data.image[0].permalink,
                    link: data.link,
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

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    if (!projectDetails) {
        return <div></div>;
    }

    const { title, description, tags, image, link, more } = projectDetails;
    const tagTitles = tags.map(tag => tag.title).join(", ");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const modifyImageUrls = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        doc.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
                img.setAttribute('src', `${project.cms_domain}${src}`);
            }
        });

        return doc.body.innerHTML;
    };

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
                    {more &&
                        <button
                            onClick={openModal}
                            className="bg-accent text-white px-4 py-2 rounded w-full sm:w-auto"
                        >
                            More
                        </button>
                    }
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeModal}
                >
                    <div
                        className="bg-gray-900 text-white w-11/12 max-w-4xl h-[70%] rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="text-4xl absolute top-4 right-4 text-gray-300 hover:text-accent bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-300 ease-in-out"
                        >
                            &times;
                        </button>
                        <div className="w-full lg:w-2/3 overflow-y-auto p-6 scrollbar-hide">
                            <div className="block lg:hidden mb-4">
                                <div className="h-[2px] mt-12 mb-3 w-full bg-accent"></div>
                                <ul className="list-disc list-inside text-gray-400">
                                    {tags.map((tag) => (
                                        <li key={tag.id}>{tag.title}</li>
                                    ))}
                                </ul>
                                <div className="h-[2px] my-3 w-full bg-accent"></div>
                            </div>
                            {typeof more === 'string' &&
                                <CodeHighlighter className={'max-w-none'}>
                                    <div
                                        className="max-w-none"
                                        dangerouslySetInnerHTML={{ __html: modifyImageUrls(more) }}
                                    />
                                </CodeHighlighter>
                            }
                        </div>
                        <div className="hidden lg:block w-1/3 bg-gray-800 p-4 border-l border-gray-700">
                            <div className="h-[2px] mt-12 mb-3 w-full bg-accent"></div>
                            <ul className="list-disc list-inside text-gray-400">
                                {tags.map((tag) => (
                                    <li key={tag.id}>{tag.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;