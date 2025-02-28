import React from "react";
import CvPageClient from "@/app/pages/CvPageClient";
import {ApiCVResponse, HeroSection} from "@/app/types";

export const dynamic = 'force-dynamic';

const CvPage = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/globals/cv`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const cvData: ApiCVResponse = await res.json();

        const transformedData = cvData.data.changelog.map(entry => ({
            year: entry.year,
            content: entry.content,
            ru_content: entry.ru_content,
            it_content: entry.it_content,
            ro_content: entry.ro_content,
            images: entry.images,
        }));

        const headerSection: HeroSection = {
            title: cvData.data.title,
            ru_title: cvData.data.ru_title,
            ro_title: cvData.data.ro_title,
            it_title: cvData.data.it_title,
            subtitle: cvData.data.subtitle,
            ru_subtitle: cvData.data.ru_subtitle,
            ro_subtitle: cvData.data.ro_subtitle,
            it_subtitle: cvData.data.it_subtitle,
        };

        return <CvPageClient data={transformedData} heroSection={headerSection} domain={process.env.NEXT_PUBLIC_BACKEND_DOMAIN} />;
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading page</div>;
    }
};

export default CvPage;