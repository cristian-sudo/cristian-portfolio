export type Language = 'EN' | 'RO';

export type FunFacts = {
    title: string;
    facts: string[];
};

export type NavLink = {
    href: string;
    label: string;
};

export type SkillsCategory = {
    [key: string]: string[];
};

export type Skills = {
    image: string;
    label: string;
    categories: SkillsCategory;
};

export type AboutSection = {
    buttonText: string;
    buttonLink: string;
    description: string;
    imageSrc: string;
    label: string;
    longDescription?: string;
};

export type HeroSection = {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    currentProject: string;
};

export type Quote = {
    text: string;
    author: string;
};

export type Project = {
    title: string;
    description: string;
    tags: string;
    image: string;
};

export type Labels = {
    projects: string;
    viewAll: string;
};

export type ContactSection = {
    label: string;
    description: string;
    discord: string;
    email: string;
};

export type FooterMedia = {
    icon: string;
    link: string;
};

export type Footer = {
    name: string;
    email: string;
    description: string;
    copyright: string;
    media: FooterMedia[];
};

export type Content = {
    myFunFacts?: FunFacts;
    navLinks: NavLink[];
    skills: Skills;
    aboutSection: AboutSection;
    heroSection: HeroSection;
    quote: Quote;
    projects: Project[];
    labels: Labels;
    contactSection: ContactSection;
    footer: Footer;
};

export type DataStructure = {
    languages: Language[];
    content: {
        [key in Language]: Content;
    };
};