import type { ReactNode } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Card from "../Card";
import IconBox from "../IconBox";
import Reveal from "../../layout/Reveal";


export interface ItemListItem {
    icon?: ReactNode;
    title?: string;
    text?: string;
    value?: string;
    href?: string;
}

interface ItemListProps {
    items: ItemListItem[];
    variant?: "stats" | "bar" | "icons" | "contact" | "rows" | "status" | "definition" | "checks";
    onDark?: boolean;
    title?: string;
    note?: string;
    className?: string;
}

export default function ItemList({
    items,
    variant = "icons",
    onDark = false,
    title,
    note,
    className = "",
}: ItemListProps) {

    if (variant === "stats") {
        return (
            <dl className={`flex flex-wrap gap-x-10 gap-y-4 ${className}`}>
                {items.map((item) => (
                    <div key={item.title}>
                        <dd className="font-heading text-xl font-extrabold text-text-main">{item.value}</dd>
                        <dt className="text-xs text-text-secondary">{item.title}</dt>
                    </div>
                ))}
            </dl>
        );
    }

    if (variant === "bar") {
        return (
            <section aria-label="Números da plataforma" className={`border-y border-border bg-bg-card ${className}`}>
                <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <Reveal key={item.title} delay={index * 90} className="px-4 py-6 sm:px-6 sm:py-8">
                            <span className="text-xl text-green-primary" aria-hidden>{item.icon}</span>

                            <p className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
                                {item.value}
                            </p>

                            <p className="mt-1 text-sm text-text-secondary">{item.title}</p>
                        </Reveal>
                    ))}
                </div>

                {note && (
                    <p className="mx-auto max-w-6xl px-4 pb-4 text-right text-[11px] text-text-secondary sm:px-6">
                        {note}
                    </p>
                )}
            </section>
        );
    }

    if (variant === "icons") {
        return (
            <ul className={`space-y-5 ${className}`}>
                {items.map((item) => (
                    <li key={item.text} className="flex items-center gap-4">
                        <IconBox icon={item.icon} variant="purple" />
                        <p className="text-sm font-medium text-text-main">{item.text}</p>
                    </li>
                ))}
            </ul>
        );
    }

    if (variant === "contact") {
        return (
            <div className={`space-y-5 ${className}`}>
                {items.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                        <IconBox icon={item.icon} />

                        <div className="min-w-0 wrap-break-word">
                            <h3 className="font-heading text-sm font-bold text-text-main">{item.title}</h3>

                            {item.href ? (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-green-primary underline-offset-4 hover:underline"
                                >
                                    {item.text}
                                </a>
                            ) : (
                                <p className="text-sm text-text-secondary">{item.text}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "rows") {
        return (
            <div className={`divide-y divide-border ${className}`}>
                {items.map((item) => (
                    <div key={item.title} className="flex items-center justify-between gap-3 py-3 text-sm first:pt-0 last:pb-0">
                        <span className="text-text-secondary">{item.title}</span>
                        <span className="font-semibold text-text-main">{item.value}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "status") {

        return (
            <div className={`space-y-3 ${className}`}>
                {items.map((item) => (
                    <div key={item.title} className="flex items-center justify-between gap-4 text-sm">
                        <span className={onDark ? "text-night-muted" : "text-text-secondary"}>{item.title}</span>
                        <strong className="font-semibold">{item.value}</strong>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "definition") {
        return (
            <Card variant="soft" hover={false} className={`h-full p-7 ${className}`}>
                {title && <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3>}

                <dl className="mt-5 divide-y divide-green-primary/10">
                    {items.map((item) => (
                        <div key={item.title} className="py-3 first:pt-0 last:pb-0">
                            <dt className="font-heading text-sm font-bold text-green-dark">{item.title}</dt>
                            <dd className="mt-0.5 text-sm leading-relaxed text-text-secondary">{item.text}</dd>
                        </div>
                    ))}
                </dl>
            </Card>
        );
    }

    return (
        <ul className={`space-y-3 ${className}`}>
            {items.map((item) => (
                <li
                    key={item.text}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-bg-card p-4 text-sm leading-relaxed text-text-secondary"
                >
                    <FaCircleCheck className="mt-0.5 shrink-0 text-green-primary" aria-hidden />
                    {item.text}
                </li>
            ))}
        </ul>
    );
}
