import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    FaBullseye,
    FaCalendarDays,
    FaChartColumn,
    FaCircleCheck,
    FaCompass,
    FaFire,
    FaListCheck,
    FaLock,
    FaMagnifyingGlassChart,
    FaMedal,
    FaTrophy,
    FaUser,
    FaUsers,
    FaVideo,
    FaClipboardList,
    FaMobileScreen,
} from "react-icons/fa6";

import soulup from "../../assets/img/sobre/img-soulup.png";
import CtaBanner from "../../components/layout/CtaBanner";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import SectionHeading from "../../components/layout/SectionHeading";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Dashboard from "../../components/ui/Dashboard";
import FeatureCard from "../../components/ui/FeatureCard";
import ItemList from "../../components/ui/ItemList";
import MediaCard from "../../components/ui/MediaCard";
import DemoShowcase, { type DemoScreen, DemoOverview } from "../../features/demo/components/DemoShowcase";
import PhoneDemo from "../../features/demo/components/PhoneDemo";
import Grupos from "../Grupos";
import MissaoDetalhe from "../MissaoDetalhe";
import Missoes from "../Missoes";
import Perfil from "../Perfil";
import Rankings from "../Rankings";
import Resumo from "../Resumo";
import Validacao from "../Validacao";
import { useMissoesContinuas } from "../../features/missions/hooks/useMissoes";
import { useGrupos } from "../../features/groups/hooks/useGroups";
import { usePerfil } from "../../features/profile/hooks/useProfile";
import { useIsMobile } from "../../shared/hooks/useMediaQuery";

const passos = [
    { icon: <FaListCheck />, title: "Escolha uma missão", text: "O usuário escolhe entre missões mensais e contínuas, considerando seus diferentes níveis de impacto e dificuldade." },
    { icon: <FaVideo />, title: "Envie a comprovação", text: "Após realizar a ação, o usuário envia um vídeo para comprovar a execução da missão." },
    { icon: <FaMagnifyingGlassChart />, title: "Validação automática", text: "O conteúdo enviado passa por análise automatizada para verificar sua correspondência com a missão." },
    { icon: <FaChartColumn />, title: "Receba sua pontuação", text: "Com a validação concluída, a pontuação e o XP do usuário são atualizados." },
];

const engajamento = [
    { icon: <FaFire />, title: "Streak", text: "Incentiva a continuidade da participação nas missões sustentáveis." },
    { icon: <FaTrophy />, title: "Recompensas", text: "Pontos acumulados podem gerar benefícios dentro da SoulUp." },
    { icon: <FaUsers />, title: "Comunidade", text: "Usuários podem participar de grupos e acompanhar resultados coletivos." },
    { icon: <FaMedal />, title: "Evolução", text: "O desempenho do usuário pode ser acompanhado ao longo do tempo." },
];

const funcionalidades = [
    { title: "Missões", text: "Atividades mensais e contínuas com critérios definidos de impacto ambiental e dificuldade." },
    { title: "Validação inteligente", text: "Análise automatizada dos vídeos enviados, incluindo verificação de duplicidade por fingerprint." },
    { title: "Pontuação e XP", text: "O usuário acumula pontos e XP de acordo com suas ações e resultados das validações." },
    { title: "Ranking e recompensas", text: "Rankings mensais e gerais incentivam a participação e dão acesso a recompensas." },
    { title: "Perfil sustentável", text: "O usuário acompanha seu XP, nível de contribuição, pontuação e impacto ambiental." },
    { title: "Grupos", text: "A participação coletiva permite acompanhar resultados e rankings de grupos." },
];

