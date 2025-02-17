import React from 'react';
import HomePageClient from "@/app/HomePageClient";
import { ApiResponse } from "@/app/types";

const HomePage = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/pages/entries/home`, {
            cache: 'no-store',
        });
        const apiData: ApiResponse = await res.json();

        const homePageData = apiData.data;

        if (!homePageData) {
            return <div>Page not found</div>;
        }

        return <HomePageClient pageData={homePageData} />;
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading page</div>;
    }
};

export default HomePage;