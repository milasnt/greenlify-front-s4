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
import FeatureCard from "../../components/ui/FeatureCard";
import Roadmap from "../../components/ui/Roadmap";
import MediaCard from "../../components/ui/MediaCard";

const objetivos = [
    { icon: <FaRobot />, title: "Validação Automatizada", text: "Desenvolver um sistema capaz de validar automaticamente ações sustentáveis enviadas pelos usuários." },
    { icon: <FaChartLine />, title: "Pontuação Justa", text: "Criar um modelo de pontuação baseado em impacto ambiental, dificuldade e consistência das ações." },
    { icon: <FaLeaf />, title: "Impacto Ambiental", text: "Permitir o acompanhamento do impacto ambiental gerado pelos usuários dentro da plataforma." },
    { icon: <FaUsers />, title: "Engajamento", text: "Incentivar a recorrência de participação através de missões, streaks, rankings e recompensas." },
];

const solucao = [
    { icon: <FaListCheck />, title: "Missões", text: "Missões contínuas e mensais com objetivos sustentáveis e critérios específicos de execução." },
    { icon: <FaRobot />, title: "Validação Inteligente", text: "Fotos e vídeos analisados por IA para verificar autenticidade e compatibilidade com a missão." },
    { icon: <FaChartLine />, title: "Pontuação", text: "Pontuação baseada no impacto ambiental, dificuldade da missão e resultado da validação." },
    { icon: <FaTrophy />, title: "Ranking e Prêmios", text: "Rankings mensais para conquistar bônus e benefícios dentro da plataforma." },
    { icon: <FaUsers />, title: "Engajamento", text: "Streak, metas mensais, rankings, recompensas e resumos compartilháveis." },
];

const tecnologias = [
    { icon: <FaReact />, title: "React", text: "Desenvolvimento da interface e criação de componentes reutilizáveis para a aplicação." },
    { icon: <FaBolt />, title: "Vite", text: "Ferramenta utilizada para configuração do projeto, desenvolvimento e build da aplicação." },
    { icon: <FaCode />, title: "TypeScript", text: "Tipagem dos componentes, propriedades, dados e funcionalidades da aplicação." },
    { icon: <FaCss3Alt />, title: "Tailwind CSS", text: "Estilização da interface, criação do layout e desenvolvimento responsivo das páginas." },
];

export default function Sobre() {
    return (
        <>
            <Hero
                badge={<><FaSeedling /> Sobre a Greenlify</>}
                title={<>Gameficação e <span className="textGradient">Sustentabilidade</span></>}
                text="Conheça a Greenlify, a solução desenvolvida para a SoulUp que transforma ações sustentáveis em desafios, pontuações e recompensas reais dentro da plataforma."
                visual={<div className="flex h-30 w-30 items-center justify-center rounded-[2.5rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[2.5rem] text-green-primary" /></div>}
            />

            <Section size="sm">
                <Grid split="wide-left" align="center">
                    <div>
                        <SectionHeading label="Sobre o projeto" title="Contexto" size="lg" text={[
                                    "A SoulUp é uma plataforma digital focada em engajamento e recompensas sustentáveis, criada a partir da integração entre a Prospera e a startup SoulPrime. Em parceria com a FIAP, a empresa propôs aos alunos o desenvolvimento de soluções reais para desafios existentes dentro da plataforma.",
                                    "Entre os desafios apresentados, nosso grupo escolheu desenvolver um sistema de gamificação sustentável capaz de incentivar ações ambientais dentro do aplicativo da SoulUp, utilizando mecanismos de pontuação, ranking e validação automatizada.",
                                ]} />
                    </div>

                    <Reveal delay={150} className="grid gap-4">
                        <MediaCard variant="logo" src={imgFiap} alt="FIAP" />
                        <MediaCard variant="logo" src={imgSoulup} alt="SoulUp" />
                    </Reveal>
                </Grid>
            </Section>

            <Section variant="secondary">
                <SectionHeading label="Sobre o projeto" title="Desafio" size="lg" text={[
                            "O principal objetivo do desafio era criar uma solução capaz de transformar ações sustentáveis em pontuações justas e comparáveis entre os usuários da plataforma.",
                            "Além disso, o sistema precisava resolver problemas importantes relacionados à escalabilidade, validação automática das ações, prevenção de fraudes e manutenção do engajamento contínuo dos usuários.",
                            "Outro requisito do challenge era a utilização de vídeos como forma de comprovação das atividades realizadas, permitindo que as ações fossem analisadas automaticamente pela plataforma.",
                        ]} />

                <SectionHeading label="Sobre o projeto" title="Objetivos" className="mt-16" />

                <Grid columns={4} className="mt-10">
                    {objetivos.map((item, index) => (
                        <Reveal key={item.title} delay={index * 90}>
                            <FeatureCard {...item} />
                        </Reveal>
                    ))}
                </Grid>
            </Section>

            <Section>
                <SectionHeading label="Sobre o projeto" title="Solução" size="lg" text={[
                            "A Greenlify funciona como um módulo integrado à SoulUp, no qual os usuários podem participar de missões sustentáveis dentro do aplicativo.",
                            "As missões são divididas entre atividades contínuas e mensais. Após concluir uma ação, o usuário envia um vídeo como comprovação, que passa por um processo de validação automatizada utilizando inteligência artificial, análise comportamental e fingerprint de mídia. Com base no impacto ambiental da missão, na dificuldade da atividade e no resultado da validação, o sistema calcula a pontuação do usuário e atualiza o ranking da plataforma.",
                            "Além disso, a solução também conta com um sistema de streak, compartilhamento de desempenho mensal, níveis de contribuição e um sistema de fingerprint que captura os uploads de fotos e vídeos enviados pelo usuário, incentivando o engajamento contínuo e reduzindo comportamentos fraudulentos dentro do aplicativo.",
                        ]} />

                <Grid className="mt-10">
                    {solucao.map((item, index) => (
                        <Reveal key={item.title} delay={(index % 3) * 90}>
                            <FeatureCard {...item} tone="purple" />
                        </Reveal>
                    ))}
                </Grid>
            </Section>

            <CtaBanner
                title={<>Veja o projeto funcionando</>}
                text="Explore as diferentes funcionalidades da plataforma através de demonstrações interativas."
            >
                <Button to="/missoes" variant="dark" size="lg" arrow>
                    Ver Missões
                </Button>

                <Button to="/nossasolucao#demonstracao" variant="outline" size="lg">
                    Abrir demonstração
                </Button>
            </CtaBanner>

            <Section variant="secondary">
                <Grid split="even">
                    <div>
                        <SectionHeading label="Sobre o projeto" title="Roadmap" />

                        <Reveal delay={100} className="mt-10">
                            <Roadmap />
                        </Reveal>
                    </div>

                    <div>
                        <SectionHeading label="Sobre o projeto" title="Tecnologias" />

                        <Grid columns={2} className="mt-10">
                            {tecnologias.map((item, index) => (
                                <Reveal key={item.title} delay={index * 90}>
                                    <FeatureCard {...item} />
                                </Reveal>
                            ))}
                        </Grid>
                    </div>
                </Grid>
            </Section>
        </>
    );
}
