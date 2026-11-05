import { FaMicrochip } from "react-icons/fa";
import { FaBullseye, FaChartLine, FaCheck, FaLeaf, FaLightbulb, FaRobot, FaTrophy, FaVideo } from "react-icons/fa6";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import SectionHeading from "../../components/layout/SectionHeading";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Dashboard from "../../components/ui/Dashboard";

const desafios = [
    "Transformar ações sustentáveis em pontos justos e comparáveis entre os usuários.",
    "Validar automaticamente o que cada pessoa envia, sem depender de análise manual.",
    "Impedir fraudes e manter o sistema funcionando conforme a plataforma cresce.",
    "Dar motivos para voltar: engajamento contínuo, não só uma participação isolada.",
];

const etapas = [
    { icon: <FaBullseye />, titulo: "Missões sustentáveis", texto: "Contínuas e mensais, cada uma com critérios claros de execução." },
    { icon: <FaVideo />, titulo: "Comprovação em vídeo", texto: "O usuário grava a ação e envia pelo app da SoulUp." },
    { icon: <FaRobot />, titulo: "Validação por IA", texto: "A análise confere se o vídeo é autêntico e combina com a missão." },
    { icon: <FaChartLine />, titulo: "Pontos por impacto", texto: "A pontuação considera impacto ambiental, dificuldade e resultado da validação." },
    { icon: <FaTrophy />, titulo: "Ranking e Selos Verdes", texto: "Rankings mensal, de grupos e geral, e incentivo à colelta de Selos Verdes." },
];

export default function Home() {
    return (
        <>
            <Hero
                variant="home"
                badge={<><FaMicrochip /> Gamificação + IA + Sustentabilidade</>}
                title={<>O próximo nível do <span className="textGradient">impacto ambiental</span></>}
                text="Uma experiência sustentável onde missões interativas transformam atitudes conscientes em evolução, recompensas e impacto positivo."
                visual={<Dashboard />}
            >
                <Button to="/nossasolucao#demonstracao" size="lg" arrow>
                    Testar interface
                </Button>

                <Button to="/sobre" variant="secondary" size="lg">
                    Conhecer projeto
                </Button>
            </Hero>

            <Section variant="secondary">
                <SectionHeading
                    align="center"
                    label="O desafio com a SoulUp"
                    title={<>Um problema real, uma <span className="textGradient">proposta</span> para resolvê-lo</>}
                    text="A SoulUp é uma plataforma de engajamento e recompensas sustentáveis. Em parceria com a FIAP, ela nos propôs criar uma forma de premiar quem realmente age pelo meio ambiente."
                />

                <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
                    <Reveal className="h-full">
                        <Card hover={false} className="h-full">
                            <p className="inline-flex items-center gap-2 font-heading text-sm font-bold text-green-primary">
                                <FaLightbulb aria-hidden /> O desafio
                            </p>

                            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-text-main">
                                Recompensar ações reais, com justiça e em escala
                            </h3>

                            <ul className="mt-6 space-y-4">
                                {desafios.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-text-secondary">
                                        <span
                                            className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-lighter text-xs text-green-primary"
                                            aria-hidden
                                        >
                                            <FaCheck />
                                        </span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </Reveal>

                    <Reveal delay={120} className="h-full">
                        <Card variant="night" hover={false} className="h-full">
                            <p className="inline-flex items-center gap-2 font-heading text-sm font-bold text-gold">
                                <FaLeaf aria-hidden /> Nossa proposta
                            </p>

                            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight">
                                A Greenlify, um módulo de gamificação dentro da SoulUp
                            </h3>

                            <ol className="mt-6 space-y-5">
                                {etapas.map((etapa, indice) => (
                                    <li key={etapa.titulo} className="flex items-start gap-4">
                                        <span
                                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-primary text-white shadow-md shadow-green-primary/25"
                                            aria-hidden
                                        >
                                            {etapa.icon}
                                        </span>

                                        <div>
                                            <p className="font-heading font-bold">
                                                {indice + 1}. {etapa.titulo}
                                            </p>
                                            <p className="mt-0.5 text-sm leading-relaxed text-night-muted">{etapa.texto}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </Reveal>
                </div>

                <Reveal delay={200} className="mt-10 flex flex-wrap justify-center gap-3">
                    <Button to="/sobre" arrow>
                        Entender o projeto
                    </Button>

                    <Button to="/nossasolucao" variant="secondary">
                        Ver a solução
                    </Button>
                </Reveal>
            </Section>
        </>
    );
}