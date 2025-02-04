"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import ShiftTabs from '@/app/components/animata/container/shift-tabs';
import data from '../../../public/data.json';
import { DataStructure, NavLink, Language } from '../types';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [navLinks, setNavLinks] = useState<NavLink[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        const jsonData = data as DataStructure;
        const fetchedNavLinks = jsonData.content[language]?.navLinks || [];
        const fetchedLanguages = jsonData.languages || [];
        setNavLinks(fetchedNavLinks);
        setLanguages(fetchedLanguages);
    }, [language]);

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);

            setHasScrolled(window.scrollY > 10);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => window.removeEventListener('scroll', controlNavbar);
        }
    }, [controlNavbar]);

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
                    <ShiftTabs items={navLinks} />
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-accent px-2 py-1 rounded" aria-haspopup="true" aria-expanded={dropdownOpen}>
                            {language}
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-24 bg-accent rounded shadow-lg" role="menu">
                                {languages.map((lang: Language) => (
                                    <li
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setDropdownOpen(false);
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
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-lg" onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-accent px-2 py-1 rounded" aria-haspopup="true" aria-expanded={dropdownOpen}>
                            {language}
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-24 bg-accent rounded shadow-lg" role="menu">
                                {languages.map((lang: Language) => (
                                    <li
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setDropdownOpen(false);
                                            setMenuOpen(false);
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