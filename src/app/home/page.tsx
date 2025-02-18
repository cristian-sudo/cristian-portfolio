import React from 'react';
import PageClient from "@/app/PageClient";
import { ApiResponse } from "@/app/types";

const HomePage = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/pages/entries?filter[slug:is]=home`, {
            cache: 'no-store',
        });
        const apiData: ApiResponse = await res.json();

        const homePageData = apiData.data[0];

        if (!homePageData) {
            return <div>Page not found</div>;
        }

        return <PageClient pageData={homePageData} />;
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading page</div>;
    }
};

export default HomePage;