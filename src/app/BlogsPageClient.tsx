"use client";

import React, { useState } from 'react';
import { Image as TypedImage } from "@/app/types";
import Image from "next/image";

interface Author {
    id: string;
    name: string;
    email: string;
    api_url: string;
}

interface Blog {
    id: string;
    title: string;
    content: string;
    updated_at: string;
    hero_image: TypedImage;
    blog_category: { slug: string, title: string }[];
    blog_tag: { slug: string, title: string }[];
    author: Author[]; // Update to reflect the array structure
}

interface BlogsPageClientProps {
    blogs: Blog[];
}

const BlogsPageClient: React.FC<BlogsPageClientProps> = ({ blogs }) => {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const blogsPerPage = 6;

    // Extract unique categories and tags with titles
    const uniqueCategories = Array.from(new Set(blogs.flatMap(blog => blog.blog_category.map(category => category.slug))));
    const uniqueTags = Array.from(new Set(blogs.flatMap(blog => blog.blog_tag.map(tag => tag.slug))));

    const categoryTitles = blogs.reduce((acc, blog) => {
        blog.blog_category.forEach(category => {
            acc[category.slug] = category.title;
        });
        return acc;
    }, {} as Record<string, string>);

    const tagTitles = blogs.reduce((acc, blog) => {
        blog.blog_tag.forEach(tag => {
            acc[tag.slug] = tag.title;
        });
        return acc;
    }, {} as Record<string, string>);

    const applyFilters = () => {
        let updatedBlogs = blogs;

        if (searchQuery) {
            updatedBlogs = updatedBlogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            updatedBlogs = updatedBlogs.filter(blog =>
                blog.blog_category.some(category => selectedCategories.includes(category.slug))
            );
        }

        if (selectedTags.length > 0) {
            updatedBlogs = updatedBlogs.filter(blog =>
                blog.blog_tag.some(tag => selectedTags.includes(tag.slug))
            );
        }

        updatedBlogs.sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
            } else {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }
        });

        setFilteredBlogs(updatedBlogs);
    };

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(c => c !== category)
                : [...prevCategories, category]
        );
    };

    const handleTagChange = (tag: string) => {
        setSelectedTags(prevTags =>
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag)
                : [...prevTags, tag]
        );
    };

    const handleApplyFilters = () => {
        applyFilters();
        setShowFilters(false);
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedTags([]);
        setSearchQuery('');
        setSortOrder('desc');
        setCurrentPage(1);
        setFilteredBlogs(blogs);
        setShowFilters(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-36 mb-16 text-black">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className="relative">
                    <button
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                        Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                    </button>
                    {showSortDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOrder === 'desc' ? 'bg-gray-100' : ''}`}
                                onClick={() => {
                                    setSortOrder('desc');
                                    setShowSortDropdown(false);
                                    applyFilters();
                                }}
                            >
                                Newest First
                            </button>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOrder === 'asc' ? 'bg-gray-100' : ''}`}
                                onClick={() => {
                                    setSortOrder('asc');
                                    setShowSortDropdown(false);
                                    applyFilters();
                                }}
                            >
                                Oldest First
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={`transition-all duration-300 ${showFilters ? 'max-h-96' : 'max-h-0'} overflow-hidden`}
            >
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex flex-wrap gap-3">
                        <div className="flex flex-col text-white">
                            <h3 className="font-semibold">Categories</h3>
                            {uniqueCategories.map((category) => (
                                <label key={category} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2">{categoryTitles[category]}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex flex-col text-white">
                            <h3 className="font-semibold">Tags</h3>
                            {uniqueTags.map((tag) => (
                                <label key={tag} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value={tag}
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleTagChange(tag)}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2">{tagTitles[tag]}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {(selectedCategories.length > 0 ||
                        selectedTags.length > 0 ||
                        searchQuery) && (
                        <div className="flex gap-4">
                            <button
                                onClick={handleApplyFilters}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={handleResetFilters}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((blog) => (
                    <a
                        href={`/blog/${blog.id}`}
                        key={blog.id}
                        className="block bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="h-56">
                            <Image
                                src={blog.hero_image.permalink}
                                alt={blog.hero_image.alt || blog.title}
                                width={400}
                                height={250}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-1">{blog.title}</h2>
                            <p className="text-gray-500 text-sm mb-1">
                                By {blog.author[0].name} |{' '}
                                {new Date(blog.updated_at).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </p>
                            <div className="flex flex-wrap gap-1 text-sm text-blue-500">
                                {blog.blog_category.map((category) => (
                                    <span key={category.slug} className="mr-2">
                  {category.title}
                </span>
                                ))}
                                {blog.blog_tag.map((tag) => (
                                    <span key={tag.slug} className="mr-2">
                  {tag.title}
                </span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className={'text-white'}>
        Page {currentPage} of {totalPages}
      </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogsPageClient;