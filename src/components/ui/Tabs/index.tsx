import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

export interface TabItem {
    id: string;
    label: string;
    shortLabel?: string;
}

interface TabsProps {
    items: TabItem[];
    active: string;
    onChange: (id: string) => void;
    ariaLabel: string;
    panelId: string;
    numbered?: boolean;
    variant?: "pill" | "segmented";
}

export default function Tabs({
    items,
    active,
    onChange,
    ariaLabel,
    panelId,
    numbered = false,
    variant = "pill",
}: TabsProps) {
    const listRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

    // Mantém a aba ativa visível quando a lista rola (telas pequenas).
    useEffect(() => {
        const list = listRef.current;
        const tab = tabsRef.current[active];
        if (!list || !tab) return;

        list.scrollTo({
            left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2,
            behavior: "smooth",
        });
    }, [active]);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        const index = items.findIndex((item) => item.id === active);
        let next = -1;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % items.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = items.length - 1;

        if (next < 0) return;

        event.preventDefault();
        const target = items[next]!;
        tabsRef.current[target.id]?.focus();
        onChange(target.id);
    }

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-label={ariaLabel}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            className={variant === "segmented"
                ? "mx-auto flex w-fit gap-1 rounded-full border border-border bg-bg-card p-1 max-xs:w-full"
                : "flex snap-x gap-2 overflow-x-auto rounded-full border border-border bg-bg-card p-1.5 scrollbar-none lg:justify-center [&::-webkit-scrollbar]:hidden"}
        >
            {items.map((item, index) => {
                const isActive = item.id === active;

                return (
                    <button
                        key={item.id}
                        ref={(element) => {
                            tabsRef.current[item.id] = element;
                        }}
                        id={`tab-${item.id}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={panelId}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => onChange(item.id)}
                        className={`flex snap-center items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-bold transition duration-300 ${
                            variant === "segmented" ? "min-w-0 flex-1 px-3 py-2 text-sm sm:px-6" : "shrink-0 px-4 py-2.5 text-xs"
                        } ${
                            isActive
                                ? "bg-green-primary text-white shadow-md shadow-green-primary/25"
                                : "text-text-secondary hover:bg-green-lighter hover:text-text-main"
                        }`}
                    >
                        {numbered && (
                            <span
                                aria-hidden
                                className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${isActive ? "bg-white/20" : "bg-bg-muted"}`}
                            >
                                {index + 1}
                            </span>
                        )}

                        <span className="hidden sm:inline">{item.label}</span>
                        <span className="sm:hidden">{item.shortLabel ?? item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