const visaoGeral = [
    { to: "/missoes", label: "Missões", text: "Filtre por dificuldade e impacto ambiental.", icon: <FaCompass /> },
    { to: "/missoes/:id", label: "Detalhes da missão", text: "Critérios, recompensa e comprovação.", icon: <FaClipboardList /> },
    { to: "/validacao", label: "Validação por IA", text: "Envie o vídeo e acompanhe a análise.", icon: <FaMagnifyingGlassChart /> },
    { to: "/perfil", label: "Perfil sustentável", text: "Nível, XP, streak e histórico.", icon: <FaUser /> },
    { to: "/rankings", label: "Rankings", text: "Pódio, listagem e período.", icon: <FaTrophy /> },
    { to: "/grupos", label: "Grupos", text: "Comunidades para entrar e acompanhar.", icon: <FaUsers /> },
    { to: "/resumo", label: "Resumo mensal", text: "Cartão de evolução para compartilhar.", icon: <FaCalendarDays /> },
];

export default function NossaSolucao() {
    const { hash } = useLocation();
    const { missoes } = useMissoesContinuas();
    const { perfil } = usePerfil();
    const { grupos } = useGrupos();
    const isMobile = useIsMobile();

    useEffect(() => {
        if (hash !== "#demonstracao") return;

        const timer = setTimeout(() => {
            document.getElementById("demonstracao")?.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 80);

        return () => clearTimeout(timer);
    }, [hash]);

    const telas: DemoScreen[] = [
        {
            id: "visao-geral",
            label: "Visão geral",
            path: "/nossasolucao",
            render: () => (
                <DemoOverview
                    items={visaoGeral.map((item) => ({ ...item, to: item.to.replace(":id", missoes[0]?.id ?? "") }))}
                    stats={[
                        { value: String(missoes.length), title: "missões disponíveis" },
                        { value: String(grupos.length), title: "grupos de comunidade" },
                        { value: perfil ? `${perfil.xpSustentavel} XP` : "—", title: "no seu perfil" },
                    ]}
                />
            ),
        },
        { id: "missoes", label: "Missões", path: "/missoes", render: () => <Missoes /> },
        { id: "detalhe", label: "Detalhes da missão", shortLabel: "Detalhe", path: "/missoes/:id", render: (missaoId) => <MissaoDetalhe missaoId={missaoId} /> },
        { id: "validacao", label: "Validação por IA", shortLabel: "Validação", path: "/validacao", render: (missaoId) => <Validacao missaoId={missaoId} /> },
        { id: "perfil", label: "Perfil sustentável", shortLabel: "Perfil", path: "/perfil", render: () => <Perfil /> },
        { id: "rankings", label: "Rankings", path: "/rankings", render: () => <Rankings /> },
        { id: "grupos", label: "Grupos", path: "/grupos", render: () => <Grupos /> },
        { id: "resumo", label: "Resumo mensal", shortLabel: "Resumo", path: "/resumo", render: () => <Resumo /> },
    ];

    return (
        <>
            <Hero
                badge={<><FaBullseye /> Greenlify × SoulUp</>}
                title={<>Nossa <span className="textGradient">Solução</span></>}
                text="A Greenlify transforma ações sustentáveis em uma experiência de gamificação dentro da SoulUp, conectando missões, validação, pontuação e recompensas."
                visual={
                    <Dashboard
                        variant="window"
                        mission="Participar de uma ação de reciclagem"
                        reward="Missão · +90 pts"
                        level="Contribuidora"
                        xp="780 / 1000 XP"
                        progress={78}
                    />
                }
            >
                <Button href="#demonstracao" size="lg" arrow>
                    Explorar a demonstração
                </Button>

                <Button href="#como-funciona" variant="secondary" size="lg">
                    Conhecer o funcionamento
                </Button>
            </Hero>

            {isMobile ? (
                <Section id="demonstracao" size="sm">
                    <div className="text-center">
                        <Badge variant="purple">
                            <FaMobileScreen aria-hidden /> Simulação do app da SoulUp
                        </Badge>

                        <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight">
                            Experimente a Greenlify dentro do app da SoulUp
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                            Toque nas telas para escolher missões, filtrar por impacto e dificuldade, enviar um vídeo
                            e acompanhar o ranking, como se estivesse usando o app. Os dados vêm do nosso back-end.
                        </p>
                    </div>

                    <div className="mt-6 w-full overflow-visible bg-white">
                        <PhoneDemo />
                    </div>
                </Section>
            ) : (
                <Section variant="secondary" id="demonstracao">
                    <SectionHeading
                        align="center"
                        label="Demonstração interativa"
                        title="Navegue pelo produto, tela por tela"
                        text="Cada aba abre uma tela real da plataforma, sem sair desta página."
                    />

                    <div className="mt-4 flex justify-center">
                        <Badge variant="purple">
                            <FaLock aria-hidden /> Telas reais conectadas ao back-end da Greenlify
                        </Badge>
                    </div>

                    <div className="mt-10">
                        <DemoShowcase
                            screens={telas}
                            missions={missoes.map((missao) => ({ id: missao.id, titulo: missao.titulo }))}
                        />
                    </div>
                </Section>
            )}

            <Section variant="mint" id="como-funciona">
                <SectionHeading
                    label="Como funciona"
                    title="Um módulo integrado à SoulUp, em quatro passos"
                    text="O usuário participa de missões sustentáveis, comprova suas ações e acompanha sua evolução dentro da plataforma."
                />

                <Grid columns={4} className="mt-12">
                    {passos.map((passo, index) => (
                        <Reveal key={passo.title} delay={index * 110}>
                            <FeatureCard icon={passo.icon} title={passo.title} text={passo.text} step={index + 1} tone="solid" />
                        </Reveal>
                    ))}
                </Grid>
            </Section>

            <Section variant="night">
                <Grid split="even" align="center">
                    <Reveal>
                        <SectionHeading
                            onDark
                            label="Integração e validação"
                            title="Evidências analisadas, benefícios dentro da SoulUp"
                            text="O conteúdo enviado passa por análise automatizada e pelas regras de cada missão. Com a validação concluída, a pontuação do usuário é atualizada e os pontos acumulados podem gerar benefícios dentro da SoulUp."
                        />

                        <ul className="mt-6 space-y-3">
                            {[
                                "Análise automatizada dos vídeos enviados",
                                "Verificação de duplicidade por fingerprint",
                                "Critérios objetivos definidos por missão",
                                "Pontos que podem virar benefícios na SoulUp",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm">
                                    <FaCircleCheck className="mt-0.5 shrink-0 text-green-light" aria-hidden />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Button to="/nossasolucao?tela=validacao#demonstracao" variant="accent" size="lg" arrow className="mt-8">
                            Testar a validação
                        </Button>
                    </Reveal>

                    <Reveal delay={150}>
                        <MediaCard
                            variant="partner"
                            label="Integrado à"
                            src={soulup}
                            alt="Logotipo da SoulUp"
                            text="A Greenlify funciona como um módulo da SoulUp: missões, comprovação e evolução acontecem dentro da mesma plataforma."
                        />
                    </Reveal>
                </Grid>
            </Section>

            <Section>
                <SectionHeading
                    label="Progressão e gamificação"
                    title="Mecanismos para manter a constância"
                    text="O streak acompanha a sequência de participação, enquanto os rankings, níveis e recompensas incentivam o usuário a continuar evoluindo dentro da plataforma."
                />

                <Grid split="wide-left" className="mt-12">
                    <Grid columns={2}>
                        {engajamento.map((item, index) => (
                            <Reveal key={item.title} delay={index * 90}>
                                <FeatureCard icon={item.icon} title={item.title} text={item.text} tone="purple" />
                            </Reveal>
                        ))}
                    </Grid>

                    <Reveal delay={120}>
                        <ItemList variant="definition" title="Principais funcionalidades" items={funcionalidades} />
                    </Reveal>
                </Grid>
            </Section>

            <CtaBanner
                title="Conheça a solução"
                text="Volte à demonstração interativa ou leia um pouco sobre nossa proposta"
            >
                <Button href="#demonstracao" variant="dark" size="lg" arrow>
                    Voltar à demonstração
                </Button>

                <Button to="/missoes" variant="outline" size="lg">
                    Conhecer projeto
                </Button>
            </CtaBanner>
        </>
    );
}