import React, { useEffect, useState } from "react";
import { cn } from "@/app/libs/utils";
import { highlightText } from '@/app/utils/textUtils';

interface GibberishTextProps {
    text: string;
    className?: string;
}

const Letter = ({ letter, className }: { letter: string; className?: string }) => {
    const [code, setCode] = useState(letter.toUpperCase().charCodeAt(0));

    useEffect(() => {
        let count = Math.floor(Math.random() * 10) + 5;
        const interval = setInterval(() => {
            setCode(() => Math.floor(Math.random() * 26) + 65);
            count--;
            if (count === 0) {
                setCode(letter.toUpperCase().charCodeAt(0));
                clearInterval(interval);
            }
        }, 24);

        return () => clearInterval(interval);
    }, [letter]);

    return (
        <span className={cn("whitespace-pre text-foreground", className)}>
            {String.fromCharCode(code)}
        </span>
    );
};

export default function GibberishText({ text, className }: GibberishTextProps) {
    const highlightedParts = highlightText(text);

    return (
        <>
            {highlightedParts?.map((part, index) => {
                if (typeof part === 'string') {
                    return (
                        <React.Fragment key={index}>
                            {part.split("").map((letter, letterIndex) => (
                                <Letter className={className} letter={letter} key={`${index}-${letterIndex}`} />
                            ))}
                        </React.Fragment>
                    );
                } else {
                    return React.cloneElement(part, {
                        children: (part.props.children as string).split("").map((letter: string, letterIndex: number) => (
                            <Letter className={className} letter={letter} key={`${index}-${letterIndex}`} />
                        )),
                    });
                }
            })}
        </>
    );
}