// app/[slug]/page.tsx
import React from 'react';
import PageClient from "@/app/PageClient";
import { ApiResponse } from "@/app/types";

const DynamicPage = async ({ params }: { params: { slug: string } }) => {
    try {
        const { slug } = params;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/pages/entries?filter[slug:is]=${slug}`, {
            cache: 'no-store',
        });
        const apiData: ApiResponse = await res.json();

        const pageData = apiData.data[0];

        if (!pageData) {
            return <div>Page not found</div>;
        }

        return <PageClient pageData={pageData} />;
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading page</div>;
    }
};

export default DynamicPage;