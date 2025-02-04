import React from 'react';

export const highlightText = (text: string | undefined | null) => {
    if (!text) {
        return null;
    }

    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            return (
                <span key={index} className="text-accent">
                    {part.slice(1, -1)}
                </span>
            );
        }
        return part;
    });
};