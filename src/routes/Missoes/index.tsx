import { useEffect, useRef, useState } from "react";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { MissaoMensal, MissionCard } from "../../features/missions/components/MissionCard";
import { OPCOES_DIFICULDADE, OPCOES_IMPACTO, useFiltroMissoes, usePaginacao } from "../../features/missions/hooks/useFiltroMissoes";
import { useMissoesContinuas, useMissoesMensais } from "../../features/missions/hooks/useMissoes";
import Pagination from "../../components/ui/Pagination";
import SectionHeading from "../../components/layout/SectionHeading";
import Grid from "../../components/layout/Grid";
import Tabs from "../../components/ui/Tabs";
import FilterBar from "../../features/missions/components/FilterBar";
import Feedback from "../../components/ui/Feedback";

const MISSOES_POR_PAGINA = 6;
const MENSAIS_POR_PAGINA = 4;

type AbaMissoes = "continuas" | "mensais";

const abas = [
    { id: "continuas", label: "Missões contínuas", shortLabel: "Contínuas" },
    { id: "mensais", label: "Missões mensais", shortLabel: "Mensais" },
];

export default function Missoes() {
    const [aba, setAba] = useState<AbaMissoes>("continuas");
    const { missoes, carregando, erro } = useMissoesContinuas();
    const mensais = useMissoesMensais();

    const filtro = useFiltroMissoes(missoes, MISSOES_POR_PAGINA);
    const paginaMensais = usePaginacao(mensais.missoes, MENSAIS_POR_PAGINA);

    const listaRef = useRef<HTMLDivElement>(null);
    const primeiraRenderizacao = useRef(true);

    useEffect(() => {
        if (primeiraRenderizacao.current) {
            primeiraRenderizacao.current = false;
            return;
        }

        const topo = listaRef.current?.getBoundingClientRect().top ?? 0;
        if (topo < 80) listaRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [filtro.pagina, paginaMensais.pagina]);

    return (
        <>
        
            <Section size="sm">
                <Tabs
                    items={abas}
                    active={aba}
                    onChange={(id) => setAba(id as AbaMissoes)}
                    ariaLabel="Tipo de missão"
                    panelId="painel-missoes"
                    variant="segmented"
                />

                <div
                    id="painel-missoes"
                    role="tabpanel"
                    aria-labelledby={`tab-${aba}`}
                    ref={listaRef}
                    className="mt-8 scroll-mt-24"
                >
                    {aba === "continuas" ? (
                        <>
                            <SectionHeading
                                label="Missões disponíveis"
                                title="Escolha uma missão contínua"
                                text="Realize uma ação sustentável, acumule pontos e XP e contribua para suas metas mensais."
                            />

                            <div className="mt-8">
                                <FilterBar
                                    search={filtro.busca}
                                    onSearchChange={filtro.setBusca}
                                    groups={[
                                        { id: "impacto", label: "Impacto ambiental", options: OPCOES_IMPACTO, selected: filtro.impacto, onChange: filtro.setImpacto },
                                        { id: "dificuldade", label: "Dificuldade", options: OPCOES_DIFICULDADE, selected: filtro.dificuldade, onChange: filtro.setDificuldade, tone: "purple" },
                                    ]}
                                    resultCount={carregando || erro ? undefined : filtro.total}
                                    onClear={filtro.limpar}
                                />

                                <div className="mt-6">
                                    {carregando ? (
                                        <Grid>
                                            {[1, 2, 3].map((item) => (
                                                <div key={item} className="h-64 animate-pulse rounded-3xl border border-border bg-bg-card" />
                                            ))}
                                        </Grid>
                                    ) : erro ? (
                                        <Feedback tipo="erro" mensagem={erro} />
                                    ) : missoes.length === 0 ? (
                                        <Feedback tipo="vazio" mensagem="Nenhuma missão disponível no momento." />
                                    ) : filtro.total === 0 ? (
                                        <Card variant="dashed" hover={false} className="flex flex-col items-center gap-4 py-10 text-center">
                                            <p className="text-sm text-text-secondary">
                                                Nenhuma missão combina com esses filtros. Que tal ampliar a busca?
                                            </p>

                                            <Button variant="secondary" onClick={filtro.limpar}>
                                                Limpar filtros
                                            </Button>
                                        </Card>
                                    ) : (
                                        <>
                                            <Grid key={`${filtro.pagina}-${filtro.impacto}-${filtro.dificuldade}-${filtro.busca}`} className="animate-enter">
                                                {filtro.visiveis.map((missao) => (
                                                    <MissionCard
                                                        key={missao.id}
                                                        id={missao.id}
                                                        titulo={missao.titulo}
                                                        descricao={missao.descricao}
                                                        impacto={missao.impacto}
                                                        dificuldade={missao.dificuldade}
                                                        pontos={missao.pontos}
                                                    />
                                                ))}
                                            </Grid>

                                            <Pagination
                                                pagina={filtro.pagina}
                                                totalPaginas={filtro.totalPaginas}
                                                onChange={filtro.setPagina}
                                                ariaLabel="Paginação das missões disponíveis"
                                                className="mt-10"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <SectionHeading
                                label="Missões mensais"
                                title="Metas do mês"
                                text="As missões mensais acompanham seu desempenho durante o mês e avançam conforme você conclui missões contínuas."
                            />

                            <div className="mt-8">
                                {mensais.carregando ? (
                                    <Grid columns={2}>
                                        {[1, 2].map((item) => (
                                            <div key={item} className="h-32 animate-pulse rounded-3xl border border-border bg-bg-card" />
                                        ))}
                                    </Grid>
                                ) : mensais.erro ? (
                                    <Feedback tipo="erro" mensagem={mensais.erro} />
                                ) : mensais.missoes.length === 0 ? (
                                    <Feedback tipo="vazio" mensagem="Nenhuma missão mensal vigente no momento." />
                                ) : (
                                    <>
                                        <Grid columns={2} className="animate-enter">
                                            {paginaMensais.visiveis.map((missao) => (
                                                <MissaoMensal
                                                    key={missao.id}
                                                    titulo={missao.titulo}
                                                    progresso={missao.progresso}
                                                    meta={missao.meta}
                                                />
                                            ))}
                                        </Grid>

                                        <Pagination
                                            pagina={paginaMensais.pagina}
                                            totalPaginas={paginaMensais.totalPaginas}
                                            onChange={paginaMensais.setPagina}
                                            ariaLabel="Paginação das missões mensais"
                                            className="mt-8"
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </Section>
        </>
    );
}