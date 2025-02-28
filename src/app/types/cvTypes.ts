import {JSX} from "react";

export interface ImageType {
    id: string;
    url: string;
    alt: string | null;
}

export interface ChangelogEntry {
    year: string;
    content: string;
    ru_content: string;
    it_content: string;
    ro_content: string;
    images: ImageType[];
}

export interface TransformedTimelineEntry {
    year: string;
    content: JSX.Element;
    title: string | undefined;
    subtitle: string | undefined;
}

export interface CvData {
    changelog: ChangelogEntry[];
    title: string;
    ru_title: string;
    it_title: string;
    ro_title: string;
    subtitle: string;
    ru_subtitle: string;
    it_subtitle: string;
    ro_subtitle: string;
}

export interface ApiCVResponse {
    data: CvData;
}

export interface HeroSection {
    title?: string;
    ru_title?: string;
    it_title?: string;
    ro_title?: string;
    subtitle?: string;
    ru_subtitle?: string;
    it_subtitle?: string;
    ro_subtitle?: string;
}

export interface TimelineEntry {
    year: string;
    content: string;
    images: ImageType[];
}

export interface CvPageClientProps {
    data: TimelineEntry[];
    domain?: string;
    heroSection: HeroSection;
}