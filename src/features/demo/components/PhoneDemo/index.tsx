import { useState } from "react";
import type { ReactNode } from "react";
import {
    FaArrowLeft,
    FaBagShopping,
    FaChevronRight,
    FaCircleUser,
    FaComment,
    FaFire,
    FaHeart,
    FaHouse,
    FaLeaf,
    FaMagnifyingGlass,
    FaPlus,
    FaRegCircleUser,
    FaRegMessage,
    FaShareNodes,
    FaTrophy,
    FaUsers,
    FaVideo,
    FaWallet,
} from "react-icons/fa6";
import Button from "../../../../components/ui/Button";
import { useMissoesContinuas, useMissoesMensais } from "../../../missions/hooks/useMissoes";
import { usePerfil } from "../../../profile/hooks/useProfile";
import type { Tela } from "../../types/demo";
import { traco } from "../../utils/formatar";
import PhoneGrupos, { PhoneGrupoDetalhe } from "../PhoneGrupos";
import PhoneMissoes, { PhoneMissaoDetalhe } from "../PhoneMissoes";
import PhonePerfil, { PhoneResumo } from "../PhonePerfil";
import PhoneRanking from "../PhoneRanking";
import PhoneSelos from "../PhoneSelos";

const titulos: Partial<Record<Tela, string>> = {
    missoes: "Missões Sustentáveis",
    detalhe: "Missão Contínua",
    ranking: "Rankings",
    perfil: "Meu perfil",
    resumo: "Meu resumo",
    coletarSelos: "Coletar Selos Verdes",
};

const voltarPara: Partial<Record<Tela, Tela>> = {
    missoes: "centralMissoes",
    detalhe: "missoes",
    ranking: "missoes",
    resumo: "perfil",
};

const semCabecalho: Tela[] = ["home", "grupos", "grupo", "centralMissoes", "criar", "reels", "conversas"];

const placeholders = {
    criar: { icone: <FaPlus />, titulo: "Criar publicação", botao: "Explorar Greenlify", destino: "centralMissoes" },
    reels: { icone: <FaVideo />, titulo: "Reels", botao: "Explorar Greenlify", destino: "centralMissoes" },
    conversas: { icone: <FaComment />, titulo: "Conversas", botao: "Ver grupos", destino: "grupos" },
} as const;

const stories: { icone: ReactNode; rotulo: string; destino: Tela; estilo: string }[] = [
    { icone: <FaCircleUser />, rotulo: "Seu story", destino: "perfil", estilo: "border-purple-primary bg-purple-lighter text-purple-primary" },
    { icone: <FaLeaf />, rotulo: "Greenlify", destino: "centralMissoes", estilo: "border-green-primary bg-green-lighter text-green-primary" },
    { icone: <FaUsers />, rotulo: "Grupos", destino: "grupos", estilo: "border-purple-light bg-purple-lighter text-purple-dark" },
];

const iconeTopoStyles = "grid min-w-6 place-items-center text-base transition duration-300 hover:text-purple-primary";

interface CategoriaProps {
    tom: "purple" | "green";
    icone: ReactNode;
    titulo: string;
    texto: string;
    quantidade: string;
    legenda: string;
    progresso: number;
    rodape: string;
    percentual?: string;
    tag: string;
    onClick: () => void;
}

const categoriaStyles = {
    purple: {
        card: "border-purple-lighter bg-linear-to-br from-white to-purple-lighter/60",
        icone: "bg-purple-lighter text-purple-primary",
        trilha: "bg-purple-lighter",
        barra: "bg-purple-primary",
        destaque: "text-purple-primary",
        tag: "bg-purple-lighter text-purple-dark",
    },
    green: {
        card: "border-green-lighter bg-linear-to-br from-white to-green-lighter/60",
        icone: "bg-green-lighter text-green-primary",
        trilha: "bg-green-lighter",
        barra: "bg-green-primary",
        destaque: "text-green-dark",
        tag: "bg-green-lighter text-green-dark",
    },
};

