export interface Image {
    id: string;
    url: string;
    permalink: string;
    api_url: string;
    alt: string | null;
}


export type Language = 'EN' | 'RO' | 'IT' | 'RU';




//////////
export type PageSection = HeroBannerSection | QuoteSection | ProjectsSection;

export interface PageData {
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