"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import ShiftTabs from "@/app/components/animata/container/shift-tabs";
import data from '../../../public/data.json';
import { DataStructure } from '../types';

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

    const jsonData = data as DataStructure;
    const navLinks = jsonData.content[language].navLinks;
    const languages = jsonData.languages;

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);

            if (window.scrollY > 10) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed py-2 top-0 left-0 right-0 transition-transform duration-300 ${
                showNavbar ? 'transform translate-y-0' : 'transform -translate-y-full'
            } ${hasScrolled ? 'bg-gray-950' : 'bg-transparent'} z-50`}
        >
            <div className="container mx-auto py-4 flex justify-between items-center">
                <div className="text-3xl font-bold">
                    <Link href="/">
                        <span className="text-accent">$</span>
                        cristian_plop
                    </Link>
                </div>

                <div className="space-x-6 flex items-center">
                    <ShiftTabs items={navLinks} />
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-accent text-white px-2 py-1 rounded"
                        >
                            {language}
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-24 bg-accent rounded shadow-lg">
                                {languages.map((lang) => (
                                    <li
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setDropdownOpen(false);
                                        }}
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