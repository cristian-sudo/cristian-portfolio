import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';

const FunFacts: React.FC = () => {
    const { language } = useLanguage();
    const [facts, setFacts] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                if (data.content[language] && data.content[language].myFunFacts) {
                    setFacts(data.content[language].myFunFacts.facts);
                    setTitle(data.content[language].myFunFacts.title);
                }
            })
            .catch(error => {
                console.error("Error fetching fun facts:", error);
            });
    }, [language]);

    return (
        <div className="text-white py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-2xl font-bold mb-6">
                    {highlightText(title)}
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