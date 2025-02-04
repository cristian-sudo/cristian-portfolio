import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { highlightText } from '../utils/textUtils';
import data from '../../../public/data.json';
import { FunFacts as FunFactsType } from '../types';

const FunFacts: React.FC = () => {
    const { language } = useLanguage();
    const [funFactsData, setFunFactsData] = useState<FunFactsType | null>(null);

    useEffect(() => {
        const contentData: { content: Record<string, { myFunFacts: FunFactsType }> } = data as never;
        const fetchedFunFactsData: FunFactsType | undefined = contentData.content[language]?.myFunFacts;
        setFunFactsData(fetchedFunFactsData || null);
    }, [language]);

    if (!funFactsData) {
        return <div>Loading...</div>; // Display a loading state while fetching data
    }

    return (
        <div className="py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-2xl font-bold mb-6">
                    {highlightText(funFactsData.title)}
                </h2>
                <div className="flex flex-wrap gap-4">
                    {funFactsData.facts.map((fact, index) => (
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