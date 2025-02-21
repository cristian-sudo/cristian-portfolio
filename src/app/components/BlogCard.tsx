import React from 'react';
import { Blog } from "@/app/types";
import Image from "next/image";

interface BlogCardProps {
    blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <a
            href={`/blogs/${blog.slug}`}
            className="relative block bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-gray-800 group"
        >
            <div className="h-56">
                <Image
                    src={blog.hero_image.permalink}
                    alt={blog.hero_image.alt || blog.title}
                    width={400}
                    height={250}
                    priority={true}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold my-6 text-white">{blog.title}</h2>
                <p className="text-white text-sm mb-3">
                    By {blog.author[0].name} |{' '}
                    {new Date(blog.updated_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })}
                </p>
                <div className="flex flex-wrap gap-2">
                    {blog.blog_category.map(category => (
                        <span key={category.slug} className="bg-purple-900 text-white px-2 py-1 rounded-full text-xs">
                            {category.title}
                        </span>
                    ))}
                    {blog.blog_tag.map(tag => (
                        <span key={tag.slug} className="bg-black text-white px-2 py-1 rounded-full text-xs">
                            {tag.title}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
        </a>
    );
};

export default BlogCard;