import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "dark" | "accent" | "outline";
    size?: "sm" | "md" | "lg";
    full?: boolean;
    arrow?: boolean;
    href?: string;
    to?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    full = false,
    arrow = false,
    href,
    to,
    type = "button",
    disabled = false,
    onClick,
    className = "",
}: ButtonProps) {

    const baseStyles =
        "group inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-full text-center font-heading font-bold no-underline transition duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 max-xs:w-full";

    const variantStyles = {
        primary: "bg-green-primary text-white shadow-lg shadow-green-primary/30 hover:shadow-xl hover:shadow-green-primary/30",
        secondary: "border border-border bg-bg-card text-text-main hover:bg-green-lighter",
        dark: "bg-night text-night-text hover:bg-night/90",
        accent: "bg-green-light text-night shadow-lg shadow-green-light/25",
        outline: "border border-white/40 text-white hover:bg-white/10",
    };

    const sizeStyles = {
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-3 text-sm",
        lg: "px-6 py-3.5 text-sm",
    };

    const widthStyles = full ? "w-full" : "";

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

    const content = (
        <>
            {children}
            {arrow && (
                <FaArrowRight className="text-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={classes}>
                {content}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
            {content}
        </button>
    );
}