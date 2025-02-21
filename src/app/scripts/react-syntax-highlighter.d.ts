declare module 'react-syntax-highlighter' {
    import { ComponentType } from 'react';

    export interface SyntaxHighlighterProps {
        language?: string;
        style?: object;
        children?: string;
    }

    export const Prism: ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
    export const tomorrow: Record<string, React.CSSProperties>;
}