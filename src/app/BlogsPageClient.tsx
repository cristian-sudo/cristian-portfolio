"use client"

import React, { useState, useEffect } from 'react';
import { Blog } from "@/app/types";
import BlogCard from "@/app/components/BlogCard";

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
    const blogsPerPage = 6;

    const uniqueCategories = Array.from(new Set(blogs.flatMap(blog => blog.blog_category.map(category => category.slug)))).sort();
    const uniqueTags = Array.from(new Set(blogs.flatMap(blog => blog.blog_tag.map(tag => tag.slug)))).sort();

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

    useEffect(() => {
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
            return sortOrder === 'asc'
                ? new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
                : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        setFilteredBlogs(updatedBlogs);
        setCurrentPage(1); // Reset page to 1 when filters, search, or sort order changes
    }, [searchQuery, selectedCategories, selectedTags, sortOrder, blogs]);

    useEffect(() => {
        // Scroll to the top whenever the current page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handlePageChange = (direction: "next" | "prev") => {
        setCurrentPage(prevPage => {
            const newPage = direction === "next" ? prevPage + 1 : prevPage - 1;
            if (newPage >= 1 && newPage <= totalPages) {
                return newPage;
            }
            return prevPage;
        });
    };

    const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSelectedTags([]);
        setSearchQuery('');
        setSortOrder('desc');
        setCurrentPage(1);
        setFilteredBlogs(blogs);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-36 mb-16 text-white">
            <div className="flex justify-end items-center mb-8">
                <div className="flex items-center gap-4">
                    <span className="text-sm">Sort by Date:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={sortOrder === 'asc'}
                            onChange={() => {
                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                setCurrentPage(1); // Reset page to 1 when sort order changes
                            }}
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent peer dark:bg-gray-700 peer-checked:bg-accent transition-all duration-200 ease-in-out"></div>
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform peer-checked:translate-x-5"></span>
                    </label>
                    <span className="ml-3 text-sm font-medium">{sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}</span>
                </div>
            </div>

            <div className="flex gap-8">
                <div className="w-1/4 sticky top-[90px] h-full">
                    <div className="flex items-center mb-9 w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 w-full border border-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 ease-in-out bg-gray-800 text-white"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset page to 1 when search query changes
                            }}
                        />
                        <button className="bg-accent text-white px-3 py-2 rounded-r-md hover:bg-opacity-80 transition-all duration-200 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-md shadow-md">
                        <h3 className="font-semibold mb-4 text-accent">Filters</h3>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h4 className="text-accent">Categories</h4>
                                <ul className="mt-2 list-none">
                                    {uniqueCategories.map(item => (
                                        <li key={item}>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    checked={selectedCategories.includes(item)}
                                                    onChange={() => handleFilterChange(setSelectedCategories, item)}
                                                    className="form-checkbox h-4 w-4 text-accent"
                                                />
                                                <span className="ml-2">{categoryTitles[item]}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-accent">Tags</h4>
                                <ul className="mt-2 list-none">
                                    {uniqueTags.map(item => (
                                        <li key={item}>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    checked={selectedTags.includes(item)}
                                                    onChange={() => handleFilterChange(setSelectedTags, item)}
                                                    className="form-checkbox h-4 w-4 text-accent"
                                                />
                                                <span className="ml-2">{tagTitles[item]}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {(selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery) && (
                            <button
                                onClick={handleResetFilters}
                                className="mt-4 w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-opacity-80 transition-all duration-200 ease-in-out"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-3/4">
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
                        {currentBlogs.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-16">
                        <button
                            onClick={() => handlePageChange("prev")}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-opacity-80 disabled:opacity-50 transition-all duration-200 ease-in-out"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange("next")}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-opacity-80 disabled:opacity-50 transition-all duration-200 ease-in-out"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsPageClient;