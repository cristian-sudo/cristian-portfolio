"use client"; // Ensure this is a client component

import { usePathname } from 'next/navigation'; // Use usePathname for current path
import { cn } from "@/app/libs/utils";

interface ButtonProps {
    item: { label: string; href: string };
    isActive: boolean;
    onTabClick: () => void;
}

const Button = ({ item, isActive, onTabClick }: ButtonProps) => {
    return (
        <div
            className={cn("rounded-lg bg-black", {
                "border-b-2 border-b-accent": isActive,
            })}
            onClick={onTabClick}
        >
            <div
                className={cn(
                    "flex h-10 cursor-pointer items-center justify-center rounded-md border-2 p-3 transition-all",
                    {
                        "border-2 border-accent text-accent": isActive,
                        "origin-top-right ease-in hover:rotate-6": !isActive,
                    },
                )}
            >
                <a href={item.href} className="p-2 text-center font-mono">
                    {item.label}
                </a>
            </div>
        </div>
    );
};

export default function ShiftTabs({ items }: { items: { label: string; href: string }[] }) {
    const pathname = usePathname();

    return (
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
            {items.map((item, index) => (
                <Button
                    onTabClick={() => {
                        window.location.href = item.href;
                    }}
                    item={item}
                    isActive={pathname === item.href}
                    key={`shift_tab_${index}`}
                />
            ))}
        </div>
    );
}