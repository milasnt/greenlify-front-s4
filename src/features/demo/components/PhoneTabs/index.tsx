interface PhoneTabsProps<T extends string> {
    items: { id: T; label: string }[];
    active: T;
    onChange: (id: T) => void;
    ariaLabel: string;
}

export default function PhoneTabs<T extends string>({ items, active, onChange, ariaLabel }: PhoneTabsProps<T>) {
    return (
        <div role="group" aria-label={ariaLabel} className="mb-3 flex gap-1 rounded-full border border-border bg-bg-card p-1">
            {items.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    aria-pressed={active === item.id}
                    onClick={() => onChange(item.id)}
                    className={`min-w-0 flex-1 rounded-full px-2 py-1.5 font-heading text-[10px] font-bold transition duration-300 ${
                        active === item.id
                            ? "bg-green-primary text-white shadow-md shadow-green-primary/25"
                            : "text-text-secondary hover:bg-green-lighter hover:text-text-main"
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
