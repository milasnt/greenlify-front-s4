import { useEffect, useState } from "react";
import Section from "../../components/Section";
import Hero from "../../components/Hero";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileStat from "../../components/ProfileStat";
import RankingTabs from "../../components/RankingTabs";
import type { RankingTab } from "../../components/RankingTabs";
import RankingTable from "../../components/RankingTable";
import { Link } from "react-router";
import { FaLeaf, FaTrophy, FaStar, FaListCheck, FaFire, FaChartLine, FaUsers, FaCircleCheck } from "react-icons/fa6";

interface RankingRow {
    posicao: number;
    nome: string;
    pontos: number;
    nivel?: string;
}

const rankingData: Record<RankingTab, RankingRow[]> = {
    mensal: [
        { posicao: 1, nome: "Ana Paula", pontos: 980, nivel: "Especialista" },
        { posicao: 2, nome: "Bruno Costa", pontos: 860, nivel: "Contribuidor" },
        { posicao: 3, nome: "Camila", pontos: 780, nivel: "Contribuidora" },
        { posicao: 4, nome: "Diego Alves", pontos: 640, nivel: "Iniciante" },
    ],
    allTime: [
        { posicao: 1, nome: "Camila", pontos: 6420, nivel: "Especialista" },
        { posicao: 2, nome: "Ana Paula", pontos: 5890, nivel: "Especialista" },
        { posicao: 3, nome: "Bruno Costa", pontos: 5210, nivel: "Contribuidor" },
    ],
    grupos: [
        { posicao: 1, nome: "Eco Warriors", pontos: 340 },
        { posicao: 2, nome: "Verde Vida", pontos: 290 },
        { posicao: 3, nome: "Recicla+", pontos: 210 },
    ],
};

