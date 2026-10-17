import type { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "mint" | "card" | "night";
    size?: "md" | "sm";
    id?: string;
    className?: string;
}

export default function Section({
    children,
    variant = "primary",
    size = "md",
    id,
    className = "",
}: SectionProps) {

    const isNight = variant === "night";

    const variantStyles = {
        primary: "bg-bg",
        secondary: "bg-bg-soft",
        mint: "bg-green-lighter/60",
        card: "border-y border-border bg-bg-card",
        night: "bg-night text-night-text",
    };

    const sizeStyles = {
        md: "py-20 lg:py-28",
        sm: "py-12 lg:py-16",
    };

    return (
        <section
            id={id}
            className={`relative w-full scroll-mt-24 overflow-hidden ${variantStyles[variant]} ${className}`}
        >
            {isNight && (
                <>
                    <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-purple-primary/25 blur-3xl" aria-hidden />
                    <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-green-light/15 blur-3xl" aria-hidden />
                </>
            )}

            <div className={`relative mx-auto w-full max-w-6xl px-4 sm:px-6 ${sizeStyles[size]}`}>
                {children}
            </div>
        </section>
    );
}