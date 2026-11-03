import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
    FaChartLine,
    FaCheck,
    FaChevronLeft,
    FaChevronRight,
    FaCircleUser,
    FaFire,
    FaLeaf,
    FaSliders,
    FaVideo,
} from "react-icons/fa6";
import type { Dificuldade, Impacto } from "../../../../components/ui/Badge";
import Feedback from "../../../../components/ui/Feedback";
import ProgressBar from "../../../../components/ui/ProgressBar";
import type { UploadStatus } from "../../../missions/components/Upload";
import { OPCOES_DIFICULDADE, OPCOES_IMPACTO, useFiltroMissoes, usePaginacao } from "../../../missions/hooks/useFiltroMissoes";
import type { Missao } from "../../../missions/types/mission";
import type { DadosContinuas, DadosMensais, DadosPerfil, Ir } from "../../types/demo";
import PhoneTabs from "../PhoneTabs";

const POR_PAGINA = 4;

const bolinhaStyles: Record<Dificuldade, string> = {
    Fácil: "bg-green-light",
    Média: "bg-gold",
    Difícil: "bg-danger",
};

const impactoStyles: Record<Impacto, string> = {
    Baixo: "bg-green-lighter text-green-dark",
    Médio: "bg-gold/20 text-text-main",
    Alto: "bg-danger/10 text-danger",
};

const cardStyles = "flex w-full items-center gap-2 rounded-2xl bg-bg-card p-2 text-left shadow-custom-md";
const botaoRedondoStyles =
    "grid size-7 place-items-center rounded-full border border-border bg-bg-card text-green-primary disabled:opacity-35";

function Paginacao({ pagina, total, onChange }: { pagina: number; total: number; onChange: (pagina: number) => void }) {
    if (total <= 1) return null;

    return (
        <nav aria-label="Paginação" className="mt-3 flex items-center justify-center gap-2 text-[10px] text-text-secondary">
            <button type="button" onClick={() => onChange(pagina - 1)} disabled={pagina === 1} aria-label="Página anterior" className={botaoRedondoStyles}>
                <FaChevronLeft />
            </button>

            <span aria-live="polite">
                Página {pagina} de {total}
            </span>

            <button type="button" onClick={() => onChange(pagina + 1)} disabled={pagina === total} aria-label="Próxima página" className={botaoRedondoStyles}>
                <FaChevronRight />
            </button>
        </nav>
    );
}

function Chips({ titulo, opcoes, atual, onChange }: { titulo: string; opcoes: string[]; atual: string; onChange: (valor: string) => void }) {
    return (
        <div role="group" aria-label={titulo}>
            <p className="mb-1 text-[9px] font-bold text-text-secondary">{titulo}</p>

            <div className="flex flex-wrap gap-1">
                {opcoes.map((opcao) => (
                    <button
                        key={opcao}
                        type="button"
                        aria-pressed={atual === opcao}
                        onClick={() => onChange(opcao)}
                        className={`rounded-full border px-2 py-1 text-[9px] transition duration-300 ${
                            atual === opcao
                                ? "border-green-primary bg-green-primary text-white"
                                : "border-border bg-bg-card text-text-secondary"
                        }`}
                    >
                        {opcao}
                    </button>
                ))}
            </div>
        </div>
    );
}

interface PhoneMissoesProps {
    continuas: DadosContinuas;
    mensais: DadosMensais;
    dados: DadosPerfil;
    onAbrir: (id: string) => void;
    onIr: Ir;
}

