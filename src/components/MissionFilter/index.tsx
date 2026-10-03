interface MissionFilterProps {
    selected?: string;
}

export default function MissionFilter({ selected = "Todas" }: MissionFilterProps) {
    const filters = ["Todas", "Mensais", "Contínuas"];

    return (
        <div className="flex flex-wrap gap-4 max-[992px]:gap-8 max-[768px]:gap-[1.6rem] max-[768px]:overflow-x-auto max-[768px]:flex-nowrap max-[768px]:pb-[1.2rem] max-[480px]:gap-[1.2rem]">
            {filters.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    className={`shrink-0 whitespace-nowrap rounded-full border px-6 py-3 text-[1.4rem] font-semibold transition duration-300 max-[768px]:text-[1.4rem] max-[480px]:text-[1.3rem] max-[480px]:pb-4 ${
                        selected === filter
                            ? "border-green-primary bg-green-primary text-bg"
                            : "border-border bg-bg-card text-text-secondary hover:border-green-primary hover:text-green-primary"
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}