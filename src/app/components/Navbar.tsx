"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import ShiftTabs from '@/app/components/animata/container/shift-tabs';
import { Menu, X } from 'lucide-react';
import { Language, PageData } from '../types';

interface NavLink {
    href: string;
    label: string;
}
type Procedure<T extends unknown[]> = (...args: T) => void;

const Navbar: React.FC = () => {
    const supportedLanguages: Language[] = ['EN', 'RO', 'IT', 'RU'];
    const { language, setLanguage } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [navLinks, setNavLinks] = useState<NavLink[] | null>(null);
    const [languages] = useState<Language[]>(supportedLanguages);

    function isLanguage(lang: Language): lang is Language {
        return supportedLanguages.includes(lang);
    }

    useEffect(() => {
        const fetchPages = async (): Promise<void> => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collections/pages/entries`);
                if (!res.ok) {
                    console.error('Failed to fetch pages');
                    return;
                }
                const data = await res.json();
                const languageToLowerCase = language.toLowerCase();
                const pages = data.data.map((page: PageData) => {
                    const titleKey = `${languageToLowerCase}_title` as keyof PageData;
                    return {
                        href: `/${page.id}`,
                        label: page[titleKey] || '...',
                    };
                });
                setNavLinks(pages);
            } catch (error) {
                console.error('Error fetching pages:', error);
            }
        };

        fetchPages().catch(error => {
            console.error('Error in fetchPages:', error);
        });
    }, [language]);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY === 0) {
                    setShowNavbar(true);
                } else if (window.scrollY > lastScrollY) {
                    setShowNavbar(false);
                } else {
                    setShowNavbar(true);
                }
                setLastScrollY(window.scrollY);
                setHasScrolled(window.scrollY > 5);
            }
        };

        const debouncedControlNavbar = debounce(controlNavbar, 5);

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', debouncedControlNavbar);
            return () => window.removeEventListener('scroll', debouncedControlNavbar);
        }
    }, [lastScrollY]);

    function debounce<F extends Procedure<T>, T extends unknown[]>(func: F, wait: number) {
        let timeout: ReturnType<typeof setTimeout>;

        return function (...args: T) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    return (
        <nav
            className={`fixed py-2 top-0 left-0 right-0 transition-transform duration-300 ${
                showNavbar ? 'translate-y-0' : '-translate-y-full'
            } ${hasScrolled ? 'bg-black' : 'bg-transparent'} z-50 shadow-md`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center py-3">
                <div className="text-2xl font-bold">
                    <Link href="/">
                        <span className="text-accent">$</span>cristian_plop
                    </Link>
                </div>

                <div className="flex items-center md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks ? (
                        <ShiftTabs items={navLinks} />
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-accent px-2 py-1 rounded"
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                        >
                            {language}
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-24 bg-accent rounded shadow-lg" role="menu">
                                {languages.map((lang) => (
                                    <li
                                        key={lang}
                                        onClick={() => {
                                            if (isLanguage(lang)) {
                                                setLanguage(lang);
                                                setDropdownOpen(false);
                                            }
                                        }}
                                        className="px-4 py-2 hover:bg-black cursor-pointer"
                                        role="menuitem"
                                    >
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-black text-white flex flex-col items-center space-y-4 py-4">
                    {navLinks ? (
                        navLinks.map((link, index) => (
                            <Link key={index} href={link.href} className="text-lg" onClick={() => setMenuOpen(false)}>
                                {link.label}
                            </Link>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-accent px-2 py-1 rounded"
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                        >
                            {language}
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-24 bg-accent rounded shadow-lg" role="menu">
                                {languages.map((lang) => (
                                    <li
                                        key={lang}
                                        onClick={() => {
                                            if (isLanguage(lang)) {
                                                setLanguage(lang);
                                                setDropdownOpen(false);
                                                setMenuOpen(false);
                                            }
                                        }}
                                        className="px-4 py-2 hover:bg-black cursor-pointer"
                                        role="menuitem"
                                    >
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;