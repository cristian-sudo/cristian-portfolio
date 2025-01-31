"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';

type NavLink = {
    href: string;
    label: string;
};

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage(); // Use the language context
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [navLinks, setNavLinks] = useState<NavLink[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);

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

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setLanguages(data.languages);
                setNavLinks(data.content[language].navLinks);
            });
    }, [language]);

    return (
        <nav
            className={`fixed py-2 top-0 left-0 right-0 transition-transform duration-300 ${
                showNavbar ? 'transform translate-y-0' : 'transform -translate-y-full'
            } ${hasScrolled ? 'bg-gray-950' : 'bg-transparent'} z-50`}
        >
            <div className="container mx-auto py-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/">
                        <span className="text-accent">$</span>
                        cristian_plop
                    </Link>
                </div>
                <div className="space-x-6 flex items-center">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-white">
                            {highlightText(link.label)}
                        </Link>
                    ))}
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