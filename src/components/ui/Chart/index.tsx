import { useId } from "react";

interface ChartPoint {
    label: string;
    value: number;
}

interface ChartProps {
    data: ChartPoint[];
    variant?: "line" | "bars";
    title?: string;
}

export default function Chart({ data, variant = "line", title }: ChartProps) {
    const gradientId = useId();
    const max = Math.max(...data.map((item) => item.value), 1);

    if (variant === "bars") {
        return (
            <div>
                {title && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        {title}
                    </p>
                )}

                <div className="mt-3 flex items-end gap-2">
                    {data.map((item) => (
                        <div key={item.label} className="flex flex-1 flex-col items-center gap-1.5">
                            <div
                                className="w-full rounded-t-lg bg-linear-to-t from-green-primary/70 to-green-light transition-all duration-700"
                                style={{ height: `${item.value * 18 + 6}px` }}
                                aria-hidden
                            />

                            <span className="text-[10px] font-medium text-text-secondary">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const points = data.map((item, index) => {
        const x = (index / Math.max(data.length - 1, 1)) * 100;
        const y = 100 - (item.value / max) * 88 - 6;
        return `${x},${y}`;
    });

    return (
        <div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-40 w-full" aria-hidden>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-green-light)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--color-green-light)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <polygon points={`0,100 ${points.join(" ")} 100,100`} fill={`url(#${gradientId})`} />

                <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke="var(--color-green-primary)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            <div className="mt-2 flex justify-between text-[11px] font-medium text-text-secondary">
                {data.map((item) => (
                    <span key={item.label}>{item.label}</span>
                ))}
            </div>
        </div>
    );
}
