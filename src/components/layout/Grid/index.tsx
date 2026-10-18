import type { ReactNode } from "react";

interface GridProps {
    children: ReactNode;
    columns?: 2 | 3 | 4;
    split?: "even" | "wide-left" | "wide-right";
    align?: "start" | "center";
    className?: string;
}

export default function Grid({
    children,
    columns = 3,
    split,
    align = "start",
    className = "",
}: GridProps) {

    const columnStyles = {
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-2 lg:grid-cols-3",
        4: "sm:grid-cols-2 lg:grid-cols-4",
    };

    const splitStyles = {
        even: "lg:grid-cols-2",
        "wide-left": "lg:grid-cols-[1.5fr_1fr]",
        "wide-right": "lg:grid-cols-[1fr_1.5fr]",
    };

    const alignStyles = {
        start: "items-start",
        center: "items-center",
    };

    const layoutStyles = split
        ? `gap-8 ${splitStyles[split]} ${alignStyles[align]}`
        : `gap-6 ${columnStyles[columns]}`;

    return (
        <div className={`grid ${layoutStyles} ${className}`}>
            {children}
        </div>
    );
}
