"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import ProjectCard from "./ProjectCard";
import { highlightText } from "@/app/utils/textUtils";
import AnimatedBorderTrail from "@/app/components/animata/container/animated-border-trail";
import { ProjectsSection as ProjectSectionType } from "../types";

const ProjectsSection: React.FC<{ section: ProjectSectionType }> = ({ section }) => {
    const { language } = useLanguage();
    const [localizedContent, setLocalizedContent] = useState({
        title: section.title || "Default Title",
        buttonLabel: section.button_label || "Default Button Label"
    });

    useEffect(() => {
        const languageSelected = language.toLowerCase();
        const titleKey = `${languageSelected}_title` as keyof ProjectSectionType;
        const buttonLabelKey = `${languageSelected}_button_label` as keyof ProjectSectionType;

        setLocalizedContent({
            title: (section[titleKey] || section.title || "Default Title") as string,
            buttonLabel: (section[buttonLabelKey] || section.button_label || "Default Button Label") as string
        });
    }, [language, section]);

    return (
        <div className="py-12 my-6">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl font-bold text-accent mb-6 text-center md:text-left">
                    #{localizedContent.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {section.projects &&
                        section.projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    }
                </div>

                <div className="mt-6 flex justify-center md:hidden">
                    <AnimatedBorderTrail
                        className="bg-zinc-600 hover:bg-zinc-500"
                        contentClassName="bg-zinc-800"
                        trailColor="purple"
                    >
                        <a href={section.button_link} className="px-4 py-2 text-lg font-bold">
                            {highlightText(localizedContent.buttonLabel)} →
                        </a>
                    </AnimatedBorderTrail>
                </div>
                <div className="hidden md:flex justify-end mt-6">
                    <AnimatedBorderTrail
                        className=" bg-zinc-600 hover:bg-zinc-500"
                        contentClassName=" bg-zinc-800"
                        trailColor="red"
                    >
                        <a href={section.button_link} className=" px-3 text-2xl">
                            {highlightText(localizedContent.buttonLabel)} →
                        </a>
                    </AnimatedBorderTrail>
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;