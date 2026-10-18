interface RankingItem {
    posicao: number;
    nome: string;
    pontos: number;
    nivel?: string;
}

interface RankingTableProps {
    items: RankingItem[];
    type?: "users" | "groups";
}

export default function RankingTable({ items, type = "users" }: RankingTableProps) {
    const isGroups = type === "groups";

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-card">
            <div className="grid grid-cols-[7rem_1fr_14rem] border-b border-border bg-green-ultra-light px-8 py-5 text-[1.4rem] font-semibold text-text-secondary max-[768px]:grid-cols-[5rem_1fr_9rem] max-[768px]:px-5 max-[480px]:grid-cols-[4rem_1fr_7rem] max-[480px]:px-[1.6rem]">
                <span>Posição</span>

                <span>{isGroups ? "Grupo" : "Usuário"}</span>

                <span className="text-right">
                    {isGroups ? "Selos Verdes" : "Pontos"}
                </span>
            </div>

            {items.map((item) => (
                <div
                    key={`${item.posicao}-${item.nome}`}
                    className={`grid grid-cols-[7rem_1fr_14rem] items-center border-b border-border px-8 py-5 last:border-b-0 max-[768px]:grid-cols-[5rem_1fr_9rem] max-[768px]:px-5 max-[480px]:grid-cols-[4rem_1fr_7rem] max-[480px]:px-[1.6rem] ${item.posicao <= 3 ? "bg-green-ultra-light/40" : ""}`}
                >
                    <div className="flex items-center">
                        <span className="text-[1.5rem] font-bold text-green-primary max-[768px]:text-[1.3rem]">
                            {item.posicao}º
                        </span>
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-[1.5rem] font-semibold text-text-main max-[768px]:text-[1.3rem]">
                            {item.nome}
                        </h3>

                        {item.nivel && (
                            <span className="text-[1.3rem] text-text-secondary max-[768px]:text-[1.2rem]">
                                {item.nivel}
                            </span>
                        )}
                    </div>

                    <span className="text-right text-[1.5rem] font-bold text-text-main max-[768px]:text-[1.35rem]">
                        {item.pontos.toLocaleString("pt-BR")}
                    </span>
                </div>
            ))}
        </div>
    );
}