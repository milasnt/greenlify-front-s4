import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaShieldHalved, FaUsers } from "react-icons/fa6";
import Card from "../Card";

interface MediaCardProps {
    variant?: "logo" | "partner" | "photo" | "frame";
    src: string;
    alt: string;
    to?: string;
    title?: string;
    subtitle?: string;
    label?: string;
    text?: string;
    overlay?: ReactNode;
}

export default function MediaCard({
    variant = "logo",
    src,
    alt,
    to,
    title,
    subtitle,
    label,
    text,
    overlay,
}: MediaCardProps) {

    if (variant === "partner") {
        return (
            <div className="nightGlass rounded-3xl p-6">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-light">{label}</p>

                <div className="mt-4 grid place-items-center rounded-2xl bg-white p-8">
                    <img src={src} alt={alt} className="w-full max-w-md" loading="lazy" />
                </div>

                <p className="mt-5 flex items-start gap-3 text-sm text-night-muted">
                    <FaShieldHalved className="mt-0.5 shrink-0 text-green-light" aria-hidden />
                    {text}
                </p>
            </div>
        );
    }

    if (variant === "photo") {
        const content = (
            <>
                <div className="overflow-hidden">
                    <img
                        src={src}
                        alt={alt}
                        className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>

                <div className="p-4">
                    <h3 className="font-heading text-sm font-bold text-text-main">{title}</h3>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
                        <FaUsers aria-hidden />
                        {subtitle}
                    </p>
                </div>
            </>
        );

        const photoStyles = "group block overflow-hidden rounded-3xl border border-border bg-bg transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-primary/10";

        return to ? (
            <Link to={to} className={photoStyles}>{content}</Link>
        ) : (
            <div className={photoStyles}>{content}</div>
        );
    }

    if (variant === "frame") {
        return (
            <div className="relative">
                <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-green-primary/15">
                    <img src={src} alt={alt} className="aspect-4/3 w-full object-cover" loading="lazy" />
                </div>

                {overlay && (
                    <div className="glassPanel absolute -bottom-5 left-6 right-6 rounded-2xl p-4 sm:right-auto sm:max-w-xs">
                        {overlay}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Card className="grid place-items-center p-8">
            <img src={src} alt={alt} className="max-h-24 w-auto object-contain" loading="lazy" />
        </Card>
    );
}
