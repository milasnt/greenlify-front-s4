import { useParams, useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import MissionModal from "../../components/MissionModal";
import { missoes } from "../Missoes";

export default function MissaoDetalhe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const missao = missoes.find((item) => item.id === id);

    if (!missao) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
                <h1 className="text-[2.4rem] font-bold text-text-main">
                    Missão não encontrada
                </h1>

                <p className="text-[1.5rem] text-text-secondary">
                    A missão que você está procurando não existe ou foi removida.
                </p>
            </div>
        );
    }

    return (
        <MissionModal
            titulo={missao.titulo}
            descricao={missao.descricao}
            impacto={missao.impacto}
            dificuldade={missao.dificuldade}
            pontos={missao.pontos}
            xp={missao.xp}
            onClose={() => navigate("/missoes")}
            criteria={
                <>
                    {missao.criterios.map((criterio) => (
                        <div key={criterio} className="flex items-start gap-4">
                            <FaCircleCheck className="mt-1 shrink-0 text-green-primary" />
                            <p className="text-[1.5rem] leading-[1.6] text-text-secondary">
                                {criterio}
                            </p>
                        </div>
                    ))}
                </>
            }
        />
    );
}
