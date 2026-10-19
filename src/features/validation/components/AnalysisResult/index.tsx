import { FaArrowRight, FaCircleCheck, FaCircleExclamation, FaCircleXmark, FaMicrochip } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";

export type AnalysisStatus = "waiting" | "processing" | "approved" | "partially_approved" | "rejected";

interface AnalysisResultProps {
    status: AnalysisStatus;
    step?: number;
    totalSteps?: number;
    missionTitle: string;
    pontos: number;
    xp: number;
}

export default function AnalysisResult({
    status,
    step = 0,
    totalSteps = 4,
    missionTitle,
    pontos,
    xp,
}: AnalysisResultProps) {
    return (
        <div aria-live="polite" className="flex-1">
            {status === "waiting" && (
                <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-border p-6 text-center">
                    <FaCircleExclamation className="text-2xl text-text-secondary" aria-hidden />

                    <p className="mt-2 text-sm font-medium text-text-secondary">
                        Aguardando envio — simule uma análise para percorrer as etapas.
                    </p>
                </div>
            )}

            {status === "processing" && (
                <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-3xl bg-night p-6 text-center text-night-text">
                    <span className="relative grid h-12 w-12 place-items-center">
                        <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-green-light" aria-hidden />
                        <FaMicrochip className="text-2xl text-green-light" aria-hidden />
                    </span>

                    <p className="mt-3 font-heading text-sm font-bold">Analisando evidência…</p>

                    <p className="mt-1 text-xs text-night-muted">
                        Etapa {Math.min(step + 1, totalSteps)} de {totalSteps}
                    </p>
                </div>
            )}

            {status === "approved" && (
                <div className="rounded-3xl border border-green-light/50 bg-green-lighter p-6">
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-green-primary text-xl text-white">
                            <FaCircleCheck aria-hidden />
                        </span>

                        <div>
                            <p className="font-heading font-bold text-green-dark">Evidência aprovada</p>
                            <p className="text-xs text-green-dark/70">Resultado demonstrativo</p>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-green-dark">
                        Os elementos identificados atendem aos critérios de “{missionTitle}”.
                    </p>

                    <div className="mt-4 flex gap-6 border-t border-green-primary/15 pt-4">
                        <div>
                            <p className="font-heading text-2xl font-extrabold text-green-primary">+{pontos}</p>
                            <p className="text-xs text-green-dark/70">pontos</p>
                        </div>

                        <div>
                            <p className="font-heading text-2xl font-extrabold text-green-primary">+{xp}</p>
                            <p className="text-xs text-green-dark/70">XP</p>
                        </div>
                    </div>

                    <Button to="/perfil" size="md" className="mt-5">
                        Ver meu perfil
                        <FaArrowRight aria-hidden />
                    </Button>
                </div>
            )}

            {status === "partially_approved" && (
                <div className="rounded-3xl border border-yellow-500/30 bg-bg-card p-6">
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-yellow-500 text-xl text-white">
                            <FaCircleExclamation aria-hidden />
                        </span>
                        <div>
                            <p className="font-heading font-bold text-text-main">
                                Evidência parcialmente aprovada
                            </p>
                            <p className="text-xs text-text-secondary">Resultado demonstrativo</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-text-secondary">
                        Parte dos critérios de “{missionTitle}” foi atendida, mas é necessário complementar a evidência para confirmar a ação completa.
                    </p>
                    <p className="mt-4 text-sm font-medium text-text-main">
                        Envie uma nova evidência que demonstre os critérios restantes.
                    </p>
                </div>
            )}

            {status === "rejected" && (
                <div className="rounded-3xl border border-danger/30 bg-bg-card p-6">
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-danger text-xl text-white">
                            <FaCircleXmark aria-hidden />
                        </span>

                        <div>
                            <p className="font-heading font-bold text-text-main">Evidência não aprovada</p>
                            <p className="text-xs text-text-secondary">Resultado demonstrativo</p>
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                        <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden />
                            O conteúdo enviado não corresponde claramente à missão selecionada.
                        </li>

                        <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden />
                            Grave em ambiente iluminado e mostre a ação completa, sem cortes.
                        </li>
                    </ul>

                    <p className="mt-4 text-sm font-medium text-text-main">
                        Você pode enviar uma nova evidência quando quiser.
                    </p>
                </div>
            )}
        </div>
    );
}