function Categoria({ tom, icone, titulo, texto, quantidade, legenda, progresso, rodape, percentual, tag, onClick }: CategoriaProps) {
    const estilo = categoriaStyles[tom];

    return (
        <button
            type="button"
            onClick={onClick}
            className={`mb-3 grid w-full grid-cols-[3rem_minmax(0,1fr)_1rem] items-center gap-2.5 rounded-3xl border p-3.5 text-left shadow-custom-md ${estilo.card}`}
        >
            <span className={`grid size-12 place-items-center rounded-2xl text-xl ${estilo.icone}`}>{icone}</span>

            <span className="grid min-w-0 gap-1">
                <strong className="text-[13px] text-text-main">{titulo}</strong>
                <small className="text-[10px] leading-snug text-text-secondary">{texto}</small>
            </span>

            <FaChevronRight className="text-text-muted" aria-hidden />

            <span className="col-span-full mt-1 flex flex-wrap items-baseline gap-1 text-[10px] text-text-secondary">
                <strong className="font-heading text-xl text-text-main">{quantidade}</strong> missões disponíveis
                <small className="w-full text-[10px]">{legenda}</small>
            </span>

            <span className={`col-span-full block h-1.5 overflow-hidden rounded-full ${estilo.trilha}`}>
                <i className={`block h-full rounded-full ${estilo.barra}`} style={{ width: `${progresso}%` }} />
            </span>

            <span className="col-span-full flex justify-between gap-2 text-[10px] text-text-secondary">
                {rodape}
                {percentual && <strong className={estilo.destaque}>{percentual}</strong>}
            </span>

            <span className="col-span-full flex">
                <small className={`rounded-full px-2.5 py-1.5 text-[10px] ${estilo.tag}`}>{tag}</small>
            </span>
        </button>
    );
}

