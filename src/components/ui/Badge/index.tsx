import type { ReactNode } from "react";

export type Dificuldade = "Fácil" | "Média" | "Difícil";
export type Impacto = "Baixo" | "Médio" | "Alto";

interface BadgeProps {
    children?: ReactNode;
    variant?: "green" | "purple" | "outline" | "muted";
    type?: "dificuldade" | "impacto";
    value?: Dificuldade | Impacto;
    className?: string;
}

export default function Badge({
    children,
    variant = "green",
    type,
    value,
    className = "",
}: BadgeProps) {
    const baseStyles = "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold";

    const variantStyles = {
        green: "bg-green-lighter text-green-dark",
        purple: "bg-purple-lighter text-purple-dark",
        outline: "border border-border text-text-secondary",
        muted: "bg-bg-muted text-text-secondary",
    };

    const dificuldadeStyles = {
        Fácil: variantStyles.green,
        Média: variantStyles.purple,
        Difícil: variantStyles.muted,
    };

    const impactoStyles = {
        Baixo: variantStyles.outline,
        Médio: "border border-green-light/50 text-green-primary",
        Alto: "border border-green-primary bg-green-primary text-white",
    };

    let styles = variantStyles[variant];
    let label: ReactNode = children;

    if (type === "dificuldade" && value) {
        styles = dificuldadeStyles[value as Dificuldade];
        label = value;
    }

    if (type === "impacto" && value) {
        styles = impactoStyles[value as Impacto];
        label = `Impacto ${value.toLowerCase()}`;
    }

    return <span className={`${baseStyles} ${styles} ${className}`}>{label}</span>;
}