"use client";
import React from 'react';
import { Blog } from '@/app/types';
import Image from "next/image";
import CodeHighlighter from "@/app/components/CodeHighlighter";

const BlogPageClient: React.FC<{ blog: Blog }> = ({ blog }) => {
    const formattedDate = new Date(blog.updated_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const modifyImageUrls = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        doc.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
                img.setAttribute('src', `${blog.cms_domain}${src}`);
            }
        });

        return doc.body.innerHTML;
    };

    return (
        <div className="bg-black text-white max-w-6xl mx-auto mt-24 mb-16 p-6">
            <a
                href={'/blogs'}
                className="inline-block my-9 px-4 py-2 bg-accent text-black font-semibold rounded hover:bg-accent-dark transition"
            >
                &larr; Back
            </a>

            <div className="w-full my-6">
                <Image
                    src={blog.hero_image.permalink}
                    alt={blog.hero_image.alt || 'Hero Image'}
                    width={1200}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
            </div>

            <h1 className="md:text-3xl text-lg text-left font-bold my-12 text-accent">{blog.title}</h1>

            <div className="flex flex-col md:flex-row">
                <div className="flex-1 mt-8 md:mt-0 max-w-full md:max-w-3xl mx-auto">
                    <CodeHighlighter className={'max-w-none'}>
                        <div
                            className="max-w-none"
                            dangerouslySetInnerHTML={{ __html: modifyImageUrls(blog.content) }}
                        />
                    </CodeHighlighter>
                </div>

                <aside className="md:w-1/6 md:ml-8 sticky top-0 space-y-8 mt-8 md:mt-0">
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
                        <p className="text-sm">{formattedDate}</p>
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