export default function PhoneDemo() {
    const [tela, setTela] = useState<Tela>("home");
    const [origemSelos, setOrigemSelos] = useState<Tela>("perfil");
    const [missaoId, setMissaoId] = useState<string | null>(null);
    const [grupoId, setGrupoId] = useState<number | null>(null);
    const [curtido, setCurtido] = useState(false);
    const [aviso, setAviso] = useState<string | null>(null);

    const dadosPerfil = usePerfil();
    const continuas = useMissoesContinuas();
    const mensais = useMissoesMensais();

    const meuGrupo = dadosPerfil.usuario?.grupo ?? null;
    const missaoAtual = continuas.missoes.find((missao) => missao.id === missaoId);

    const metaMensal = mensais.missoes.reduce((soma, missao) => soma + missao.meta, 0);
    const feitoMensal = mensais.missoes.reduce((soma, missao) => soma + Math.min(missao.progresso, missao.meta), 0);
    const percentualMensal = metaMensal > 0 ? Math.round((feitoMensal / metaMensal) * 100) : 0;
    const carregandoMissoes = continuas.carregando || mensais.carregando;

    const metasMensais = mensais.carregando
        ? "Carregando metas mensais..."
        : mensais.erro
          ? "Metas mensais indisponíveis"
          : `${feitoMensal} de ${metaMensal} metas mensais`;

    function ir(nova: Tela) {
        if (nova === "coletarSelos") setOrigemSelos(tela);
        setAviso(null);
        setTela(nova);
    }

    function abrirMissao(id: string) {
        setMissaoId(id);
        ir("detalhe");
    }

    function abrirGrupo(id: number) {
        setGrupoId(id);
        ir("grupo");
    }

    const emMissoes = tela === "missoes" || tela === "detalhe" || tela === "ranking";
    const placeholder = tela === "criar" || tela === "reels" || tela === "conversas" ? placeholders[tela] : null;

    const navStyles = (ativo: boolean) =>
        `grid size-8 place-items-center text-base transition duration-300 ${ativo ? "text-purple-primary" : "text-text-muted"}`;

    return (
        <div className="mx-auto h-139 w-79 max-w-full rounded-[2.5rem] border-8 border-night bg-night shadow-2xl shadow-green-primary/20">
            <div
                role="region"
                aria-label="Simulação do app SoulUp com o módulo Greenlify"
                className="flex h-full flex-col overflow-hidden rounded-4xl bg-bg-card text-xs text-text-main"
            >
                <header className="flex h-10 shrink-0 items-center gap-1.5 border-b border-border px-2">
                    <button
                        type="button"
                        onClick={() => ir("perfil")}
                        aria-label="Abrir carteira"
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-purple px-2.5 py-1.5 text-[11px] text-white"
                    >
                        <FaWallet className="text-sm" aria-hidden />
                        <strong>{traco(dadosPerfil.impacto?.pontos)} Pts</strong>
                    </button>

                    <button type="button" onClick={() => ir("perfil")} aria-label="Sacola de recompensas" className={`${iconeTopoStyles} text-text-main`}>
                        <FaBagShopping />
                    </button>

                    <span className="flex-1" />

                    <button type="button" onClick={() => ir("grupos")} aria-label="Grupos" className={`${iconeTopoStyles} text-text-main`}>
                        <FaMagnifyingGlass />
                    </button>

                    <button
                        type="button"
                        onClick={() => ir("centralMissoes")}
                        aria-label="Abrir missões"
                        className={`${iconeTopoStyles} ${emMissoes ? "text-purple-primary" : "text-text-main"}`}
                    >
                        <FaFire />
                    </button>

                    <button
                        type="button"
                        onClick={() => ir("perfil")}
                        aria-label="Abrir perfil"
                        className="grid size-7 shrink-0 place-items-center rounded-full bg-bg-muted text-base text-text-muted"
                    >
                        <FaRegCircleUser />
                    </button>
                </header>

                {!semCabecalho.includes(tela) && (
                    <div className="grid shrink-0 grid-cols-[1.5rem_1fr_1.5rem] items-center gap-1 px-2 pt-1.5">
                        <button
                            type="button"
                            onClick={() => ir(tela === "coletarSelos" ? origemSelos : (voltarPara[tela] ?? "home"))}
                            aria-label="Voltar"
                            className="text-left text-base text-text-secondary"
                        >
                            <FaArrowLeft />
                        </button>

                        <h2 className="text-center font-heading text-sm font-bold">{titulos[tela]}</h2>
                        <span />
                    </div>
                )}

                <main
                    key={tela}
                    className="min-h-0 flex-1 animate-enter overflow-y-auto overflow-x-hidden px-2.5 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {tela === "home" && (
                        <>
                            <div className="flex justify-around gap-2 pb-3 pt-2">
                                {stories.map((story) => (
                                    <button key={story.rotulo} type="button" onClick={() => ir(story.destino)} className="grid justify-items-center gap-1 text-[9px] text-text-secondary">
                                        <span className={`grid size-10.5 place-items-center rounded-full border-2 text-xl ${story.estilo}`}>{story.icone}</span>
                                        {story.rotulo}
                                    </button>
                                ))}
                            </div>

                            <article className="-mx-2.5">
                                <div className="flex items-center gap-2 px-2.5 py-2">
                                    <span className="grid size-8 place-items-center rounded-full bg-green-lighter text-base text-green-primary">
                                        <FaLeaf aria-hidden />
                                    </span>

                                    <div className="grid gap-0.5">
                                        <strong className="text-[11px]">Comunidade Sustentável</strong>
                                        <small className="text-[9px] text-text-muted">há 2 horas</small>
                                    </div>
                                </div>

                                <div className="grid min-h-44 place-items-center bg-linear-to-br from-night to-green-primary text-center text-white">
                                    <div className="px-4">
                                        <FaLeaf className="mx-auto mb-2 text-4xl text-green-light" aria-hidden />
                                        <p className="font-heading text-sm font-bold">Pequenas ações. Grandes mudanças.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-3 pt-2 text-[13px]">
                                    <button type="button" onClick={() => setCurtido(!curtido)} aria-pressed={curtido} className={`flex items-center gap-1.5 ${curtido ? "text-purple-primary" : ""}`}>
                                        <FaHeart className="text-purple-primary" aria-hidden /> {curtido ? 4 : 3}
                                    </button>

                                    <button type="button" onClick={() => ir("conversas")} className="flex items-center gap-1.5">
                                        <FaRegMessage aria-hidden /> 0
                                    </button>

                                    <button type="button" onClick={() => ir("resumo")} aria-label="Ver meu resumo" className="ml-auto text-text-secondary">
                                        <FaShareNodes />
                                    </button>
                                </div>
                            </article>
                        </>
                    )}

                    {tela === "centralMissoes" && (
                        <>
                            <div className="mb-4 grid gap-2.5 pt-2">
                                <h1 className="font-heading text-xl leading-tight font-bold">Complete missões e acumule Pontos Soul</h1>
                                <p className="text-xs leading-relaxed text-text-secondary">Certas missões têm prazo para serem concluídas. Fique de olho no contador.</p>
                            </div>

                            <Categoria
                                tom="purple"
                                icone={<FaTrophy />}
                                titulo="Missões SoulUP"
                                texto="Desafios criados pela SoulUP especialmente para você!"
                                quantidade="8"
                                legenda="2 em andamento"
                                progresso={25}
                                rodape="2 de 8 concluídas"
                                percentual="25%"
                                tag="1 expira em 2 dias"
                                onClick={() => setAviso("As missões SoulUP ainda não estão disponíveis nesta demonstração.")}
                            />

                            <Categoria
                                tom="green"
                                icone={<FaLeaf />}
                                titulo="Missões Sustentáveis"
                                texto="Ações que geram impacto real para o planeta."
                                quantidade={carregandoMissoes ? "…" : String(continuas.missoes.length + mensais.missoes.length)}
                                legenda={carregandoMissoes ? "Carregando..." : "Greenlify"}
                                progresso={percentualMensal}
                                rodape={metasMensais}
                                percentual={mensais.carregando || mensais.erro ? undefined : `${percentualMensal}%`}
                                tag="Categorias sustentáveis"
                                onClick={() => ir("missoes")}
                            />

                            {aviso && (
                                <p role="status" className="rounded-lg bg-purple-lighter p-2 text-[10px] text-purple-dark">
                                    {aviso}
                                </p>
                            )}
                        </>
                    )}

                    {tela === "missoes" && <PhoneMissoes continuas={continuas} mensais={mensais} dados={dadosPerfil} onAbrir={abrirMissao} onIr={ir} />}
                    {tela === "detalhe" && <PhoneMissaoDetalhe key={missaoId} missao={missaoAtual} />}
                    {tela === "ranking" && <PhoneRanking />}
                    {tela === "grupos" && <PhoneGrupos meuGrupo={meuGrupo} onAbrir={abrirGrupo} />}

                    {tela === "grupo" && grupoId !== null && (
                        <PhoneGrupoDetalhe
                            key={grupoId}
                            idGrupo={grupoId}
                            meu={meuGrupo?.idGrupo === grupoId}
                            onVoltar={() => ir("grupos")}
                            onSelos={() => ir("coletarSelos")}
                            onMissoes={() => ir("missoes")}
                        />
                    )}

                    {tela === "coletarSelos" && <PhoneSelos />}
                    {tela === "perfil" && <PhonePerfil dados={dadosPerfil} onIr={ir} />}
                    {tela === "resumo" && <PhoneResumo dados={dadosPerfil} />}

                    {placeholder && (
                        <div className="grid min-h-44 place-content-center justify-items-center gap-2 text-center">
                            <span className="grid size-13 place-items-center rounded-2xl bg-purple-lighter text-xl text-purple-primary">{placeholder.icone}</span>
                            <h2 className="font-heading text-[17px] font-bold">{placeholder.titulo}</h2>
                            <p className="max-w-60 text-[10px] leading-relaxed text-text-secondary">
                                Esta área representa a navegação da SoulUp. O teste concentra as funcionalidades no módulo Greenlify.
                            </p>

                            <Button size="sm" onClick={() => ir(placeholder.destino)}>
                                {placeholder.botao}
                            </Button>
                        </div>
                    )}
                </main>

                <nav aria-label="Navegação inferior" className="flex h-11 shrink-0 items-center justify-around border-t border-border bg-bg-card px-1">
                    <button type="button" onClick={() => ir("home")} aria-label="Home" className={navStyles(tela === "home")}>
                        <FaHouse />
                    </button>

                    <button type="button" onClick={() => ir("grupos")} aria-label="Grupos" className={navStyles(tela === "grupos" || tela === "grupo" || tela === "coletarSelos")}>
                        <FaUsers />
                    </button>

                    <button type="button" onClick={() => ir("criar")} aria-label="Criar publicação" className="grid h-8.5 w-12 place-items-center rounded-full bg-purple-primary text-lg text-white">
                        <FaPlus />
                    </button>

                    <button type="button" onClick={() => ir("reels")} aria-label="Reels" className={navStyles(tela === "reels")}>
                        <FaVideo />
                    </button>

                    <button type="button" onClick={() => ir("conversas")} aria-label="Conversas" className={navStyles(tela === "conversas")}>
                        <FaComment />
                    </button>
                </nav>
            </div>
        </div>
    );
}
