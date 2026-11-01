import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
    pagina: number;
    totalPaginas: number;
    onChange: (pagina: number) => void;
    compact?: boolean;
    ariaLabel?: string;
    className?: string;
}

function paginasVisiveis(pagina: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const itens: (number | "…")[] = [1];
    const inicio = Math.max(2, pagina - 1);
    const fim = Math.min(total - 1, pagina + 1);

    if (inicio > 2) itens.push("…");
    for (let i = inicio; i <= fim; i++) itens.push(i);
    if (fim < total - 1) itens.push("…");

    itens.push(total);
    return itens;
}

export default function Pagination({
    pagina,
    totalPaginas,
    onChange,
    compact = false,
    ariaLabel = "Paginação",
    className = "",
}: PaginationProps) {
    if (totalPaginas <= 1) return null;

    const botaoSeta =
        "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-bg-card text-sm text-text-main transition duration-300 hover:border-green-primary/50 hover:bg-green-lighter disabled:pointer-events-none disabled:opacity-40";

    const anterior = (
        <button type="button" onClick={() => onChange(pagina - 1)} disabled={pagina <= 1} aria-label="Página anterior" className={botaoSeta}>
            <FaChevronLeft aria-hidden />
        </button>
    );

    const proxima = (
        <button type="button" onClick={() => onChange(pagina + 1)} disabled={pagina >= totalPaginas} aria-label="Próxima página" className={botaoSeta}>
            <FaChevronRight aria-hidden />
        </button>
    );

    if (compact) {
        return (
            <nav aria-label={ariaLabel} className={`flex items-center justify-between gap-3 ${className}`}>
                {anterior}

                <p className="text-xs font-semibold text-text-secondary" aria-live="polite">
                    Página <span className="text-text-main">{pagina}</span> de {totalPaginas}
                </p>

                {proxima}
            </nav>
        );
    }

    return (
        <nav aria-label={ariaLabel} className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
            {anterior}

            <ul className="flex flex-wrap items-center justify-center gap-1.5">
                {paginasVisiveis(pagina, totalPaginas).map((item, indice) =>
                    item === "…" ? (
                        <li key={`reticencias-${indice}`} aria-hidden className="px-1 text-text-muted">
                            …
                        </li>
                    ) : (
                        <li key={item}>
                            <button
                                type="button"
                                onClick={() => onChange(item)}
                                aria-label={`Página ${item}`}
                                aria-current={item === pagina ? "page" : undefined}
                                className={`grid h-10 min-w-10 place-items-center rounded-full border px-3 font-heading text-sm font-bold transition duration-300 ${
                                    item === pagina
                                        ? "border-green-primary bg-green-primary text-white shadow-md shadow-green-primary/25"
                                        : "border-border bg-bg-card text-text-secondary hover:border-green-primary/50 hover:bg-green-lighter hover:text-text-main"
                                }`}
                            >
                                {item}
                            </button>
                        </li>
                    ),
                )}
            </ul>

            {proxima}
        </nav>
    );
}