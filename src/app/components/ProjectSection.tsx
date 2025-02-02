"use client";
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from './ProjectCard';
import { highlightText } from "@/app/utils/textUtils";
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import data from '../../../public/data.json';
import { DataStructure } from '../types';

type ProjectSectionProps = {
    showAll?: boolean;
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ showAll = false }) => {
    const { language } = useLanguage();
    const jsonData = data as DataStructure;
    const projects = jsonData.content[language].projects;
    const labels = jsonData.content[language].labels;

    return (
        <div className="text-white p-8 py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                {!showAll && (
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-accent">#{labels.projects}</h2>
                        <AnimatedBorderTrail
                            className=" bg-zinc-600 hover:bg-zinc-500"
                            contentClassName=" bg-zinc-800"
                            trailColor="purple"
                        >
                            <button className=" px-3 py-1 text-xl text-white">
                                {highlightText(labels.viewAll)} →
                            </button>
                        </AnimatedBorderTrail>
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