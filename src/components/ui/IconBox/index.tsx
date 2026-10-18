import type { ReactNode } from "react";

interface IconBoxProps {
    icon?: ReactNode;
    /** Com `name`, mostra as iniciais em círculo (substitui o antigo Avatar). */
    name?: string;
    variant?: "green" | "solid" | "purple" | "gradient" | "gradientPurple";
    size?: "sm" | "md" | "lg" | "xl";
    ring?: boolean;
    className?: string;
}

export default function IconBox({
    icon,
    name,
    variant,
    size = "md",
    ring = false,
    className = "",
}: IconBoxProps) {

    const isAvatar = Boolean(name);

    const baseStyles = "grid shrink-0 place-items-center transition duration-300";

    const variantStyles = {
        green: "bg-green-lighter text-green-primary",
        solid: "bg-green-primary text-white shadow-md shadow-green-primary/25",
        purple: "bg-purple-lighter text-purple-dark",
        gradient: "bg-gradient-green text-white",
        gradientPurple: "bg-gradient-purple text-white",
    };

    const iconSizeStyles = {
        sm: "h-8 w-8 rounded-lg text-sm",
        md: "h-10 w-10 rounded-xl text-base",
        lg: "h-12 w-12 rounded-2xl text-xl",
        xl: "h-16 w-16 rounded-2xl text-2xl",
    };

    const avatarSizeStyles = {
        sm: "h-8 w-8 text-[10px]",
        md: "h-10 w-10 text-xs",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-2xl",
    };

    const initials = (name ?? "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const avatarVariant = (name ?? "").length % 2 === 0 ? "gradient" : "gradientPurple";
    const shapeStyles = isAvatar
        ? `rounded-full font-heading font-bold ${avatarSizeStyles[size]}`
        : iconSizeStyles[size];

    const ringStyles = ring ? "ring-4 ring-green-light/40" : "";

    return (
        <span
            aria-hidden
            className={`${baseStyles} ${variantStyles[variant ?? (isAvatar ? avatarVariant : "green")]} ${shapeStyles} ${ringStyles} ${className}`}
        >
            {isAvatar ? initials : icon}
        </span>
    );
}
