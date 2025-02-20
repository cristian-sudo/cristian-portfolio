import React from 'react';
import { Blog, BlogApiResponse} from '@/app/types';
import BlogPageClient from "@/app/pages/BlogPageClient";

type Params = Promise<{ slug: string }>;

interface BlogPageProps {
    params: Params;
}

const BlogPage: React.FC<BlogPageProps> = async ({ params }) => {
    try {
        const { slug } = await params;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/blogs/entries?filter[slug:is]=${slug}`, {
            cache: 'no-store',
        });

        const apiData: BlogApiResponse = await res.json();
        const blogData: Blog = apiData.data[0];
        blogData.cms_domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

        if (!blogData) {
            return <div>Blog not found</div>;
        }

        return <BlogPageClient blog={blogData} />;
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Error loading blog</div>;
    }
};

export default BlogPage;