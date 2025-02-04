"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import ProjectCard from "./ProjectCard";
import { highlightText } from "@/app/utils/textUtils";
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import data from "../../../public/data.json";
import { DataStructure, Project, Labels } from "../types";

type ProjectSectionProps = {
    showAll?: boolean;
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ showAll = false }) => {
    const { language } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);
    const [labels, setLabels] = useState<Labels>({ projects: '', viewAll: '' });

    useEffect(() => {
        const jsonData = data as DataStructure;
        const fetchedProjects = jsonData.content[language]?.projects || [];
        const fetchedLabels = jsonData.content[language]?.labels || { projects: '', viewAll: '' };
        setProjects(fetchedProjects);
        setLabels(fetchedLabels);
    }, [language]);

    return (
        <div className="py-12 my-6">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-bold text-accent mb-6 text-center md:text-left">
                    #{labels.projects}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {projects.slice(0, showAll ? projects.length : 3).map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            image={project.image}
                            link={project.link}
                        />
                    ))}
                </div>

                {!showAll && (
                    <div className="mt-6 flex justify-center md:hidden">
                        <AnimatedBorderTrail
                            className="bg-zinc-600 hover:bg-zinc-500"
                            contentClassName="bg-zinc-800"
                            trailColor="purple"
                        >
                            <a href={"/projects"} className="px-4 py-2 text-lg font-bold">
                                {highlightText(labels.viewAll)} →
                            </a>
                        </AnimatedBorderTrail>
                    </div>
                )}
                {!showAll && (
                    <div className="hidden md:flex justify-end mt-6">
                        <AnimatedBorderTrail
                            className=" bg-zinc-600 hover:bg-zinc-500"
                            contentClassName=" bg-zinc-800"
                            trailColor="red"
                        >
                            <a href={'/projects'} className=" px-3 text-2xl">
                                {highlightText(labels.viewAll)} →
                            </a>
                        </AnimatedBorderTrail>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectSection;