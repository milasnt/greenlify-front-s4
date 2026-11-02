import { useParams } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import MissionModal from "../../features/missions/components/MissionModal";
import { useMissaoContinua } from "../../features/missions/hooks/useMissoes";

export default function MissaoDetalhe({ missaoId }: { missaoId?: string }) {
    const { id: idDaRota } = useParams<{ id: string }>();
    const id = missaoId ?? idDaRota;
    const { missao, carregando, erro } = useMissaoContinua(id);

    if (carregando) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
                <div className="h-96 animate-pulse rounded-3xl border border-border bg-bg-card" />
            </div>
        );
    }

    if (erro || !missao) {
        return (
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-6 py-24 text-center">
                <h1 className="font-heading text-3xl font-extrabold text-text-main">
                    {erro ? "Não foi possível carregar a missão" : "Missão não encontrada"}
                </h1>

                <p className="text-text-secondary">
                    {erro ?? "A missão que você está procurando não existe ou foi removida."}
                </p>
            </div>
        );
    }

    return (
        <MissionModal
            id={missao.id}
            titulo={missao.titulo}
            descricao={missao.descricao}
            impacto={missao.impacto}
            dificuldade={missao.dificuldade}
            pontos={missao.pontos}
            xp={missao.xp}
            limiteRealizacoes={missao.limiteRealizacoes}
            criteria={
                <>
                    {missao.criterios.map((criterio) => (
                        <div key={criterio} className="flex items-start gap-4">
                            <FaCircleCheck className="mt-1 shrink-0 text-green-primary" />
                            <p className="leading-relaxed text-text-secondary">
                                {criterio}
                            </p>
                        </div>
                    ))}
                </>
            }
        />
    );
}