export default function Perfil() {
    const [isLoading, setIsLoading] = useState(true);
    const [rankingTab, setRankingTab] = useState<RankingTab>("mensal");
    const [isShared, setIsShared] = useState(false);

    function handleShare() {
        setIsShared(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Section>
                <Hero
                    variant="internal"
                    badge={<FaLeaf />}
                    title={<>Meu <span className="font-bold text-green-primary">Perfil</span></>}
                    text="Acompanhe sua evolução na Greenlify, visualize suas conquistas e veja o impacto gerado pelas suas ações sustentáveis."
                    visual={
                        <div className="flex h-48 w-48 items-center justify-center rounded-[3rem] border border-black/5 bg-bg-card shadow-custom-md">
                            <FaLeaf className="text-[4.5rem] text-green-primary" />
                        </div>
                    }
                />
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            1
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Perfil sustentável
                            </h2>

                            <p className="mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                O perfil sustentável reúne as principais informações sobre
                                sua participação na Greenlify, permitindo acompanhar sua
                                pontuação, XP, nível de contribuição e evolução.
                            </p>

                            {isLoading ? (
                                <div className="h-40 w-full animate-pulse rounded-2xl border border-border bg-bg-card" />
                            ) : (
                                <ProfileHeader
                                    nome="Camila"
                                    nivel="Contribuidora"
                                    xp={780}
                                    proximoNivelXp={1000}
                                    pontos={1250}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            2
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Seus resultados
                            </h2>

                            <p className="mb-12 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                Visualize os principais resultados obtidos através das
                                missões realizadas e acompanhe sua evolução sustentável.
                            </p>

                            {isLoading ? (
                                <div className="grid grid-cols-4 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="h-32 animate-pulse rounded-2xl border border-border bg-bg-card"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                    <ProfileStat
                                        icon={<FaTrophy />}
                                        label="Pontos acumulados"
                                        value="1.250"
                                        descricao="Pontuação obtida nas missões."
                                    />

                                    <ProfileStat
                                        icon={<FaStar />}
                                        label="XP acumulado"
                                        value="780"
                                        descricao="Experiência conquistada."
                                    />

                                    <ProfileStat
                                        icon={<FaListCheck />}
                                        label="Missões concluídas"
                                        value="18"
                                        descricao="Missões realizadas com sucesso."
                                    />

                                    <ProfileStat
                                        icon={<FaLeaf />}
                                        label="Impacto ambiental"
                                        value="Alto"
                                        descricao="Impacto gerado pelas suas ações."
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            3
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Sua evolução
                            </h2>

                            <p className="mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                Acompanhe seu progresso e veja como sua participação
                                contribui para sua evolução dentro da Greenlify.
                            </p>

                            <div className="grid grid-cols-3 gap-6 max-[992px]:grid-cols-2 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                <Card center>
                                    <FaFire className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Streak atual
                                    </h3>

                                    <strong className="mb-3 block text-[2.8rem] font-bold text-green-primary">
                                        4 meses
                                    </strong>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Você mantém sua participação em missões mensais.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaChartLine className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Nível de contribuição
                                    </h3>

                                    <strong className="mb-3 block text-[2.8rem] font-bold text-green-primary">
                                        Contribuidora
                                    </strong>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Seu nível aumenta conforme o XP acumulado.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaUsers className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Ranking mensal
                                    </h3>

                                    <strong className="mb-3 block text-[2.8rem] font-bold text-green-primary">
                                        #8
                                    </strong>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Sua posição atual entre os participantes.
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            4
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Rankings
                            </h2>

                            <p className="mb-4 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                A Greenlify possui diferentes rankings para acompanhar o
                                desempenho dos participantes em diferentes contextos.
                            </p>

                            <p className="mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                O ranking mensal considera o desempenho durante o mês
                                atual, enquanto o ranking all time considera o histórico
                                de participação. Já o ranking de grupos permite comparar
                                o desempenho coletivo.
                            </p>

                            <Card full>
                                <RankingTabs defaultTab={rankingTab} onChange={setRankingTab} />

                                <div className="mt-8">
                                    <RankingTable
                                        items={rankingData[rankingTab]}
                                        type={rankingTab === "grupos" ? "groups" : "users"}
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            5
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Desempenho mensal
                            </h2>

                            <p className="mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                Ao final de cada mês, você pode visualizar um resumo do
                                seu desempenho, reunindo os principais resultados
                                alcançados durante o período.
                            </p>

                            <Card full>
                                <div className="grid grid-cols-3 gap-10 max-[992px]:gap-10 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                    <div>
                                        <span className="mb-2 block text-[1.4rem] text-text-secondary">
                                            Pontos no mês
                                        </span>

                                        <strong className="text-[2.6rem] font-bold text-text-main">
                                            420
                                        </strong>
                                    </div>

                                    <div>
                                        <span className="mb-2 block text-[1.4rem] text-text-secondary">
                                            Missões concluídas
                                        </span>

                                        <strong className="text-[2.6rem] font-bold text-text-main">
                                            7
                                        </strong>
                                    </div>

                                    <div>
                                        <span className="mb-2 block text-[1.4rem] text-text-secondary">
                                            Posição final
                                        </span>

                                        <strong className="text-[2.6rem] font-bold text-green-primary">
                                            #8
                                        </strong>
                                    </div>
                                </div>

                                <div className="mt-10 flex justify-center">
                                    {isShared ? (
                                        <span className="flex items-center gap-3 text-[1.5rem] font-semibold text-green-primary">
                                            <FaCircleCheck />
                                            Compartilhado com sucesso!
                                        </span>
                                    ) : (
                                        <Button variant="secondary" size="md" onClick={handleShare}>
                                            Compartilhar resumo
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <Card center full>
                        <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                            Continue sua <span className="text-green-primary">evolução</span>
                        </h2>

                        <p className="mx-auto mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                            Realize novas missões para aumentar sua pontuação,
                            conquistar XP e melhorar sua posição no ranking.
                        </p>

                        <div className="flex justify-center gap-6 max-[480px]:flex-col">
                            <Link to="/missoes">
                                <Button size="lg">
                                    Ver Missões
                                </Button>
                            </Link>

                            <Link to="/nossasolucao">
                                <Button variant="secondary" size="lg">
                                    Conhecer a solução
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </Section>
        </>
    );
}
