import { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import Grid from "../../components/layout/Grid";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Feedback from "../../components/ui/Feedback";
import Toast, { type ToastType } from "../../components/ui/Toast";
import SummaryCard from "../../features/profile/components/SummaryCard";
import { usePerfil } from "../../features/profile/hooks/useProfile";

function mesAtual() {
    const texto = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    return texto.charAt(0).toUpperCase() + texto.slice(1).replace(" de ", " de ");
}

export default function Resumo() {
    const cardRef = useRef<HTMLDivElement>(null);
    const { usuario, perfil, impacto, carregando, erro } = usePerfil();
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
        if (!cardRef.current || !impacto) {
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
                    text: `Em ${mesAtual()}, concluí ${impacto.missoesConcluidas} missões sustentáveis e tenho ${impacto.pontos} pontos na Greenlify.`,
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
            <Section size="sm">
                {erro ? (
                    <Feedback tipo="erro" mensagem={erro} />
                ) : carregando || !usuario || !perfil || !impacto ? (
                    <Card hover={false} className="h-96" children={undefined} />
                ) : (
                    <Grid split="wide-left">
                        <Reveal delay={100}>
                            <div ref={cardRef}>
                                <SummaryCard
                                    mes={mesAtual()}
                                    nome={usuario.nome}
                                    nivel={perfil.nivel.nome}
                                    stats={[
                                        { value: impacto.missoesConcluidas, label: "missões concluídas" },
                                        { value: impacto.pontos, label: "pontos" },
                                        { value: perfil.xpSustentavel, label: "de XP" },
                                    ]}
                                    sequencia={`${impacto.mesesDeStreak} ${impacto.mesesDeStreak === 1 ? "mês" : "meses"} de streak`}
                                    posicao={impacto.posicaoRanking > 0 ? `${impacto.posicaoRanking}º no ranking` : "Fora do ranking"}
                                />
                            </div>
                        </Reveal>

                        <Reveal delay={180}>
                            <SummaryCard variant="share" onShare={compartilhar} onCopy={copiarLink} copied={copiado} />
                        </Reveal>
                    </Grid>
                )}
            </Section>

            <Toast message={aviso?.mensagem ?? null} type={aviso?.tipo} onClose={() => setAviso(null)} />
        </>
    );
}