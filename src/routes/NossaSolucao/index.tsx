import Section from "../../components/Section";
import Hero from "../../components/Hero";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Link } from "react-router";
import {FaLeaf, FaListCheck, FaVideo, FaRobot, FaChartLine, FaTrophy, FaUser, FaUsers, FaFire } from "react-icons/fa6";

export default function NossaSolucao() {
    return (
        <>
            <Section>
                <Hero
                    variant="internal"
                    badge={<FaLeaf />}
                    title={<>Nossa <span className="font-bold text-green-primary">Solução</span></>}
                    text="A Greenlify transforma ações sustentáveis em uma experiência de gamificação dentro da SoulUp, conectando missões, validação, pontuação e recompensas."
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
                                Como funciona
                            </h2>

                            <p className="mb-12 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                A Greenlify funciona como um módulo integrado à SoulUp,
                                no qual o usuário participa de missões sustentáveis,
                                comprova suas ações e acompanha sua evolução dentro da
                                plataforma.
                            </p>

                            <div className="grid grid-cols-4 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                <Card center>
                                    <FaListCheck className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Escolha uma missão
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        O usuário escolhe entre missões mensais e
                                        contínuas, considerando seus diferentes níveis
                                        de impacto e dificuldade.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaVideo className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Envie a comprovação
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Após realizar a ação, o usuário envia um vídeo
                                        para comprovar a execução da missão.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaRobot className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Validação automática
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        O conteúdo enviado passa por análise
                                        automatizada para verificar sua correspondência
                                        com a missão.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaChartLine className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Receba sua pontuação
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Com a validação concluída, a pontuação e o XP
                                        do usuário são atualizados.
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
                            2
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Principais funcionalidades
                            </h2>

                            <p className="mb-12 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                A solução reúne diferentes recursos para transformar a
                                realização de ações sustentáveis em uma experiência
                                contínua de participação e evolução.
                            </p>

                            <div className="grid grid-cols-3 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                <Card center>
                                    <FaListCheck className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Missões
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Atividades mensais e contínuas com critérios
                                        definidos de impacto ambiental e dificuldade.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaRobot className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Validação inteligente
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Análise automatizada dos vídeos enviados,
                                        incluindo verificação de duplicidade por
                                        fingerprint.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaChartLine className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Pontuação e XP
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        O usuário acumula pontos e XP de acordo com
                                        suas ações e resultados das validações.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaTrophy className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Ranking e recompensas
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Rankings mensais e gerais incentivam a
                                        participação e dão acesso a recompensas.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaUser className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Perfil sustentável
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        O usuário acompanha seu XP, nível de
                                        contribuição, pontuação e impacto ambiental.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaUsers className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Grupos
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        A participação coletiva permite acompanhar
                                        resultados e rankings de grupos.
                                    </p>
                                </Card>
                            </div>
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
                                Engajamento
                            </h2>

                            <p className="mb-6 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                A Greenlify utiliza diferentes mecanismos para incentivar a
                                continuidade das ações sustentáveis realizadas pelos usuários.
                            </p>

                            <p className="mb-12 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                O streak acompanha a sequência de participação, enquanto os
                                rankings, níveis e recompensas incentivam o usuário a continuar
                                evoluindo dentro da plataforma.
                            </p>

                            <div className="grid grid-cols-4 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                <Card center>
                                    <FaFire className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Streak
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Incentiva a continuidade da participação nas missões
                                        sustentáveis.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaTrophy className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Recompensas
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Pontos acumulados podem gerar benefícios dentro da SoulUp.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaUsers className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Comunidade
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        Usuários podem participar de grupos e acompanhar resultados
                                        coletivos.
                                    </p>
                                </Card>

                                <Card center>
                                    <FaChartLine className="mx-auto mb-5 text-[2.8rem] text-green-primary" />

                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">
                                        Evolução
                                    </h3>

                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">
                                        O desempenho do usuário pode ser acompanhado ao longo do
                                        tempo.
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <Card center full>
                        <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                            Conheça a solução <span className="text-green-primary">na prática</span>
                        </h2>

                        <p className="mx-auto mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                            Explore as principais funcionalidades da Greenlify através
                            das páginas de demonstração do projeto.
                        </p>

                        <div className="flex justify-center gap-6 max-[480px]:flex-col">
                            <Link to="/missoes">
                                <Button size="lg"> Ver Missões</Button>
                            </Link>

                            <Link to="/perfil">
                                <Button variant="secondary" size="lg">Ver Perfil</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </Section>
        </>
    );
}