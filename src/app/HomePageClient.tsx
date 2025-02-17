"use client";

import React from 'react';
import componentMap from "@/app/componentMap";
import {PageData, PageSection, ProjectsSection, QuoteSection} from "@/app/types";
import { HeroBannerSection } from './types';

interface HomePageClientProps {
    pageData: PageData;
}

const isHeroBannerSection = (section: PageSection): section is HeroBannerSection => section.type === 'hero_section';

const isQuoteSection = (section: PageSection): section is QuoteSection => section.type === 'quote_section';

const isProjectSection = (section: PageSection): section is ProjectsSection => section.type === 'projects_section';

const HomePageClient: React.FC<HomePageClientProps> = ({ pageData }) => {
    if (!pageData || !pageData.page_builder) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {pageData.page_builder.map((section, index) => {
                if (isHeroBannerSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                } else if (isQuoteSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                } else if (isProjectSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} section={section} />;
                    }
                }
                return null;
            })}
        </div>
    );
};

export default HomePageClient;