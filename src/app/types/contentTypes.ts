// Common Interfaces
export interface BaseSection {
    id: string;
    type: string;
}

export interface LocalizedContent {
    title: string;
    ru_title?: string;
    ro_title?: string;
    it_title?: string;
}

export interface LocalizedDescription {
    description: string;
    ru_description?: string;
    ro_description?: string;
    it_description?: string;
}

export interface LocalizedButtonLabel {
    button_label: string;
    ru_button_label?: string;
    ro_button_label?: string;
    it_button_label?: string;
}

export interface Image {
    id: string;
    url: string;
    permalink: string;
    api_url: string;
    alt: string | null;
}

export type Language = 'EN' | 'RO' | 'IT' | 'RU';

// Page Section Types
export type PageSection =
    HeroBannerSection |
    QuoteSection |
    ProjectsSection |
    SkillsSection |
    AboutMeSection |
    ContactSection |
    AboutMeHeroBannerSection |
    FunFactsSection;

export interface PageData {
    slug: string;
    id: string;
    cms_domain?: string;
    page_builder: PageSection[];
}

// Specific Section Interfaces
export interface HeroBannerSection extends BaseSection, LocalizedContent, LocalizedButtonLabel {
    type: 'hero_section';
    link?: string;
    image?: Image;
    under_image_text?: string;
    ru_under_image_text?: string;
    ro_under_image_text?: string;
    it_under_image_text?: string;
}

export interface Quote {
    id: string;
    title: string;
    author: string;
    url: string | null;
    permalink: string | null;
    api_url: string;
}

export interface QuoteSection extends BaseSection {
    type: 'quote_section';
    quotes: Quote;
}

export interface Project {
    id: string;
    api_url: string;
    title: string;
    description: string;
    tags: Tag[];
    image: string;
    link: string;
    cms_domain?: string;
    more?: string;
}

export interface Tag {
    id: string;
    title: string;
}

export interface ProjectsSection extends BaseSection, LocalizedButtonLabel {
    type: 'projects_section';
    title?: string;
    cms_domain?: string;
    button_link?: string;
    projects: Project[];
}

export interface SkillsSection extends BaseSection, LocalizedContent {
    type: 'skills_section';
    image?: Image;
    skills: Skill[];
}

export interface Skill {
    id: string;
    title: string;
    api_url: string;
    tags: string[];
}

export interface AboutMeSection extends BaseSection, LocalizedContent, LocalizedDescription, LocalizedButtonLabel {
    type: 'about_me_section';
    link: string;
    image: Image;
}

export interface ContactSection extends BaseSection, LocalizedContent, LocalizedDescription {
    type: 'contact_section';
    contact_me_label: string;
    ru_contact_me_label?: string;
    ro_contact_me_label?: string;
    it_contact_me_label?: string;
    discord: string;
    email: string;
}

export interface ApiResponse {
    data: PageData[];
}

export interface AboutMeHeroBannerSection extends BaseSection, LocalizedContent {
    type: 'about_me_long';
}

export interface Fact {
    id: string;
    title: string;
    api_url: string;
}

export interface FunFactsSection extends BaseSection, LocalizedContent {
    type: 'fun_facts_section';
    facts: Fact[];
}

//////////////////
export interface Author {
    id: string;
    name: string;
    email: string;
    api_url: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    updated_at: string;
    hero_image: Image;
    blog_category: { slug: string, title: string }[];
    blog_tag: { slug: string, title: string }[];
    author: Author[]; // Update to reflect the array structure
}
