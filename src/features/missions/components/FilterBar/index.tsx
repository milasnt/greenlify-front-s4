import { FaMagnifyingGlass, FaSliders } from "react-icons/fa6";
import MissionFilter from "../MissionFilter";
import Card from "../../../../components/ui/Card";

export interface FilterGroup {
    id: string;
    label: string;
    options: string[];
    selected: string;
    onChange: (option: string) => void;
    tone?: "green" | "purple";
}

interface FilterBarProps {
    search?: string;
    onSearchChange?: (value: string) => void;
    searchLabel?: string;
    searchPlaceholder?: string;
    groups: FilterGroup[];
    resultCount?: number;
    resultLabel?: string;
    onClear?: () => void;
}

export default function FilterBar({
    search = "",
    onSearchChange,
    searchLabel = "Buscar missão por nome",
    searchPlaceholder = "Buscar missão por nome ou descrição…",
    groups,
    resultCount,
    resultLabel = "missão",
    onClear,
}: FilterBarProps) {
    const hasSearch = Boolean(onSearchChange);
    const hasActiveFilters =
        search.trim() !== "" || groups.some((group) => group.selected !== group.options[0]);

    return (
        <>
            <Card hover={false} className="flex flex-col gap-4 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    {onSearchChange && (
                        <label className="relative block flex-1">
                            <span className="sr-only">{searchLabel}</span>

                            <FaMagnifyingGlass
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary"
                                aria-hidden
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => onSearchChange(event.target.value)}
                                placeholder={searchPlaceholder}
                                className="inputField rounded-full py-2.5 pl-11"
                            />
                        </label>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {hasSearch && <FaSliders className="text-text-secondary" aria-hidden />}

                        {groups.map((group) => (
                            <MissionFilter
                                key={group.id}
                                options={group.options}
                                selected={group.selected}
                                onChange={group.onChange}
                                tone={group.tone}
                                ariaLabel={group.label}
                            />
                        ))}
                    </div>
                </div>
            </Card>

            {resultCount !== undefined && (
            <p className="mt-6 text-sm text-text-secondary" role="status">
                {resultCount === 0
                    ? `Nenhuma ${resultLabel} encontrada com esses filtros.`
                    : `${resultCount} ${resultCount === 1 ? `${resultLabel} encontrada` : `${resultLabel}s encontradas`}`}

                {hasActiveFilters && onClear && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="ml-3 font-semibold text-green-primary underline-offset-4 hover:underline"
                    >
                        Limpar filtros
                    </button>
                )}
            </p>
            )}
        </>
    );
}
