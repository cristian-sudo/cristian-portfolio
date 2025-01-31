"use client";
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from './ProjectCard';

type Project = {
    title: string;
    description: string;
    tags: string;
    image: string;
};

type ProjectSectionProps = {
    showAll?: boolean;
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ showAll = false }) => {
    const { language } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);
    const [labels, setLabels] = useState<{ projects: string; viewAll: string }>({ projects: '', viewAll: '' });

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setProjects(data.content[language].projects);
                setLabels(data.content[language].labels);
            });
    }, [language]);

    return (
        <div className="text-white p-8 py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                {!showAll && (
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-accent">#{labels.projects}</h2>
                        <a href="#" className="text-white">{labels.viewAll} &rarr;</a>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.slice(0, showAll ? projects.length : 3).map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            image={project.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;