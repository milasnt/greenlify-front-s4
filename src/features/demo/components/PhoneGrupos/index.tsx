import { FaArrowLeft, FaChevronRight, FaLeaf, FaRegCircleUser, FaUsers } from "react-icons/fa6";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import Feedback from "../../../../components/ui/Feedback";
import { useGrupos, useResumoGrupo } from "../../../groups/hooks/useGroups";
import type { GrupoAPI } from "../../../groups/types/group";

interface PhoneGruposProps {
    meuGrupo: GrupoAPI | null;
    onAbrir: (id: number) => void;
}

export default function PhoneGrupos({ meuGrupo, onAbrir }: PhoneGruposProps) {
    const { grupos, carregando, erro } = useGrupos();

    return (
        <>
            <h1 className="font-heading text-xl font-bold text-text-main">Grupos</h1>
            <p className="mb-3 mt-1 text-[10px] leading-relaxed text-text-secondary">
                Veja os grupos da comunidade e quantos Selos Verdes cada um já coletou.
            </p>

            {meuGrupo ? (
                <button
                    type="button"
                    onClick={() => onAbrir(meuGrupo.idGrupo)}
                    className="grid w-full justify-items-center gap-1.5 rounded-2xl bg-gradient-purple px-2.5 py-3.5 text-center text-white"
                >
                    <span className="grid size-12 place-items-center rounded-full border-2 border-white/60 bg-white/20 text-2xl">
                        <FaUsers aria-hidden />
                    </span>

                    <strong className="text-[13px]">{meuGrupo.nome}</strong>
                    <span className="text-[10px] leading-snug text-white/90">Acompanhe os integrantes e os Selos Verdes coletados.</span>

                    <b className="mt-1 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] text-purple-primary">
                        Ver meu grupo <FaChevronRight aria-hidden />
                    </b>
                </button>
            ) : (
                <Feedback tipo="vazio" mensagem="Você ainda não participa de um grupo." />
            )}

            <h3 className="mb-2 mt-4 font-heading text-[13px] font-bold text-text-main">Todos os grupos</h3>

            {carregando ? (
                <p className="py-3 text-[10px] text-text-secondary">Carregando grupos...</p>
            ) : erro ? (
                <Feedback tipo="erro" mensagem={erro} />
            ) : grupos.length === 0 ? (
                <Feedback tipo="vazio" mensagem="Nenhum grupo cadastrado até o momento." />
            ) : (
                <ul>
                    {grupos.map((grupo, index) => (
                        <li key={grupo.id} className="border-b border-border last:border-0">
                            <button type="button" onClick={() => onAbrir(grupo.id)} className="flex w-full items-center gap-2 py-2 text-left">
                                <span
                                    className={`grid size-9 shrink-0 place-items-center rounded-xl text-base ${
                                        index % 2 ? "bg-purple-lighter text-purple-primary" : "bg-green-lighter text-green-primary"
                                    }`}
                                >
                                    {index % 2 ? <FaUsers aria-hidden /> : <FaLeaf aria-hidden />}
                                </span>

                                <span className="grid min-w-0 flex-1 gap-0.5">
                                    <strong className="flex flex-wrap items-center gap-1 text-[11px] text-text-main">
                                        {grupo.nome}
                                        {meuGrupo?.idGrupo === grupo.id && <Badge variant="purple">Meu grupo</Badge>}
                                    </strong>

                                    <small className="text-[9px] text-text-secondary">
                                        {grupo.membros} {grupo.membros === 1 ? "integrante" : "integrantes"} · {grupo.selosVerdes ?? 0} selos
                                    </small>
                                </span>

                                <FaChevronRight className="shrink-0 text-text-muted" aria-hidden />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

interface PhoneGrupoDetalheProps {
    idGrupo: number;
    meu: boolean;
    onVoltar: () => void;
    onSelos: () => void;
    onMissoes: () => void;
}

export function PhoneGrupoDetalhe({ idGrupo, meu, onVoltar, onSelos, onMissoes }: PhoneGrupoDetalheProps) {
    const { resumo, carregando, erro } = useResumoGrupo(idGrupo);
    const selosColetados = resumo?.selos.filter((selo) => selo.quantidade > 0) ?? [];

    return (
        <div className="grid gap-3.5">
            <button type="button" onClick={onVoltar} aria-label="Voltar" className="w-fit text-base text-purple-primary">
                <FaArrowLeft />
            </button>

            {carregando ? (
                <p className="text-[10px] text-text-secondary">Carregando grupo...</p>
            ) : erro || !resumo ? (
                <Feedback tipo="erro" mensagem={erro ?? "Grupo não encontrado."} />
            ) : (
                <>
                    <div className="grid gap-1 border-b border-border pb-3">
                        <strong className="flex flex-wrap items-center gap-1.5 font-heading text-lg text-text-main">
                            {resumo.nomeGrupo}
                            {meu && <Badge variant="purple">Meu grupo</Badge>}
                        </strong>

                        <small className="text-xs text-text-secondary">
                            {resumo.integrantes.length} {resumo.integrantes.length === 1 ? "integrante" : "integrantes"}
                        </small>
                    </div>

                    <div className="grid gap-1 rounded-xl bg-green-lighter p-2.5">
                        <strong className="font-heading text-2xl text-green-dark">{resumo.totalSelos}</strong>
                        <span className="text-[10px] text-text-secondary">selos coletados pelo grupo</span>
                        <small className="text-[9px] text-green-dark">
                            {resumo.tiposColetados} de {resumo.totalTipos} tipos
                        </small>

                        {selosColetados.length > 0 && (
                            <ul className="mt-1 flex flex-wrap gap-1">
                                {selosColetados.map((selo) => (
                                    <li key={selo.idSelo}>
                                        <Badge variant="purple">
                                            {selo.nome} · {selo.quantidade}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <h3 className="mb-1 font-heading text-[13px] font-bold text-text-main">Integrantes</h3>

                        {resumo.integrantes.length === 0 && <p className="text-[10px] text-text-secondary">Este grupo ainda não tem integrantes.</p>}

                        {resumo.integrantes.map((integrante) => (
                            <div key={integrante.idUsuario} className="flex items-center gap-1.5 border-b border-border py-2 last:border-0">
                                <span className="grid size-4.5 shrink-0 place-items-center rounded-full bg-gold/25 text-[9px] font-bold text-text-main">
                                    {integrante.posicao}
                                </span>

                                <FaRegCircleUser className="shrink-0 text-2xl text-text-muted" aria-hidden />
                                <strong className="min-w-0 flex-1 truncate text-[10px] text-text-main">{integrante.nome}</strong>

                                <b className="text-[10px] text-purple-primary">
                                    {integrante.selos} {integrante.selos === 1 ? "selo" : "selos"}
                                </b>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {meu && (
                <Button size="sm" full onClick={onSelos}>
                    <FaLeaf aria-hidden /> Coletar mais Selos Verdes
                </Button>
            )}

            <Button size="sm" variant="secondary" full onClick={onMissoes}>
                Ver missões
            </Button>
        </div>
    );
}
