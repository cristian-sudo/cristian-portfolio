import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import { FunFactsSection } from '../types';

const FunFacts: React.FC<FunFactsSection> = ( section) => {
    const { language } = useLanguage();
    const [facts, setFacts] = useState<string[]>([]);

    useEffect(() => {
        const fetchFacts = async () => {
            try {
                const responses = await Promise.all(
                    section.facts.map((fact) =>
                        fetch(fact.api_url)
                            .then((response) => response.json())
                            .then((data) => data.data)
                    )
                );

                // Map the responses to the localized title based on the language
                const fetchedFacts = responses.map((response) => {
                    const titleKey = `${language.toLowerCase()}_title`;
                    return response[titleKey] || response.title;
                });

                setFacts(fetchedFacts);
            } catch (error) {
                console.error("Error fetching facts:", error);
            }
        };

        fetchFacts();
    }, [section, language]);

    const titleKey = `${language.toLowerCase()}_title` as keyof FunFactsSection;
    const localizedTitle = section ? (section[titleKey] as string) || section.title : '';



    return (
        <div className="py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-2xl font-bold mb-6 text-accent">
                    #{highlightText(localizedTitle)}
                </h2>
                <div className="flex flex-wrap gap-4">
                    {facts.map((fact, index) => (
                        <div
                            key={index}
                            className="border border-gray-500 p-1 text-center"
                        >
                            {highlightText(fact)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FunFacts;