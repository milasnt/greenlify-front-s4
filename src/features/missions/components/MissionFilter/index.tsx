interface MissionFilterProps {
    selected?: string;
    options?: string[];
    tone?: "green" | "purple";
    ariaLabel?: string;
    onChange?: (option: string) => void;
}

export default function MissionFilter({
    selected = "Todas",
    options = ["Todas", "Mensais", "Contínuas"],
    tone = "green",
    ariaLabel = "Filtro",
    onChange,
}: MissionFilterProps) {

    const activeStyles = {
        green: "border-green-primary bg-green-primary text-white",
        purple: "border-purple-primary bg-purple-primary text-white",
    };

    const idleStyles = {
        green: "border-border text-text-secondary hover:border-green-primary/50 hover:text-text-main",
        purple: "border-border text-text-secondary hover:border-purple-primary/50 hover:text-text-main",
    };

    return (
        <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    aria-pressed={selected === option}
                    onClick={() => onChange?.(option)}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition duration-300 ${
                        selected === option ? activeStyles[tone] : idleStyles[tone]
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
