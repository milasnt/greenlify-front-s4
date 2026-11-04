import { useState } from "react";
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
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Feedback from "../../components/ui/Feedback";
import IconBox from "../../components/ui/IconBox";
import Roadmap, { type RoadmapItem } from "../../components/ui/Roadmap";
import Upload from "../../features/missions/components/Upload";
import { useMissaoContinua } from "../../features/missions/hooks/useMissoes";
import AnalysisResult, { type AnalysisStatus } from "../../features/validation/components/AnalysisResult";
import VideoFrames from "../../features/validation/components/VideoFrames";
import { useEnviarEvidencia } from "../../features/validation/hooks/useEnviarEvidencia";
import { statusDoUpload } from "../../features/validation/utils/statusUpload";

interface ValidacaoProps {
    missaoId?: string;
}

const etapas = [
    { id: "leitura", titulo: "Envio do vídeo", descricao: "O arquivo é enviado ao servidor da Greenlify", icon: <FaCloudArrowUp /> },
    { id: "quadros", titulo: "Análise do quadro", descricao: "A IA gera a impressão digital (pHash) do vídeo", icon: <FaClapperboard /> },
    { id: "comparacao", titulo: "Comparação com envios anteriores", descricao: "O back-end procura vídeos semelhantes", icon: <FaMagnifyingGlassChart /> },
    { id: "regras", titulo: "Parecer da IA e regras", descricao: "O Gemini confere a missão e as regras definem o status", icon: <FaListCheck /> },
];

export default function Validacao({ missaoId }: ValidacaoProps) {
    const [searchParams] = useSearchParams();
    const [arquivo, setArquivo] = useState<File | null>(null);
    const { estado, enviar, reiniciar } = useEnviarEvidencia();

    const idMissao = missaoId ?? searchParams.get("missao") ?? undefined;
    const { missao, carregando, erro } = useMissaoContinua(idMissao);

    function enviarEvidencia() {
        if (arquivo && missao) void enviar(arquivo, Number(missao.id));
    }

    function enviarNovamente() {
        setArquivo(null);
        reiniciar();
    }

    const processando = estado.tipo === "processando";
    const etapaAtual = processando ? estado.etapa : estado.tipo === "resultado" ? etapas.length : -1;

    const status: AnalysisStatus =
        estado.tipo === "processando"
            ? "processing"
            : estado.tipo === "resultado"
            ? statusDoUpload(estado.upload.status)
            : "waiting";

    const itensAnalise: RoadmapItem[] = etapas.map((etapa, index) => ({
        title: etapa.titulo,
        text: etapa.descricao,
        icon: etapaAtual > index ? <FaCheck /> : etapa.icon,
        status: etapaAtual > index ? "done" : processando && estado.etapa === index ? "active" : "default",
    }));

    return (
        <>
            <Section size="sm">
                {!idMissao ? (
                    <Card hover={false} className="flex flex-wrap items-center justify-between gap-4 p-5">
                        <p className="text-sm text-text-secondary">Escolha uma missão para enviar a evidência.</p>

                        <Button to="/missoes" variant="secondary">
                            Ver missões
                        </Button>
                    </Card>
                ) : carregando ? (
                    <div className="h-24 animate-pulse rounded-2xl border border-border bg-bg-card" />
                ) : erro || !missao ? (
                    <Feedback tipo="erro" mensagem={erro ?? "Missão não encontrada."} />
                ) : (
                    <>
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
                                        fileName={arquivo?.name ?? null}
                                        disabled={estado.tipo === "processando" || estado.tipo === "resultado"}
                                        onSelectFile={setArquivo}
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

                                    {estado.tipo === "erro" && (
                                        <Feedback tipo="erro" mensagem={estado.mensagem} className="mt-6" />
                                    )}

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Button onClick={enviarEvidencia} disabled={!arquivo || processando || estado.tipo === "resultado"}>
                                            <FaMicrochip aria-hidden />
                                            {estado.tipo === "erro" ? "Tentar novamente" : "Enviar para análise"}
                                        </Button>

                                        {(estado.tipo === "resultado" || estado.tipo === "erro") && (
                                            <Button variant="secondary" onClick={enviarNovamente}>
                                                <FaRotateRight aria-hidden />
                                                Enviar outro vídeo
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
                                    parecer={estado.tipo === "resultado" ? estado.upload.analise : undefined}
                                    limiteRealizacoes={missao.limiteRealizacoes}
                                    pontos={missao.pontos}
                                />
                            </Reveal>
                        </Grid>
                    </>
                )}
            </Section>
        </>
    );
}
