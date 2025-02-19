// src/app/BlogPageClient.tsx
"use client";
import React from 'react';
import { Blog } from '@/app/types';
import Image from "next/image";

const BlogPageClient: React.FC<{ blog: Blog }> = ({ blog }) => {
    return (
        <div className="bg-black text-white max-w-6xl mx-auto mt-24 mb-16 p-6">
            {/* Back Button */}
            <a
                href={'/blogs'}
                className="inline-block mb-6 px-4 py-2 bg-accent text-black font-semibold rounded hover:bg-accent-dark transition"
            >
                &larr; Back
            </a>

            {/* Hero Image */}
            <div className="w-full mb-6">
                <Image
                    src={blog.hero_image.permalink}
                    alt={blog.hero_image.alt || 'Hero Image'}
                    width={1200} // Set a consistent width
                    height={400} // Set a consistent height
                    className="w-full h-64 object-cover rounded-lg shadow-lg" // Use h-64 for a fixed height
                />
            </div>

            {/* Blog Title */}
            <h1 className="text-3xl font-bold mb-8 text-center">{blog.title}</h1>

            <div className="flex flex-col md:flex-row">
                {/* Blog Content */}
                <div className="flex-1 mt-8 md:mt-0">
                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* Sidebar */}
                <aside className="md:w-1/4 md:ml-8 sticky top-0 space-y-8 mt-8 md:mt-0">
                    <div className="border-l-4 border-accent pl-4">
                        <h2 className="text-accent font-bold mb-2">Author</h2>
                        <ul className="space-y-1">
                            {blog.author.map((author) => (
                                <li key={author.id} className="text-sm">{author.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                        <h2 className="text-accent font-bold mb-2">Date</h2>
                        <p className="text-sm">{new Date(blog.updated_at).toLocaleDateString()}</p>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                        <h2 className="text-accent font-bold mb-2">Categories</h2>
                        <ul className="space-y-1">
                            {blog.blog_category.map((category) => (
                                <li key={category.slug} className="text-sm">{category.title}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                        <h2 className="text-accent font-bold mb-2">Tags</h2>
                        <ul className="space-y-1">
                            {blog.blog_tag.map((tag) => (
                                <li key={tag.slug} className="text-sm">{tag.title}</li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BlogPageClient;