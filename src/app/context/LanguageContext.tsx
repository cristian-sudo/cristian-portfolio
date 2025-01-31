"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('language') || 'EN';
        }
        return 'EN';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language);
        }
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};