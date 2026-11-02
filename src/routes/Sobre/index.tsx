import { FaChartLine, FaCode, FaCss3Alt, FaLeaf, FaRobot, FaSeedling, FaTrophy, FaUsers } from "react-icons/fa";
import { FaBolt, FaListCheck, FaReact } from "react-icons/fa6";

import imgFiap from "../../assets/img/sobre/img-fiap.jpeg";
import imgSoulup from "../../assets/img/sobre/img-soulup.png";
import CtaBanner from "../../components/layout/CtaBanner";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import SectionHeading from "../../components/layout/SectionHeading";
import Button from "../../components/ui/Button";
import MediaCard from "../../components/ui/MediaCard";
import Roadmap from "../../components/ui/Roadmap";

const infos = [
    { valor: "2", rotulo: "tipos de missão", detalhe: "contínuas e mensais" },
    { valor: "100%", rotulo: "comprovado por vídeo", detalhe: "exigência do challenge" },
    { valor: "IA", rotulo: "valida cada envio", detalhe: "com fingerprint de mídia" },
];

const objetivos = [
    { icon: <FaRobot />, title: "Validação automatizada", text: "Validar automaticamente as ações sustentáveis enviadas pelos usuários." },
    { icon: <FaChartLine />, title: "Pontuação justa", text: "Pontuar por impacto ambiental, dificuldade e consistência das ações." },
    { icon: <FaLeaf />, title: "Impacto ambiental", text: "Permitir que cada usuário acompanhe o impacto que gera na plataforma." },
    { icon: <FaUsers />, title: "Engajamento coletivo", text: "Estimular a participação por meio de grupos, Selos Verdes, rankings e recompensas."},
];


const solucao = [
    { icon: <FaListCheck />, title: "Missões", text: "Missões contínuas e mensais com instruções e critérios definidos para orientar as ações sustentáveis."},
    { icon: <FaRobot />, title: "Comprovação", text: "O usuário envia um vídeo como evidência da atividade. A validação automatizada está sendo desenvolvida em paralelo."},
    { icon: <FaChartLine />, title: "Pontuação", text: "As missões contribuem para a pontuação do usuário conforme as regras de negócio da plataforma."},
    { icon: <FaTrophy />, title: "Selos Verdes", text: "Os usuários podem utilizar pontos para coletar Selos Verdes, associados à proposta de compensação de carbono da SoulUp."},
    { icon: <FaUsers />, title: "Grupos", text: "Os Selos Verdes dos integrantes contribuem para o total do grupo, incentivando a participação coletiva e a competição saudável."},
];


const tecnologias = [
    { icon: <FaReact />, title: "React", text: "Interface e componentes reutilizáveis." },
    { icon: <FaBolt />, title: "Vite", text: "Configuração, desenvolvimento e build." },
    { icon: <FaCode />, title: "TypeScript", text: "Tipagem de componentes, dados e funcionalidades." },
    { icon: <FaCss3Alt />, title: "Tailwind CSS", text: "Estilização e layout responsivo." },
];

