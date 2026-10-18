import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Card from "../Card";
import IconBox from "../IconBox";

interface FeatureCardProps {
    title: string;
    text?: string;
    icon?: ReactNode;
    value?: string | number;
    step?: number;
    tone?: "green" | "purple" | "solid";
    highlight?: boolean;
    to?: string;
    className?: string;
}

export default function FeatureCard({
    title,
    text,
    icon,
    value,
    step,
    tone = "green",
    highlight = false,
    to,
    className = "",
}: FeatureCardProps) {

    if (to) {
        return (
            <Link to={to} className="group block h-full">
                <Card className={`h-full rounded-2xl bg-bg-card p-5 ${className}`}>
                    <span className="flex items-center justify-between font-heading text-base font-bold text-text-main">
                        {title}
                        <FaArrowRight className="text-green-primary transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>

                    {text && <span className="mt-1 block text-sm text-text-secondary">{text}</span>}
                </Card>
            </Link>
        );
    }

    const highlightStyles = highlight ? "border-purple-primary/30 bg-purple-lighter" : "";
    const isStat = value !== undefined;

    return (
        <Card className={`h-full ${highlightStyles} ${className}`}>
            <div className="flex items-center justify-between">
                {icon && (
                    <IconBox
                        icon={icon}
                        variant={highlight ? "purple" : tone}
                        size={tone === "solid" ? "lg" : "md"}
                    />
                )}

                {step !== undefined && (
                    <span className="font-heading text-4xl font-extrabold text-green-lighter" aria-hidden>
                        {step}
                    </span>
                )}
            </div>

            {isStat && (
                <strong className="mt-4 block font-heading text-2xl font-extrabold text-text-main">
                    {value}
                </strong>
            )}

            <h3 className={isStat
                ? "text-sm font-medium text-text-main"
                : "mt-5 font-heading text-lg font-bold text-text-main"}
            >
                {title}
            </h3>

            {text && (
                <p className={`text-sm leading-relaxed text-text-secondary ${isStat ? "mt-1 text-xs" : "mt-2"}`}>
                    {text}
                </p>
            )}
        </Card>
    );
}
