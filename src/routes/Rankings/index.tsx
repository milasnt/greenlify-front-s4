import { useState } from "react";
import { FaArrowTrendUp, FaTrophy } from "react-icons/fa6";
import CtaBanner from "../../components/layout/CtaBanner";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import RankingTable from "../../features/ranking/components/RankingTable";
import RankingTabs, { type RankingTab } from "../../features/ranking/components/RankingTabs";

export interface RankingRow {
    posicao: number;
    nome: string;
    pontos: number;
    nivel?: string;
}

export const usuarioAtual = "Camila";

export const rankingData: Record<RankingTab, RankingRow[]> = {
    mensal: [
        { posicao: 1, nome: "Ana Paula", pontos: 980, nivel: "Especialista" },
        { posicao: 2, nome: "Bruno Costa", pontos: 860, nivel: "Contribuidor" },
        { posicao: 3, nome: "Camila", pontos: 780, nivel: "Contribuidora" },
        { posicao: 4, nome: "Diego Alves", pontos: 640, nivel: "Iniciante" },
        { posicao: 5, nome: "Elisa Moura", pontos: 590, nivel: "Iniciante" },
        { posicao: 6, nome: "Felipe Nunes", pontos: 540, nivel: "Iniciante" },
        { posicao: 7, nome: "Gabriela Rocha", pontos: 480, nivel: "Iniciante" },
    ],
    allTime: [
        { posicao: 1, nome: "Camila", pontos: 6420, nivel: "Especialista" },
        { posicao: 2, nome: "Ana Paula", pontos: 5890, nivel: "Especialista" },
        { posicao: 3, nome: "Bruno Costa", pontos: 5210, nivel: "Contribuidor" },
        { posicao: 4, nome: "Diego Alves", pontos: 4380, nivel: "Contribuidor" },
        { posicao: 5, nome: "Elisa Moura", pontos: 3950, nivel: "Contribuidora" },
        { posicao: 6, nome: "Felipe Nunes", pontos: 3600, nivel: "Iniciante" },
    ],
    grupos: [
        { posicao: 1, nome: "Eco Warriors", pontos: 340 },
        { posicao: 2, nome: "Verde Vida", pontos: 290 },
        { posicao: 3, nome: "Recicla+", pontos: 210 },
        { posicao: 4, nome: "Pedal Sustentável", pontos: 180 },
        { posicao: 5, nome: "Água em Foco", pontos: 120 },
    ],
};

export default function Rankings() {
    const [rankingTab, setRankingTab] = useState<RankingTab>("mensal");

    const isGroups = rankingTab === "grupos";
    const items = rankingData[rankingTab];
    const demais = items.slice(3);

    const indiceAtual = items.findIndex((item) => item.nome === usuarioAtual);
    const acima = indiceAtual > 0 ? items[indiceAtual - 1] : undefined;
    const faltam = acima ? acima.pontos - items[indiceAtual].pontos : 0;

    return (
        <>
            <Hero
                badge={<><FaTrophy /> Competição saudável</>}
                title={<>Ranking da <span className="textGradient">comunidade</span></>}
                text="Dados demonstrativos. O ranking celebra a constância — cada ponto é uma ação real pelo planeta."
            />

            <Section size="sm">
                <RankingTabs defaultTab={rankingTab} onChange={setRankingTab} />

                <Reveal key={rankingTab}>
                    <RankingTable
                        variant="podium"
                        items={items}
                        unit={isGroups ? "selos" : "pts"}
                        caption={rankingTab === "mensal" ? "neste mês" : undefined}
                    />
                </Reveal>

                {demais.length > 0 && (
                    <Reveal key={`tabela-${rankingTab}`} className="mt-10">
                        <RankingTable
                            items={demais}
                            type={isGroups ? "groups" : "users"}
                            highlight={isGroups ? undefined : usuarioAtual}
                        />
                    </Reveal>
                )}

                {!isGroups && indiceAtual >= 0 && (
                    <Reveal className="mt-6">
                        <Card variant="dashed" hover={false} className="flex items-center justify-center gap-2 p-4 text-center text-sm text-green-dark">
                            <FaArrowTrendUp className="shrink-0 text-green-primary" aria-hidden />

                            <span>
                                Você está em <strong>{indiceAtual + 1}º lugar</strong> no ranking{" "}
                                {rankingTab === "mensal" ? "deste mês" : "geral"}
                                {faltam > 0 && <> — faltam {faltam.toLocaleString("pt-BR")} pontos para subir uma posição.</>}
                            </span>
                        </Card>
                    </Reveal>
                )}
            </Section>

            <CtaBanner
                title="Suba no ranking com novas missões"
                text="Cada missão validada soma pontos e XP e aproxima você do pódio."
            >
                <Button to="/missoes" variant="dark" size="lg" arrow>
                    Ver missões
                </Button>
            </CtaBanner>
        </>
    );
}