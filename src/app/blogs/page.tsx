import React from 'react';
import BlogsPageClient from "@/app/pages/BlogsPageClient";

export const dynamic = 'force-dynamic';

const BlogsPage = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/blogs/entries`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const blogsData = await res.json();

        return <BlogsPageClient blogs={blogsData.data} />;
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading page</div>;
    }
};

export default BlogsPage;