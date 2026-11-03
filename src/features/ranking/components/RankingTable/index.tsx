import { FaCrown, FaUsers } from "react-icons/fa6";
import IconBox from "../../../../components/ui/IconBox";

interface RankingItem {
    posicao: number;
    nome: string;
    pontos: number;
    nivel?: string;
}

interface RankingTableProps {
    items: RankingItem[];
    type?: "users" | "groups";
    variant?: "table" | "podium";
    highlight?: string;
    unit?: string;
    columnLabel?: string;
    caption?: string;
}

export default function RankingTable({
    items,
    type = "users",
    variant = "table",
    highlight,
    unit = "pts",
    columnLabel,
    caption,

}: RankingTableProps) {
    const isGroups = type === "groups";

    if (variant === "podium") {

        const ordered = [items[1], items[0], items[2]].filter((item): item is RankingItem => Boolean(item));

        const pedestalStyles: Record<number, string> = {
            1: "h-36 bg-linear-to-b from-green-light to-green-primary text-white shadow-lg shadow-green-primary/25",
            2: "h-24 bg-green-lighter text-green-dark",
            3: "h-20 bg-purple-lighter text-purple-dark",
        };

        return (
            <ol className="flex items-end justify-center gap-2 sm:gap-5" aria-label="Pódio">
                {ordered.map((item) => {
                    const position = items.indexOf(item) + 1;
                    const isFirst = position === 1;

                    return (
                        <li key={item.nome} className="flex min-w-0 w-full max-w-40 flex-col items-center gap-3">
                            <div className="relative">
                                {isFirst && (
                                    <FaCrown className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl text-gold" aria-hidden />
                                )}

                                {isGroups ? (
                                    <IconBox icon={<FaUsers />} variant="purple" size={isFirst ? "xl" : "lg"} />
                                ) : (
                                    <IconBox name={item.nome} size={isFirst ? "xl" : "lg"} ring={isFirst} />
                                )}
                            </div>

                            <div className="w-full min-w-0 text-center">
                                <p className="truncate font-heading text-xs sm:text-sm font-bold text-text-main">
                                    {item.nome}
                                </p>

                                {item.nivel && (
                                    <p className="text-xs text-text-secondary">
                                        {item.nivel}
                                    </p>
                                )}
                            </div>

                            <div className={`flex w-full flex-col items-center justify-end rounded-t-3xl pb-4 pt-5 ${pedestalStyles[position] ?? pedestalStyles[3]}`}>
                                <span className="font-heading text-2xl font-extrabold sm:text-3xl">
                                    {position}º
                                </span>

                                <span className="mt-1 text-xs font-bold">
                                    {item.pontos.toLocaleString("pt-BR")} {unit}
                                </span>

                                {caption && (
                                    <span className={`text-[10px] ${isFirst ? "text-white/70" : "text-text-secondary"}`}>
                                        {caption}
                                    </span>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-bg-card">
            <div className="grid grid-cols-[2.5rem_1fr_auto] gap-3 border-b border-border bg-bg-soft px-4 py-3 sm:grid-cols-[4rem_1fr_auto] sm:gap-4 sm:px-5 text-xs font-bold uppercase tracking-wider text-text-secondary">
                <span>Posição</span>

                <span>{isGroups ? "Grupo" : "Usuário"}</span>

                <span className="text-right">
                    { columnLabel ?? (isGroups ? "Selos Verdes" : "Pontos")}
                </span>
            </div>

            {items.map((item) => {
                const isCurrent = highlight === item.nome;

                return (
                    <div
                        key={`${item.posicao}-${item.nome}`}
                        className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0 sm:grid-cols-[4rem_1fr_auto] sm:gap-4 sm:px-5 sm:py-4 ${
                            isCurrent ? "bg-green-lighter/70 ring-1 ring-inset ring-green-primary/30" : ""
                        }`}
                    >
                        <span className={`text-center font-heading text-lg font-extrabold ${isCurrent ? "text-green-primary" : "text-text-secondary"}`}>
                            {item.posicao}º
                        </span>

                        <div className="flex min-w-0 items-center gap-3">
                            {isGroups ? (
                                <IconBox icon={<FaUsers />} variant="purple" />
                            ) : (
                                <IconBox name={item.nome} />
                            )}

                            <div className="min-w-0">
                                <h3 className="truncate font-heading text-sm font-bold text-text-main">
                                    {item.nome}
                                    {isCurrent && (
                                        <span className="ml-2 rounded-full bg-green-primary px-2 py-0.5 text-[10px] font-bold text-white">
                                            você
                                        </span>
                                    )}
                                </h3>

                                {item.nivel && (
                                    <span className="text-xs text-text-secondary">
                                        {item.nivel}
                                    </span>
                                )}
                            </div>
                        </div>

                        <span className="text-right font-heading text-sm font-extrabold text-text-main">
                            {item.pontos.toLocaleString("pt-BR")}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}