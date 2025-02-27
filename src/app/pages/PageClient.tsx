"use client";

import React from 'react';
import componentMap from "@/app/componentMap";
import {
    AboutMeHeroBannerSection,
    AboutMeSection,
    ContactSection, FunFactsSection,
    PageData,
    PageSection,
    ProjectsSection,
    QuoteSection,
    SkillsSection
} from "@/app/types";
import { HeroBannerSection } from '../types';
import LocalNavigation from "@/app/components/LocalNavigation";
import Contact from "@/app/components/Contact";

interface ClientPageProps {
    pageData: PageData;
}

const isHeroBannerSection = (section: PageSection): section is HeroBannerSection => section.type === 'hero_section';

const isQuoteSection = (section: PageSection): section is QuoteSection => section.type === 'quote_section';

const isProjectSection = (section: PageSection): section is ProjectsSection => section.type === 'projects_section';

const isSkillsSection = (section: PageSection): section is SkillsSection => section.type === 'skills_section';

const isAboutMeSection = (section: PageSection): section is AboutMeSection => section.type === 'about_me_section';

const isContactSection = (section: PageSection): section is ContactSection => section.type === 'contact_section';

const isAboutMeHeroBannerSection = (section: PageSection): section is AboutMeHeroBannerSection => section.type === 'about_me_long';

const isFunFactsSection = (section: PageSection): section is FunFactsSection => section.type === 'fun_facts_section';


const PageClient: React.FC<ClientPageProps> = ({ pageData }) => {
    if (!pageData || !pageData.page_builder) {
        return <div></div>;
    }

    return (
        <div>
            {pageData.slug !== 'home' &&
                <LocalNavigation routeName={ pageData.slug} />
            }
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
                        section.cms_domain = pageData.cms_domain;
                        return <Component key={index} section={section} />;
                    }
                } else if (isSkillsSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                } else if (isAboutMeSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                } else if (isContactSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                } else if (isAboutMeHeroBannerSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                } else if (isFunFactsSection(section)) {
                    const Component = componentMap[section.type];
                    if (Component) {
                        return <Component key={index} {...section} />;
                    }
                }
                return null;
            })}
            {pageData.slug !== 'contact' &&
                <Contact />
            }
        </div>
    );
};

export default PageClient;