export default function Sobre() {
    return (
        <>
            <Hero
                badge={<><FaSeedling /> Sobre a Greenlify</>}
                title={<>Gameficação e <span className="textGradient">Sustentabilidade</span></>}
                text="A Greenlify é uma solução desenvolvida para a SoulUp que transforma ações sustentáveis em missões, pontos e recompensas, conectando conquistas individuais ao engajamento coletivo."
                visual={<div className="flex h-30 w-30 items-center justify-center rounded-[2.5rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[2.5rem] text-green-primary" /></div>}
            />

            <Section size="sm">
                <Grid split="wide-left" align="center">
                    <div>
                        <SectionHeading
                            label=""
                            title="Contexto"
                            size="lg"
                            text={[
                                "A SoulUp é uma plataforma de engajamento e recompensas sustentáveis, nascida da integração entre a Prospera e a startup SoulPrime. Em parceria com a FIAP, ela propôs aos alunos soluções reais para desafios da própria plataforma.",
                                "Nosso grupo escolheu criar um sistema de gamificação sustentável, com pontuação, ranking e validação automatizada de ações ambientais.",
                            ]}
                        />
                    </div>

                    <Reveal delay={150} className="grid gap-4">
                        <MediaCard variant="logo" src={imgFiap} alt="FIAP" />
                        <MediaCard variant="logo" src={imgSoulup} alt="SoulUp" />
                    </Reveal>
                </Grid>
            </Section>

            <Section size="sm" className="pt-0 lg:pt-0">
                <Reveal>
                    <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
                        {infos.map((info) => (
                            <div key={info.rotulo} className="bg-bg-card p-6 text-center sm:p-8">
                                <dd className="font-heading text-4xl font-extrabold text-green-primary">{info.valor}</dd>
                                <dt className="mt-1 font-semibold text-text-main">{info.rotulo}</dt>
                                <p className="mt-1 text-sm text-text-secondary">{info.detalhe}</p>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </Section>

            <Section variant="secondary">
                <SectionHeading
                    label=""
                    title="Desafio"
                    size="lg"
                    text="Transformar ações sustentáveis em pontos justos e comparáveis entre os usuários, com escala, validação automática, prevenção de fraudes e engajamento contínuo. A comprovação das atividades deveria ser feita por vídeo."
                />

                <Reveal delay={100}>
                    <h3 className="mt-14 font-heading text-xl font-extrabold tracking-tight">Objetivos</h3>

                    <ol className="mt-4 divide-y divide-border border-y border-border">
                        {objetivos.map((objetivo, indice) => (
                            <li
                                key={objetivo.title}
                                className="grid gap-1 py-5 sm:grid-cols-[4rem_14rem_1fr] sm:items-baseline sm:gap-6 sm:py-6"
                            >
                                <span className="font-heading text-3xl font-extrabold text-green-primary/40">
                                    0{indice + 1}
                                </span>
                                <h4 className="font-heading text-lg font-bold">{objetivo.title}</h4>
                                <p className="text-text-secondary">{objetivo.text}</p>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </Section>

            <Section>
                <SectionHeading
                    label=""
                    title="Solução"
                    size="lg"
                    text="A Greenlify é um módulo da SoulUp. O usuário cumpre uma missão, envia um vídeo como comprovação e a plataforma valida, pontua e atualiza o ranking, com streak, resumo mensal e fingerprint de mídia para reduzir fraudes."
                />

                <ol className="relative mt-12 grid gap-8 lg:grid-cols-5 lg:gap-4">
                    <div
                        aria-hidden
                        className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-green-primary/20 lg:block"
                    />

                    {solucao.map((etapa, indice) => (
                        <Reveal key={etapa.title} delay={indice * 90}>
                            <li className="relative flex gap-4 lg:flex-col lg:gap-3">
                                <span className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-primary text-xl text-white shadow-md shadow-green-primary/25">
                                    {etapa.icon}
                                </span>

                                <div>
                                    <h3 className="font-heading font-bold">
                                        {indice + 1}. {etapa.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{etapa.text}</p>
                                </div>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </Section>

            <CtaBanner
                title={<>Veja o projeto funcionando</>}
                text="Explore as funcionalidades da plataforma em demonstrações interativas."
            >
                <Button to="/nossasolucao#demonstracao" variant="dark" size="lg">
                    Abrir demonstração
                </Button>
            </CtaBanner>

            <Section variant="secondary">
                <Grid split="even">
                    <div>
                        <SectionHeading label="" title="Roadmap" />
                        <Reveal delay={100} className="mt-10">
                            <Roadmap />
                        </Reveal>
                    </div>

                    <div>
                        <SectionHeading label="" title="Tecnologias" />
                        <Reveal delay={100}>
                            <ul className="mt-8 flex flex-wrap gap-3">
                                {tecnologias.map((tecnologia) => (
                                    <li
                                        key={tecnologia.title}
                                        title={tecnologia.text}
                                        className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 font-heading text-sm font-bold text-text-main"
                                    >
                                        <span className="text-green-primary" aria-hidden>
                                            {tecnologia.icon}
                                        </span>
                                        {tecnologia.title}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary">
                                Interface em React com TypeScript, build com Vite e estilização responsiva com Tailwind CSS.
                            </p>
                        </Reveal>
                    </div>
                </Grid>
            </Section>
        </>
    );
}