export default function PhoneMissoes({ continuas, mensais, dados, onAbrir, onIr }: PhoneMissoesProps) {
    const [aba, setAba] = useState<"continuas" | "mensais">("continuas");
    const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    const filtro = useFiltroMissoes(continuas.missoes, POR_PAGINA);
    const paginaMensais = usePaginacao(mensais.missoes, POR_PAGINA);

    const posicao = dados.impacto?.posicaoRanking ?? 0;
    const streak = dados.impacto?.mesesDeStreak;

    return (
        <>
            <div className="mb-3 flex items-center gap-2 rounded-2xl bg-green-lighter p-2.5 text-green-primary">
                <FaChartLine className="shrink-0 text-2xl" aria-hidden />

                <div className="grid min-w-0 flex-1 gap-0.5">
                    <strong className="text-[11px] text-text-main">Sua posição no ranking</strong>
                    <b className="text-xl">{posicao > 0 ? `#${posicao}` : "—"}</b>
                    <small className="text-[9px] text-text-secondary">Continue completando missões para evoluir!</small>
                </div>

                <button
                    type="button"
                    onClick={() => onIr("ranking")}
                    className="flex items-center gap-1 whitespace-nowrap rounded-full border border-green-primary bg-bg-card px-2 py-1 text-[9px] font-semibold"
                >
                    Ver ranking <FaChevronRight aria-hidden />
                </button>
            </div>

            <PhoneTabs
                items={[
                    { id: "continuas", label: "Contínuas" },
                    { id: "mensais", label: "Mensais" },
                ]}
                active={aba}
                onChange={setAba}
                ariaLabel="Tipo de missão"
            />

            {aba === "continuas" ? (
                <>
                    <button
                        type="button"
                        aria-expanded={filtrosAbertos}
                        onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                        className={`mb-2.5 flex items-center gap-1 rounded-full border border-green-primary px-2.5 py-1.5 text-[9px] font-semibold transition duration-300 ${
                            filtrosAbertos ? "bg-green-primary text-white" : "bg-bg-card text-green-primary"
                        }`}
                    >
                        <FaSliders aria-hidden /> Filtrar
                        {filtro.quantidadeFiltros > 0 && <b>({filtro.quantidadeFiltros})</b>}
                    </button>

                    {filtrosAbertos && (
                        <div className="mb-2.5 grid gap-2 rounded-xl border border-border bg-green-ultra-light p-2.5">
                            <Chips titulo="Impacto ambiental" opcoes={OPCOES_IMPACTO} atual={filtro.impacto} onChange={filtro.setImpacto} />
                            <Chips titulo="Dificuldade" opcoes={OPCOES_DIFICULDADE} atual={filtro.dificuldade} onChange={filtro.setDificuldade} />

                            {filtro.filtrosAtivos && (
                                <button type="button" onClick={filtro.limpar} className="justify-self-start text-[9px] font-bold text-green-dark underline">
                                    Limpar filtros
                                </button>
                            )}
                        </div>
                    )}

                    {continuas.carregando ? (
                        <p className="py-3 text-[10px] text-text-secondary">Carregando missões...</p>
                    ) : continuas.erro ? (
                        <Feedback tipo="erro" mensagem={continuas.erro} />
                    ) : filtro.total === 0 ? (
                        <Feedback tipo="vazio" mensagem="Nenhuma missão encontrada." />
                    ) : (
                        <>
                            <p role="status" className="mb-2 text-[9px] text-text-secondary">
                                {filtro.total} {filtro.total === 1 ? "missão encontrada" : "missões encontradas"}
                            </p>

                            <ul className="grid gap-2">
                                {filtro.visiveis.map((missao) => (
                                    <li key={missao.id}>
                                        <button type="button" onClick={() => onAbrir(missao.id)} className={cardStyles}>
                                            <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-green-primary text-white">
                                                <strong className="text-[15px]">+{missao.pontos}</strong>

                                                <span
                                                    role="img"
                                                    aria-label={`Dificuldade ${missao.dificuldade.toLowerCase()}`}
                                                    className={`absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white ${bolinhaStyles[missao.dificuldade]}`}
                                                />
                                            </span>

                                            <span className="grid min-w-0 flex-1 gap-1">
                                                <strong className="text-[11px] leading-tight text-text-main">{missao.titulo}</strong>

                                                <em className={`w-fit rounded-full px-1.5 py-0.5 text-[9px] not-italic ${impactoStyles[missao.impacto]}`}>
                                                    Impacto: {missao.impacto}
                                                </em>
                                            </span>

                                            <span className="whitespace-nowrap rounded-full bg-green-primary px-2 py-1.5 text-[9px] text-white">Começar</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <Paginacao pagina={filtro.pagina} total={filtro.totalPaginas} onChange={filtro.setPagina} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className="mb-2.5 flex items-center gap-2 rounded-2xl bg-bg-card p-2.5 shadow-custom-md">
                        <FaFire className="shrink-0 text-2xl text-green-primary" aria-hidden />

                        <div className="min-w-0 flex-1">
                            <strong className="text-[11px] text-text-main">Streak</strong>
                            <p className="mt-1 text-[9px] leading-snug text-text-secondary">Complete 1 missão mensal e mantenha seu streak!</p>
                        </div>

                        <b className="text-center text-lg text-green-primary">
                            {streak ?? "—"}
                            <small className="block text-[8px] font-medium">meses em sequência</small>
                        </b>
                    </div>

                    {mensais.carregando ? (
                        <p className="py-3 text-[10px] text-text-secondary">Carregando missões...</p>
                    ) : mensais.erro ? (
                        <Feedback tipo="erro" mensagem={mensais.erro} />
                    ) : mensais.missoes.length === 0 ? (
                        <Feedback tipo="vazio" mensagem="Nenhuma missão mensal vigente no momento." />
                    ) : (
                        <>
                            <ul className="grid gap-2">
                                {paginaMensais.visiveis.map((missao) => (
                                    <li key={missao.id} className={cardStyles}>
                                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-green-primary text-lg text-white">
                                            <FaLeaf aria-hidden />
                                        </span>

                                        <span className="grid min-w-0 flex-1 gap-1">
                                            <strong className="text-[11px] leading-tight text-text-main">{missao.titulo}</strong>
                                            <small className="text-[9px] text-text-secondary">
                                                Progresso: {missao.progresso}/{missao.meta}
                                            </small>
                                            <ProgressBar value={missao.progresso} max={missao.meta} size="sm" label={missao.titulo} />
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Paginacao pagina={paginaMensais.pagina} total={paginaMensais.totalPaginas} onChange={paginaMensais.setPagina} />
                        </>
                    )}
                </>
            )}
        </>
    );
}

export function PhoneMissaoDetalhe({ missao }: { missao: Missao | undefined }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<UploadStatus>("idle");
    const [arquivo, setArquivo] = useState<string | null>(null);

    if (!missao) return <Feedback tipo="vazio" mensagem="Missão não encontrada." />;

    function escolherArquivo(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setArquivo(file.name);
        setStatus("selected");
    }

    function enviarVideo() {
        setStatus("sending");
        setTimeout(() => setStatus("success"), 1500);
    }

    const titulosBotao = {
        idle: "Selecionar vídeo de comprovação",
        selected: "Enviar vídeo de comprovação",
        sending: "Enviando vídeo...",
        success: "Vídeo enviado",
    };

    const secaoStyles = "mb-1.5 flex items-center gap-1.5 font-heading text-xs font-bold text-text-main";
    const textoStyles = "text-[10px] leading-relaxed text-text-secondary";

    return (
        <div className="grid gap-3.5">
            <article className="grid grid-cols-[2.75rem_1fr] items-center gap-2 rounded-2xl bg-bg-card p-2.5 shadow-custom-md">
                <span className="grid size-11 place-items-center rounded-xl bg-green-primary text-white">
                    <strong className="text-[15px]">+{missao.pontos}</strong>
                </span>

                <div className="grid min-w-0 gap-1">
                    <strong className="text-[11px] text-text-main">{missao.titulo}</strong>
                    <small className="text-[9px] leading-snug text-text-secondary">Desafios criados pela SoulUp especialmente para você!</small>
                </div>

                <div className="col-span-full grid grid-cols-3 border-t border-border pt-2 text-center text-[9px] text-text-secondary">
                    {[
                        { rotulo: "Nível", valor: missao.dificuldade },
                        { rotulo: "Impacto", valor: missao.impacto },
                        { rotulo: "Pontuação", valor: `+${missao.pontos}` },
                    ].map((item) => (
                        <span key={item.rotulo} className="grid gap-1 border-r border-border last:border-0">
                            {item.rotulo}
                            <strong className="text-[11px] text-green-primary">{item.valor}</strong>
                        </span>
                    ))}
                </div>
            </article>

            <section>
                <h3 className={secaoStyles}>
                    <FaCircleUser className="text-green-primary" aria-hidden /> Sobre a missão
                </h3>
                <p className={textoStyles}>{missao.descricao}</p>
            </section>

            <section>
                <h3 className={secaoStyles}>
                    <FaCheck className="text-green-primary" aria-hidden /> Como comprovar
                </h3>

                {missao.criterios.length > 0 ? (
                    <ul className={`list-disc space-y-1 pl-4 ${textoStyles}`}>
                        {missao.criterios.map((criterio) => (
                            <li key={criterio}>{criterio}</li>
                        ))}
                    </ul>
                ) : (
                    <p className={textoStyles}>Grave um vídeo mostrando a ação e envie para validação.</p>
                )}
            </section>

            <div>
                <input ref={inputRef} type="file" accept="video/mp4,video/quicktime" hidden onChange={escolherArquivo} />

                <button
                    type="button"
                    onClick={status === "selected" ? enviarVideo : () => inputRef.current?.click()}
                    disabled={status === "sending" || status === "success"}
                    className="grid w-full justify-items-center gap-1.5 rounded-2xl border-[1.5px] border-dashed border-green-primary bg-green-ultra-light px-2 py-3.5 text-green-primary disabled:opacity-70"
                >
                    <FaVideo className="text-2xl" aria-hidden />
                    <strong className="text-[11px]">{titulosBotao[status]}</strong>
                    <small className="text-[9px] text-text-secondary">{arquivo ?? "Toque para escolher um vídeo"}</small>
                    <span className="text-[9px] text-text-muted">Formatos aceitos: MP4, MOV</span>
                </button>

                {status === "success" && (
                    <p role="status" className="mt-2 rounded-xl bg-green-lighter p-2.5 text-[10px] leading-relaxed text-green-dark">
                        <strong>Envio simulado.</strong> Nesta demonstração a análise automática ainda não está conectada.
                    </p>
                )}
            </div>
        </div>
    );
}
