"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import data from '../../../public/data.json';
import { DataStructure, Quote } from '../types';

const QuoteBox: React.FC = () => {
    const { language } = useLanguage();
    const [quoteContent, setQuoteContent] = useState<Quote | null>(null);

    useEffect(() => {
        const jsonData = data as DataStructure;
        const fetchedQuoteContent = jsonData.content[language]?.quote || null;
        setQuoteContent(fetchedQuoteContent);
    }, [language]);

    if (!quoteContent) {
        return null;
    }

    return (
        <div className="p-6 max-w-lg mx-auto mt-10">
            <div className="text-lg font-mono border relative p-6">
                <div className="absolute top-[-9px] font-bold left-6 text-5xl bg-black w-8 h-3 flex justify-center">
                    &ldquo;
                </div>
                <span>
                    {highlightText(quoteContent.text)}
                </span>
                <div className="absolute bottom-[-9px] font-bold right-6 text-5xl bg-black w-8 h-3 flex justify-center">
                    &rdquo;
                </div>
            </div>
            <div className="text-right">
                <span className="inline-block border p-4">
                    &mdash; {quoteContent.author}
                </span>
            </div>
        </div>
    );
};

export default QuoteBox;