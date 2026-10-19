import { useEffect, useState } from "react";
import { FaCalendarDays, FaChartLine, FaCircleCheck, FaFire, FaLeaf, FaListCheck, FaStar, FaTrophy, FaUsers } from "react-icons/fa6";
import { rankingData, usuarioAtual } from "../Rankings";
import CtaBanner from "../../components/layout/CtaBanner";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import SectionHeading from "../../components/layout/SectionHeading";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Chart from "../../components/ui/Chart";
import FeatureCard from "../../components/ui/FeatureCard";
import ProfileHeader from "../../features/profile/components/ProfileHeader";
import RankingTable from "../../features/ranking/components/RankingTable";
import RankingTabs, { type RankingTab } from "../../features/ranking/components/RankingTabs";

const evolucaoXp = [
    { label: "Mai", value: 120 },
    { label: "Jun", value: 260 },
    { label: "Jul", value: 410 },
    { label: "Ago", value: 560 },
    { label: "Set", value: 680 },
    { label: "Out", value: 780 },
];

const atividadeSemanal = [
    { label: "Seg", value: 1 },
    { label: "Ter", value: 2 },
    { label: "Qua", value: 0 },
    { label: "Qui", value: 3 },
    { label: "Sex", value: 2 },
    { label: "Sáb", value: 1 },
    { label: "Dom", value: 1 },
];

export default function Perfil() {
    const [isLoading, setIsLoading] = useState(true);
    const [rankingTab, setRankingTab] = useState<RankingTab>("mensal");
    const [isShared, setIsShared] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const posicaoMensal = rankingData.mensal.find((item) => item.nome === usuarioAtual)?.posicao ?? 0;

    return (
        <>
            <Hero
                badge={<><FaLeaf /> Perfil sustentável</>}
                title={<>Meu <span className="textGradient">Perfil</span></>}
                text="Acompanhe sua evolução na Greenlify e veja o impacto gerado pelas suas ações sustentáveis."
            />

            <Section size="sm">
                {isLoading ? (
                    <Card hover={false} className="h-48" children={undefined} />
                ) : (
                    <ProfileHeader
                        nome="Camila"
                        nivel="Contribuidora"
                        xp={780}
                        proximoNivelXp={1000}
                        pontos={1250}
                        missoes={18}
                    />
                )}
            </Section>

            <Section variant="secondary">
                <SectionHeading
                    label="Seus resultados"
                    title="O que você já conquistou"
                    text="Visualize os principais resultados obtidos através das missões realizadas e acompanhe sua evolução sustentável."
                />

                <Grid columns={4} className="mt-10">
                    {isLoading ? (
                        [1, 2, 3, 4].map((item) => <Card key={item} hover={false} className="h-40" children={undefined} />)
                    ) : (
                        <>
                            <Reveal><FeatureCard icon={<FaTrophy />} title="Pontos acumulados" value="1.250" text="Pontuação obtida nas missões." /></Reveal>
                            <Reveal delay={80}><FeatureCard icon={<FaStar />} title="XP acumulado" value="780" text="Experiência conquistada." /></Reveal>
                            <Reveal delay={160}><FeatureCard icon={<FaListCheck />} title="Missões concluídas" value="18" text="Missões realizadas com sucesso." /></Reveal>
                            <Reveal delay={240}><FeatureCard icon={<FaLeaf />} title="Impacto ambiental" value="Alto" text="Impacto gerado pelas suas ações." /></Reveal>
                        </>
                    )}
                </Grid>
            </Section>

            <Section>
                <SectionHeading
                    label="Sua evolução"
                    title="Constância que vira nível"
                    text="Acompanhe seu progresso e veja como sua participação contribui para sua evolução dentro da Greenlify."
                />

                <Grid columns={3} className="mt-10">
                    <Reveal><FeatureCard highlight icon={<FaFire />} title="Streak atual" value="4 meses" text="Você mantém sua participação em missões mensais." /></Reveal>
                    <Reveal delay={90}><FeatureCard icon={<FaChartLine />} title="Nível de contribuição" value="Contribuidora" text="Seu nível aumenta conforme o XP acumulado." /></Reveal>
                    <Reveal delay={180}><FeatureCard icon={<FaUsers />} title="Ranking mensal" value={`#${posicaoMensal}`} text="Sua posição atual entre os participantes." /></Reveal>
                </Grid>

                <Grid split="wide-left" className="mt-8">
                    <Reveal>
                        <Card hover={false}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-heading text-lg font-bold text-text-main">Evolução de XP</h3>
                                <Badge>+100 XP em outubro</Badge>
                            </div>

                            <div className="mt-4">
                                <Chart data={evolucaoXp} />
                            </div>

                            <div className="mt-6 border-t border-border pt-5">
                                <Chart variant="bars" title="Ações desta semana" data={atividadeSemanal} />
                            </div>
                        </Card>
                    </Reveal>
                </Grid>
            </Section>

            <Section variant="secondary">
                <SectionHeading
                    label="Rankings"
                    title="Compare seu desempenho"
                    text="O ranking mensal considera o desempenho durante o mês atual, enquanto o ranking all time considera o histórico de participação. Já o ranking de grupos permite comparar o desempenho coletivo."
                />

                <div className="mt-10">
                    <RankingTabs defaultTab={rankingTab} onChange={setRankingTab} />

                    <RankingTable
                        items={rankingData[rankingTab].slice(0, 5)}
                        type={rankingTab === "grupos" ? "groups" : "users"}
                        highlight={usuarioAtual}
                    />

                    <div className="mt-6 flex justify-center">
                        <Button to="/rankings" variant="secondary" arrow>
                            Ver ranking completo
                        </Button>
                    </div>
                </div>
            </Section>

            <Section>
                <SectionHeading
                    label="Desempenho mensal"
                    title="Seu resumo do mês"
                    text="Ao final de cada mês, você pode visualizar um resumo do seu desempenho, reunindo os principais resultados alcançados durante o período."
                />

                <Reveal className="mt-10">
                    <Card full hover={false}>
                        <Grid columns={3}>
                            <FeatureCard icon={<FaCalendarDays />} title="Pontos no mês" value="420" />
                            <FeatureCard icon={<FaListCheck />} title="Missões concluídas" value="7" />
                            <FeatureCard icon={<FaTrophy />} title="Posição final" value={`#${posicaoMensal}`} />
                        </Grid>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {isShared ? (
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-primary">
                                    <FaCircleCheck aria-hidden />
                                    Compartilhado com sucesso!
                                </span>
                            ) : (
                                <Button variant="secondary" onClick={() => setIsShared(true)}>
                                    Compartilhar resumo
                                </Button>
                            )}

                            <Button to="/resumo" arrow>
                                Ver resumo completo
                            </Button>
                        </div>
                    </Card>
                </Reveal>
            </Section>

            <CtaBanner
                title="Continue sua evolução"
                text="Realize novas missões para aumentar sua pontuação, conquistar XP e melhorar sua posição no ranking."
            >
                <Button to="/missoes" variant="dark" size="lg" arrow>
                    Ver Missões
                </Button>

                <Button to="/nossasolucao" variant="outline" size="lg">
                    Conhecer a solução
                </Button>
            </CtaBanner>
        </>
    );
}
