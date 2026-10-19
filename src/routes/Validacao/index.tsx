import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    FaClapperboard,
    FaFileVideo,
    FaListCheck,
    FaMagnifyingGlassChart,
    FaMicrochip,
    FaRotateRight,
    FaCloudArrowUp,
    FaCheck,
} from "react-icons/fa6";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import IconBox from "../../components/ui/IconBox";
import Roadmap, { type RoadmapItem } from "../../components/ui/Roadmap";
import Upload from "../../features/missions/components/Upload";
import AnalysisResult, { type AnalysisStatus } from "../../features/validation/components/AnalysisResult";
import VideoFrames from "../../features/validation/components/VideoFrames";


interface ValidacaoProps {
    missaoId?: string;
}

type Resultado = "aprovada" | "parcialmente_aprovada" | "rejeitada";

type Estado =
    | { tipo: "aguardando" }
    | { tipo: "processando"; etapa: number; resultado: Resultado }
    | { tipo: "resultado"; resultado: Resultado };

const etapas = [
    { id: "envio", titulo: "Envio do vídeo", descricao: "Verificação do arquivo e formato", icon: <FaCloudArrowUp /> },
    { id: "quadros", titulo: "Extração de quadros", descricao: "Amostras do vídeo são separadas", icon: <FaClapperboard /> },
    { id: "ia", titulo: "Análise visual por IA", descricao: "Identificação de elementos relevantes", icon: <FaMagnifyingGlassChart /> },
    { id: "regras", titulo: "Avaliação das regras", descricao: "Critérios da missão são conferidos", icon: <FaListCheck /> },
];

const INTERVALO_ETAPA = 1400;

export default function Validacao({ missaoId }: ValidacaoProps) {
    const [searchParams] = useSearchParams();
    const [estado, setEstado] = useState<Estado>({ tipo: "aguardando" });
    const [arquivo, setArquivo] = useState<string | null>(null);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const missao = missoes.find((item) => item.id === (missaoId ?? searchParams.get("missao"))) ?? missoes[0];

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    function limparTimers() {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }

    function simular(resultado: Resultado) {
        limparTimers();
        setEstado({ tipo: "processando", etapa: 0, resultado });

        etapas.forEach((_, index) => {
            timers.current.push(
                setTimeout(() => {
                    setEstado((atual) => (atual.tipo === "processando" ? { ...atual, etapa: index + 1 } : atual));
                }, (index + 1) * INTERVALO_ETAPA),
            );
        });

        timers.current.push(
            setTimeout(() => setEstado({ tipo: "resultado", resultado }), etapas.length * INTERVALO_ETAPA + 600),
        );
    }

    function reiniciar() {
        limparTimers();
        setArquivo(null);
        setEstado({ tipo: "aguardando" });
    }

    const processando = estado.tipo === "processando";
    const etapaAtual = processando ? estado.etapa : estado.tipo === "resultado" ? etapas.length : -1;

    const status: AnalysisStatus =
        estado.tipo === "aguardando"
            ? "waiting"
            : estado.tipo === "processando"
            ? "processing"
            : estado.resultado === "aprovada"
            ? "approved"
            : estado.resultado === "parcialmente_aprovada"
            ? "partially_approved"
            : "rejected";

    const itensAnalise: RoadmapItem[] = etapas.map((etapa, index) => ({
        title: etapa.titulo,
        text: etapa.descricao,
        icon: etapaAtual > index ? <FaCheck /> : etapa.icon,
        status: etapaAtual > index ? "done" : processando && estado.etapa === index ? "active" : "default",
    }));

    return (
        <>
            <Hero
                badge={<><FaMicrochip /> Validação por inteligência artificial</>}
                title="Envie a evidência. Acompanhe a análise."
                text={
                    <>
                        Esta é uma <strong className="text-text-main">demonstração interativa</strong>: a IA ainda
                        não está conectada a um serviço real. A IA auxilia identificando elementos visuais — quem
                        decide a aprovação são as regras da missão.
                    </>
                }
            />

            <Section size="sm">
                <Reveal>
                    <Card hover={false} className="flex flex-wrap items-center justify-between gap-4 p-5">
                        <div className="flex items-center gap-4">
                            <IconBox icon={<FaFileVideo />} size="lg" />

                            <div>
                                <p className="text-xs text-text-secondary">Missão selecionada</p>
                                <p className="font-heading font-bold text-text-main">{missao.titulo}</p>
                            </div>
                        </div>

                        <Link to="/missoes" className="text-sm font-semibold text-green-primary underline-offset-4 hover:underline">
                            Trocar missão
                        </Link>
                    </Card>
                </Reveal>

                <Grid split="wide-left" className="mt-8">
                    <Reveal delay={100}>
                        <Card hover={false}>
                            <Upload
                                variant="dropzone"
                                fileName={arquivo}
                                disabled={estado.tipo !== "aguardando"}
                                onSelectFile={(file) => setArquivo(file.name)}
                            />

                            <div className="mt-6">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Quadros extraídos
                                </p>

                                <VideoFrames
                                    stage={etapaAtual}
                                    scanning={processando && estado.etapa >= 2}
                                />
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button onClick={() => simular("aprovada")} disabled={processando}>
                                    <FaMicrochip aria-hidden />
                                    Simular análise
                                </Button>

                                <Button variant="secondary" onClick={() => simular("parcialmente_aprovada")} disabled={processando}>
                                    Simular aprovação parcial
                                </Button>

                                <Button variant="secondary" onClick={() => simular("rejeitada")} disabled={processando}>
                                    Simular reprovação
                                </Button>

                                {estado.tipo === "resultado" && (
                                    <Button variant="secondary" onClick={reiniciar}>
                                        <FaRotateRight aria-hidden />
                                        Enviar novamente
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </Reveal>

                    <Reveal delay={160} className="flex flex-col gap-6">
                        <Roadmap boxed items={itensAnalise} />

                        <AnalysisResult
                            status={status}
                            step={processando ? estado.etapa : 0}
                            totalSteps={etapas.length}
                            missionTitle={missao.titulo}
                            pontos={missao.pontos}
                            xp={missao.xp}
                        />
                    </Reveal>
                </Grid>
            </Section>
        </>
    );
}
