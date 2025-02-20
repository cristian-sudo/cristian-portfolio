import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';

interface CodeHighlighterProps {
    children: React.ReactNode;
    className?: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ children, className }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return <div className={`prose prose-invert ${className}`}>{children}</div>;
};

export default CodeHighlighter;