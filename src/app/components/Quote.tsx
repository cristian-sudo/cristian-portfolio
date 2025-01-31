"use client"
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';

type QuoteContent = {
    text: string;
    author: string;
};

const QuoteBox: React.FC = () => {
    const { language } = useLanguage();
    const [quoteContent, setQuoteContent] = useState<QuoteContent | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setQuoteContent(data.content[language].quote);
            });
    }, [language]);

    if (!quoteContent) {
        return null;
    }

    return (
        <div className="text-white p-6 max-w-lg mx-auto mt-10">
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