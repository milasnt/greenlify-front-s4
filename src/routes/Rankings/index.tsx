import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Feedback from "../../components/ui/Feedback";
import { useRankings } from "../../features/ranking/hooks/useRankings";
import RankingTable from "../../features/ranking/components/RankingTable";
import RankingTabs, { type RankingTab } from "../../features/ranking/components/RankingTabs";

export default function Rankings() {
    const [rankingTab, setRankingTab] = useState<RankingTab>("mensal");

    const { mensal, grupos, allTime, idUsuario, carregando, erro, carregandoAllTime, erroAllTime } = useRankings();

    const isGroups = rankingTab === "grupos";
    const isAllTime = rankingTab === "allTime";
    const items = isGroups ? grupos : isAllTime ? allTime : mensal;
    const demais = items.slice(3);

    const aguardando = isAllTime ? carregandoAllTime : carregando;
    const falha = isAllTime ? erroAllTime : erro;

    const unidade = isGroups ? "selos" : "pts";
    const colunaValores = isGroups ? "Selos Verdes" : "Pontos";
    const explicacao = isGroups
        ? "Soma dos Selos Verdes coletados pelos integrantes de cada grupo."
        : isAllTime
          ? "Pontos ganhos em missões desde o início. Gastar pontos na carteira não derruba sua posição."
                    : "Pontos ganhos no mês.";

    const indiceAtual = idUsuario !== null ? items.findIndex((item) => item.id === idUsuario) : -1;
    const atual = indiceAtual >= 0 ? items[indiceAtual] : undefined;
    const acima = indiceAtual > 0 ? items[indiceAtual - 1] : undefined;
    const faltam = acima && atual ? acima.pontos - atual.pontos : 0;
    const nomeAtual = atual?.nome;
    return (
        <>
            <Section size="sm">
                <RankingTabs defaultTab={rankingTab} onChange={setRankingTab} />

                <p className="mt-4 text-center text-sm text-text-secondary">{explicacao}</p>

                {aguardando ? (
                    <Card hover={false} className="mt-6 h-64" children={undefined} />
                ) : falha ? (
                    <Feedback tipo="erro" mensagem={falha} className="mt-6" />
                ) : items.length === 0 ? (
                    <Feedback tipo="vazio" mensagem="O ranking ainda não foi calculado." />
                ) : (
                    <>
                        <Reveal key={rankingTab} className="pt-10">
                            <RankingTable
                                variant="podium"
                                items={items}
                                unit={unidade}
                                caption={rankingTab === "mensal" ? "neste mês" : undefined}
                            />
                        </Reveal>

                        {demais.length > 0 && (
                            <Reveal key={`tabela-${rankingTab}`} className="mt-10">
                                <RankingTable
                                    items={demais}
                                    type={isGroups ? "groups" : "users"}
                                    columnLabel={colunaValores}
                                    highlight={isGroups ? undefined : nomeAtual}
                                />
                            </Reveal>
                        )}
                    </>
                )}

                {!isGroups && !aguardando && !falha && atual && (
                    <Reveal className="mt-6">
                        <Card variant="dashed" hover={false} className="flex items-center justify-center gap-2 p-4 text-center text-sm text-green-dark">
                            <FaArrowTrendUp className="shrink-0 text-green-primary" aria-hidden />

                            <span>
                                Você está em <strong>{atual.posicao}º lugar</strong> no ranking{" "}
                                {isAllTime ? "geral" : "deste mês"}
                                {faltam > 0 && (
                                    <>
                                        {" "}
                                         — faltam {faltam.toLocaleString("pt-BR")} pontos para ultrapassar <strong>{acima?.nome}</strong>
                                    </>
                                )}
                            </span>
                        </Card>
                    </Reveal>
                )}
            </Section>
        </>
    );
}