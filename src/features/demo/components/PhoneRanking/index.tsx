import { useState } from "react";
import { FaRegCircleUser, FaTrophy, FaUsers } from "react-icons/fa6";
import Feedback from "../../../../components/ui/Feedback";
import { useRankings } from "../../../ranking/hooks/useRankings";
import { numero } from "../../utils/formatar";
import PhoneTabs from "../PhoneTabs";

type Aba = "mensal" | "grupos" | "allTime";

const abas: { id: Aba; label: string }[] = [
    { id: "mensal", label: "Mensal" },
    { id: "grupos", label: "Grupos" },
    { id: "allTime", label: "All-Time" },
];

const intros: Record<Aba, { titulo: string; texto: string }> = {
    mensal: { titulo: "Ranking mensal", texto: "Posição definida pelos pontos ganhos no mês." },
    grupos: { titulo: "Ranking de grupos", texto: "Posição definida pelos Selos Verdes coletados." },
    allTime: { titulo: "Ranking geral", texto: "Missões concluídas desde o início." },
};

const medalhas = ["🥇", "🥈", "🥉"];

export default function PhoneRanking() {
    const [aba, setAba] = useState<Aba>("mensal");
    const rankings = useRankings();

    const linhas = aba === "grupos" ? rankings.grupos : aba === "allTime" ? rankings.allTime : rankings.mensal;
    const carregando = aba === "allTime" ? rankings.carregandoAllTime : rankings.carregando;
    const erro = aba === "allTime" ? rankings.erroAllTime : rankings.erro;
    const unidade = aba === "grupos" ? "selos" : aba === "allTime" ? "missões" : "pontos";

    return (
        <>
            <div className="mb-3 flex items-center gap-2 rounded-2xl bg-green-lighter p-2.5 text-green-primary">
                <FaTrophy className="shrink-0 text-2xl" aria-hidden />

                <div className="grid min-w-0 flex-1 gap-0.5">
                    <strong className="text-[11px] text-text-main">{intros[aba].titulo}</strong>
                    <p className="text-[9px] text-text-secondary">{intros[aba].texto}</p>
                </div>
            </div>

            <PhoneTabs items={abas} active={aba} onChange={setAba} ariaLabel="Tipo de ranking" />

            {carregando ? (
                <p className="py-3 text-[10px] text-text-secondary">Carregando ranking...</p>
            ) : erro ? (
                <Feedback tipo="erro" mensagem={erro} />
            ) : linhas.length === 0 ? (
                <Feedback tipo="vazio" mensagem="O ranking ainda não foi calculado." />
            ) : (
                <ol className="rounded-2xl bg-bg-card px-2 py-1 shadow-custom-md">
                    {linhas.slice(0, 10).map((linha, index) => (
                        <li key={linha.id} className="grid grid-cols-[1.25rem_1.75rem_minmax(0,1fr)_auto] items-center gap-1.5 border-b border-border py-2 last:border-0">
                            <span className="text-center text-xs">{index < 3 ? medalhas[index] : linha.posicao}</span>

                            <span className="grid size-7 place-items-center rounded-full bg-green-lighter text-sm text-green-primary">
                                {aba === "grupos" ? <FaUsers aria-hidden /> : <FaRegCircleUser aria-hidden />}
                            </span>

                            <strong className="truncate text-[10px] text-text-main">{linha.nome}</strong>

                            <b className="text-right text-[11px] text-green-primary">
                                {numero(linha.pontos)}
                                <small className="block text-[8px] font-normal text-text-secondary">{unidade}</small>
                            </b>
                        </li>
                    ))}
                </ol>
            )}
        </>
    );
}
