import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    variant?: "default" | "night" | "soft" | "dashed";
    center?: boolean;
    full?: boolean;
    member?: boolean;
    hover?: boolean;
    className?: string;
}

export default function Card({
    children,
    variant = "default",
    center = false,
    full = false,
    member = false,
    hover = true,
    className = "",
}: CardProps) {

    const baseStyles = "relative overflow-hidden rounded-3xl border p-6 transition duration-300";

    const variantStyles = {
        default: "border-border bg-bg-card shadow-custom-sm",
        night: "border-transparent bg-night text-night-text",
        soft: "border-transparent bg-green-lighter/70",
        dashed: "border-dashed border-green-primary/40 bg-green-lighter/50",
    };

    const hoverStyles = hover ? "hover:-translate-y-1 hover:border-green-primary/40 hover:shadow-custom-md" : "";
    const centerStyles = center ? "text-center" : "";
    const widthStyles = full ? "w-full sm:p-10" : "";
    const memberStyles = member ? "text-center sm:p-8" : "";

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${centerStyles} ${widthStyles} ${memberStyles} ${className}`}
        >
            {children}
        </div>
    );
}