export interface Image {
    id: string;
    url: string;
    permalink: string;
    api_url: string;
    alt: string | null;
}


export type Language = 'EN' | 'RO' | 'IT' | 'RU';




//////////
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
    page_builder: PageSection[];
}
///////////////////////////////////////
export interface HeroBannerSection {
    id: string;
    type: 'hero_section';
    title?: string;
    ru_title?: string;
    ro_title?: string;
    it_title?: string;
    button_label?: string;
    ru_button_label?: string;
    ro_button_label?: string;
    it_button_label?: string;
    link?: string;
    image?: Image;
    under_image_text?: string;
    ru_under_image_text?: string;
    ro_under_image_text?: string;
    it_under_image_text?: string;
}
///////////////////////////////////////
export interface Quote {
    id: string;
    title: string;
    author: string;
    url: string | null;
    permalink: string | null;
    api_url: string;
}

export interface QuoteSection {
    id: string;
    type: 'quote_section';
    quotes: Quote;
}

/////////////

export interface Project {
    id: string;
    api_url: string;
    title: string;
    description: string;
    tags: Tag[];
    image: string;
    link: string;
}

export interface Tag {
    id: string;
    title: string;
}

export interface ProjectsSection {
    type: 'projects_section';
    title?: string;
    button_label?: string;
    button_link?: string;
    projects: Project[];
}

///////////////////////////////////////
export interface SkillsSection {
    type: 'skills_section';
    image?: Image;
    title: string;
    ru_title: string;
    ro_title: string;
    it_title: string;
    skills: Skill[];
}

export interface Skill {
    id: string;
    title: string;
    api_url: string;
    tags: string[];
}

////////////////////////////////////

export interface AboutMeSection {
    type: 'about_me_section';
    title: string;
    ru_title: string;
    ro_title: string;
    it_title: string;
    description: string;
    ru_description: string;
    ro_description: string;
    it_description: string;
    button_label: string;
    ru_button_label: string;
    ro_button_label: string;
    it_button_label: string;
    link: string;
    image: Image;
}

////////////////////////////////////

export interface ContactSection {
    type: 'contact_section';
    title: string;
    ru_title: string;
    ro_title: string;
    it_title: string;
    description: string;
    ru_description: string;
    ro_description: string;
    it_description: string;
    contact_me_label: string;
    ru_contact_me_label: string;
    ro_contact_me_label: string;
    it_contact_me_label: string;
    discord: string;
    email: string;
}

//////
export interface ApiResponse {
    data: PageData[];
}

/////////

export interface AboutMeHeroBannerSection {
    type: 'about_me_long';
    title: string;
    ru_title: string;
    ro_title: string;
    it_title: string;
}

////////////////////////////////////

export interface Fact {
    id: string;
    title: string;
    api_url: string;
}

export interface FunFactsSection {
    type: 'fun_facts_section';
    title: string;
    ru_title: string;
    ro_title: string;
    it_title: string;
    facts: Fact[];
}