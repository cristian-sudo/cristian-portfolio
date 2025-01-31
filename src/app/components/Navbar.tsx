"use client"

import Link from 'next/link';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [language, setLanguage] = useState('EN');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        setDropdownOpen(false);
    };

    return (
        <nav className="mx-auto py-9">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/">
                        <span className="text-accent">$</span>
                        cristian_plop
                    </Link>
                </div>
                <div className="space-x-6 flex items-center">
                    <Link href="/" className="text-white"><span className='text-accent'>#</span>home</Link>
                    <Link href="/projects" className="text-white"><span className='text-accent'>#</span>works</Link>
                    <Link href="/contact" className="text-white"><span className='text-accent'>#</span>about-me</Link>
                    <Link href="/contact" className="text-white"><span className='text-accent'>#</span>contacts</Link>
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-accent text-white px-2 py-1 rounded"
                        >
                            {language}
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-24 bg-accent rounded shadow-lg">
                                {['EN', 'RU', 'RO', 'IT'].map((lang) => (
                                    <li
                                        key={lang}
                                        onClick={() => handleLanguageChange(lang)}
                                        className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                                    >
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;