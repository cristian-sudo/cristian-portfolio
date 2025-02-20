declare module 'prismjs' {
    export function highlightAll(): void;
    export function highlightElement(element: Element, async?: boolean, callback?: () => void): void;
    export function highlight(code: string, grammar: string, language: string): string;
    export const languages: string [];
}