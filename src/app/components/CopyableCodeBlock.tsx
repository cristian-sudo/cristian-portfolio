import React, {useState} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {tomorrow} from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyableCodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-gray-700 text-white text-xs py-1 px-2 rounded hover:bg-gray-600 transition"
            >
                {copied ? "Copied!" : "Copy"}
            </button>
            <SyntaxHighlighter language={language} style={tomorrow} >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CopyableCodeBlock;