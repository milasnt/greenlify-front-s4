import { useState } from "react";
import { FaChartLine, FaFire, FaLeaf, FaListCheck, FaStar, FaTrophy, FaUsers } from "react-icons/fa6";
import Grid from "../../components/layout/Grid";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import SectionHeading from "../../components/layout/SectionHeading";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import FeatureCard from "../../components/ui/FeatureCard";
import Feedback from "../../components/ui/Feedback";
import ItemList from "../../components/ui/ItemList";
import ProfileHeader from "../../features/profile/components/ProfileHeader";
import { usePerfil } from "../../features/profile/hooks/useProfile";
import { useRankings } from "../../features/ranking/hooks/useRankings";
import RankingTable from "../../features/ranking/components/RankingTable";
import RankingTabs, { type RankingTab } from "../../features/ranking/components/RankingTabs";
import CarteiraCard from "../../features/badges/components/CarteiraCard";



const numero = (valor: number) => valor.toLocaleString("pt-BR");

export default function Perfil() {
    const [rankingTab, setRankingTab] = useState<RankingTab>("mensal");

    const { usuario, perfil, impacto, carregando, erro } = usePerfil();
    const ranking = useRankings();

    const itensRanking =
        rankingTab === "grupos" ? ranking.grupos : rankingTab === "mensal" ? ranking.mensal : ranking.allTime;
    const carregandoRanking = rankingTab === "allTime" ? ranking.carregandoAllTime : ranking.carregando;
    const erroRanking = rankingTab === "allTime" ? ranking.erroAllTime : ranking.erro;
    const colunaValores = rankingTab === "grupos" ? "Selos Verdes" : "Pontos";

    const posicaoMensal = impacto && impacto.posicaoRanking > 0 ? `#${impacto.posicaoRanking}` : "—";

    return (
        <>
            <Section size="sm">
                {erro ? (
                    <Feedback tipo="erro" mensagem={erro} />
                ) : carregando || !usuario || !perfil || !impacto ? (
                    <Card hover={false} className="h-48" children={undefined} />
                ) : (
                    <ProfileHeader
                        nome={usuario.nome}
                        nivel={perfil.nivel.nome}
                        xp={perfil.xpSustentavel}
                        proximoNivelXp={perfil.nivel.xpMaximo}
                        pontos={impacto.pontos}
                        missoes={impacto.missoesConcluidas}
                    />
                )}

                {!erro && impacto && (
                    <Reveal className="mt-6">
                        <CarteiraCard saldo={impacto.pontos} />
                    </Reveal>
                )}
            </Section>

            {!erro && (
                <>
                    <Section variant="secondary">
                        <SectionHeading
                            label="Seus resultados"
                            title="O que você já conquistou"
                            text="Visualize os principais resultados obtidos através das missões realizadas e acompanhe sua evolução sustentável."
                        />

                        <Grid columns={4} className="mt-10">
                            {carregando || !perfil || !impacto ? (
                                [1, 2, 3, 4].map((item) => <Card key={item} hover={false} className="h-40" children={undefined} />)
                            ) : (
                                <>
                                    <Reveal><FeatureCard icon={<FaTrophy />} title="Saldo de pontos" value={numero(impacto.pontos)} text="Pontos que você pode gastar em Selos Verdes ou pagar sua conta de luz." /></Reveal>
                                    <Reveal delay={80}><FeatureCard icon={<FaStar />} title="XP acumulado" value={numero(perfil.xpSustentavel)} text="Experiência conquistada." /></Reveal>
                                    <Reveal delay={160}><FeatureCard icon={<FaListCheck />} title="Missões concluídas" value={numero(impacto.missoesConcluidas)} text="Missões realizadas com sucesso." /></Reveal>
                                    <Reveal delay={240}><FeatureCard icon={<FaLeaf />} title="Carbono economizado" value={`${numero(perfil.totalCarbonoEconomizado)} kg CO₂`} text="Impacto gerado pelas suas ações." /></Reveal>
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
                            {carregando || !perfil || !impacto ? (
                                [1, 2, 3].map((item) => <Card key={item} hover={false} className="h-40" children={undefined} />)
                            ) : (
                                <>
                                    <Reveal><FeatureCard highlight icon={<FaFire />} title="Streak atual" value={`${impacto.mesesDeStreak} ${impacto.mesesDeStreak === 1 ? "mês" : "meses"}`} text="Você mantém sua participação em missões mensais." /></Reveal>
                                    <Reveal delay={90}><FeatureCard icon={<FaChartLine />} title="Nível de contribuição" value={perfil.nivel.nome} text="Seu nível aumenta conforme o XP acumulado." /></Reveal>
                                    <Reveal delay={180}><FeatureCard icon={<FaUsers />} title="Ranking mensal" value={posicaoMensal} text="Sua posição pelas missões concluídas no mês." /></Reveal>
                                </>
                            )}
                        </Grid>

                        {perfil && (
                            <Grid split="wide-left" className="mt-8">
                                <Reveal>
                                    <Card hover={false}>
                                        <h3 className="font-heading text-lg font-bold text-text-main">Indicadores de sustentabilidade</h3>

                                        <ItemList
                                            variant="status"
                                            className="mt-4"
                                            items={[
                                                { title: "Água economizada", value: `${numero(perfil.totalAguaEconomizada)} m³` },
                                                { title: "Energia economizada", value: `${numero(perfil.totalEnergiaEconomizada)} kWh` },
                                                { title: "Carbono economizado", value: `${numero(perfil.totalCarbonoEconomizado)} kg CO₂` },
                                            ]}
                                        />
                                    </Card>
                                </Reveal>
                            </Grid>
                        )}
                    </Section>

                    <Section variant="secondary">
                        <SectionHeading
                            label="Rankings"
                            title="Compare seu desempenho"
                            text="O ranking mensal conta as missões concluídas no mês, o de grupos soma os Selos Verdes dos integrantes e o All Time acumula os pontos ganhos."
                        />

                        <div className="mt-10">
                            <RankingTabs defaultTab={rankingTab} onChange={setRankingTab} />

                            {carregandoRanking ? (
                                <Card hover={false} className="h-48" children={undefined} />
                            ) : erroRanking ? (
                                <Feedback tipo="erro" mensagem={erroRanking} />
                            ) : itensRanking.length === 0 ? (
                                <Feedback tipo="vazio" mensagem="O ranking ainda não foi calculado." />
                            ) : (
                                <RankingTable
                                    items={itensRanking.slice(0, 5)}
                                    type={rankingTab === "grupos" ? "groups" : "users"}
                                    columnLabel={colunaValores}
                                    unit={rankingTab === "grupos" ? "selos" : "pts"}
                                    highlight={rankingTab === "grupos" ? usuario?.grupo?.nome : usuario?.nome}
                                />
                            )}

                            <div className="mt-6 flex justify-center">
                                <Button to="/rankings" variant="secondary" arrow>
                                    Ver ranking completo
                                </Button>
                            </div>
                        </div>
                    </Section>

                    <Section>
                        <SectionHeading
                            label="Desempenho"
                            title="Seu resumo"
                            text="Reúna os principais resultados alcançados em uma peça visual para compartilhar."
                        />

                        <Reveal className="mt-10">
                            <Card full hover={false}>
                                {carregando || !impacto ? (
                                    <div className="h-32" />
                                ) : (
                                    <Grid columns={3}>
                                        <FeatureCard icon={<FaTrophy />} title="Saldo de pontos" value={numero(impacto.pontos)} />
                                        <FeatureCard icon={<FaListCheck />} title="Missões concluídas" value={numero(impacto.missoesConcluidas)} />
                                        <FeatureCard icon={<FaUsers />} title="Posição atual" value={posicaoMensal} />
                                    </Grid>
                                )}

                                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                    <Button to="/resumo" arrow>
                                        Ver resumo completo
                                    </Button>
                                </div>
                            </Card>
                        </Reveal>
                    </Section>
                </>
            )}
        </>
    );
}