import type { ReactNode } from "react";
import Reveal from "../Reveal";

interface SectionHeadingProps {
    label?: string;
    title: ReactNode;
    text?: ReactNode | ReactNode[];
    size?: "md" | "lg";
    align?: "left" | "center";
    onDark?: boolean;
    as?: "h1" | "h2" | "h3";
    className?: string;
}

export default function SectionHeading({
    label,
    title,
    text,
    size = "md",
    align = "left",
    onDark = false,
    as = "h2",
    className = "",
}: SectionHeadingProps) {
    const Title = as;
    const isCenter = align === "center";
    const paragraphs = Array.isArray(text) ? text : text ? [text] : [];

    const alignStyles = isCenter ? "mx-auto text-center" : "";
    const labelStyles = onDark ? "text-green-light" : "text-green-primary";
    const textStyles = onDark ? "text-night-muted" : "text-text-secondary";

    return (
        <Reveal className={`${size === "lg" ? "max-w-3xl" : "max-w-2xl"} ${alignStyles} ${className}`}>
            {label && (
                <p className={`font-heading text-xs font-bold uppercase tracking-[0.2em] ${labelStyles}`}>
                    {label}
                </p>
            )}

            <Title className="mt-3 wrap-break-word font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                {title}
            </Title>

            {paragraphs.map((paragraph, index) => (
                <p key={index} className={`mt-4 leading-relaxed ${textStyles}`}>
                    {paragraph}
                </p>
            ))}
        </Reveal>
    );
}