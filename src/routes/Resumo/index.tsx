import { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import { FaChartLine, FaWandMagicSparkles } from "react-icons/fa6";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import ItemList from "../../components/ui/ItemList";
import Toast, { type ToastType } from "../../components/ui/Toast";
import SummaryCard from "../../features/profile/components/SummaryCard";

const resumoMensal = {
    mes: "Outubro de 2026",
    nome: "Camila",
    nivel: "Contribuidora",
    pontos: 420,
    missoesConcluidas: 7,
    xpGanho: 310,
    streak: "4 meses de streak",
    posicao: "3º no ranking",
    categorias: [
        { nome: "Reciclagem", valor: 3 },
        { nome: "Reuso", valor: 2 },
        { nome: "Consumo", valor: 1 },
        { nome: "Coleta", valor: 1 },
    ],
    comparativo: [
        { label: "Missões concluídas", value: "+2" },
        { label: "Pontos conquistados", value: "+18%" },
        { label: "Posição no ranking", value: "5º → 3º" },
    ],
};

export default function Resumo() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [copiado, setCopiado] = useState(false);
    const [aviso, setAviso] = useState<{ mensagem: string; tipo: ToastType } | null>(null);

    async function copiarLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopiado(true);
            setAviso({ mensagem: "Link do resumo copiado.", tipo: "success" });
            window.setTimeout(() => setCopiado(false), 2500);
        } catch {
            setAviso({ mensagem: "Não foi possível copiar o link automaticamente.", tipo: "error" });
        }
    }

    async function compartilhar() {
        if (!cardRef.current) {
            setAviso({ mensagem: "Não foi possível gerar a imagem do resumo.", tipo: "error" });
            return;
        }

        try {
            const blob = await toBlob(cardRef.current, {
                pixelRatio: 2,
                cacheBust: true,
                backgroundColor: "#101820",
            });

            if (!blob) {
                throw new Error("Não foi possível gerar a imagem.");
            }

            const arquivo = new File([blob], "meu-resumo-greenlify.png", {
                type: "image/png",
            });

            if (navigator.share && navigator.canShare?.({ files: [arquivo] })) {
                await navigator.share({
                    title: "Meu mês na Greenlify",
                    text: `Em ${resumoMensal.mes}, concluí ${resumoMensal.missoesConcluidas} missões sustentáveis e somei ${resumoMensal.pontos} pontos na Greenlify.`,
                    files: [arquivo],
                });

                setAviso({ mensagem: "Imagem compartilhada.", tipo: "success" });
                return;
            }

            const urlImagem = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = urlImagem;
            link.download = "meu-resumo-greenlify.png";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.setTimeout(() => URL.revokeObjectURL(urlImagem), 1000);

            setAviso({ mensagem: "Imagem do resumo baixada!", tipo: "success" });
        } catch (erro) {
            if (erro instanceof Error && erro.name === "AbortError") {
                return;
            }

            console.error("Erro ao gerar ou compartilhar a imagem:", erro);
            setAviso({ mensagem: "Não foi possível gerar ou compartilhar a imagem.", tipo: "error" });
        }
    }

    return (
        <>
            <Hero
                badge={<><FaWandMagicSparkles /> Compartilhe seu impacto</>}
                title={<>Seu mês em uma <span className="textGradient">peça visual</span></>}
                text={`O resumo transforma seus resultados em uma imagem para compartilhar na SoulUp e onde mais você quiser. Dados demonstrativos do perfil de ${resumoMensal.nome}.`}
            />

            <Section size="sm">
                <Grid split="wide-left">
                    <Reveal delay={100}>
                        <div ref={cardRef}>
                            <SummaryCard
                                mes={resumoMensal.mes}
                                nome={resumoMensal.nome}
                                nivel={resumoMensal.nivel}
                                stats={[
                                    { value: resumoMensal.missoesConcluidas, label: "missões concluídas" },
                                    { value: resumoMensal.pontos, label: "pontos" },
                                    { value: `+${resumoMensal.xpGanho}`, label: "de XP" },
                                ]}
                                categorias={resumoMensal.categorias}
                                sequencia={resumoMensal.streak}
                                posicao={resumoMensal.posicao}
                            />
                        </div>
                    </Reveal>

                    <Reveal delay={180}>
                        <SummaryCard variant="share" onShare={compartilhar} onCopy={copiarLink} copied={copiado}>
                            <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-text-main">
                                <FaChartLine className="text-green-primary" aria-hidden />
                                Comparativo com setembro
                            </h3>

                            <ItemList
                                variant="status"
                                items={resumoMensal.comparativo.map((item) => ({ title: item.label, value: item.value }))}
                            />
                        </SummaryCard>
                    </Reveal>
                </Grid>
            </Section>

            <Toast message={aviso?.mensagem ?? null} type={aviso?.tipo} onClose={() => setAviso(null)} />
        </>
    );
}