interface ProgressBarProps {
    value: number;
    max?: number;
    label?: string;
    size?: "sm" | "md" | "lg";
    onDark?: boolean;
    className?: string;
}

export default function ProgressBar({
    value,
    max = 100,
    label = "Progresso",
    size = "md",
    onDark = false,
    className = "",
}: ProgressBarProps) {
    const percentage = Math.min(Math.round((value / max) * 100), 100);

    const sizeStyles = {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-3",
    };

    const trackStyles = onDark ? "bg-white/10" : "bg-bg-muted";
    const fillStyles = onDark ? "bg-green-light" : "bg-linear-to-r from-green-primary to-green-light";

    return (
        <div
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label}: ${percentage}%`}
            className={`w-full overflow-hidden rounded-full ${trackStyles} ${sizeStyles[size]} ${className}`}
        >
            <div
                className={`h-full rounded-full ${fillStyles} transition-[width] duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}