import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import { Quote, QuoteSection } from '../types';

const QuoteBox: React.FC<QuoteSection> = ({ quotes }) => {
    const { language } = useLanguage();
    const [quoteContent, setQuoteContent] = useState<Quote | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollDirection, setScrollDirection] = useState<'right' | 'left'>('right');

    useEffect(() => {
        const fetchQuote = async () => {
            if (!quotes || !quotes.api_url) {
                console.error('Quote or API URL is undefined');
                return;
            }

            try {
                const response = await fetch(quotes.api_url);
                const result = await response.json();
                const data = result.data;
                const selectedLanguage = language.toLowerCase();
                setQuoteContent({
                    ...quotes,
                    author: data.author,
                    title: data[`${selectedLanguage}_title`] || data.title,
                });
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        fetchQuote().catch(error => {
            console.error('Error in fetchQuote:', error);
        });
    }, [language, quotes]);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

                if (scrollDirection === 'right') {
                    if (scrollLeft + clientWidth >= scrollWidth) {
                        setScrollDirection('left');
                    } else {
                        scrollContainerRef.current.scrollLeft += 1;
                    }
                } else {
                    if (scrollLeft <= 0) {
                        setScrollDirection('right');
                    } else {
                        scrollContainerRef.current.scrollLeft -= 1;
                    }
                }
            }
        }, 30);

        return () => clearInterval(scrollInterval);
    }, [scrollDirection]);

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
                    {highlightText(quoteContent.title)}
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