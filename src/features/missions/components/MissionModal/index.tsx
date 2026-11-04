import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaListCheck, FaWandMagicSparkles } from "react-icons/fa6";
import Reveal from "../../../../components/layout/Reveal";
import Badge, { type Impacto, type Dificuldade } from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";
import ItemList from "../../../../components/ui/ItemList";

interface MissionModalProps {
    id?: string;
    titulo: string;
    descricao: string;
    impacto: Impacto;
    dificuldade: Dificuldade;
    pontos: number;
    limiteRealizacoes?: number;
    criteria: ReactNode;
    backTo?: string;
}

export default function MissionModal({
    id,
    titulo,
    descricao,
    impacto,
    dificuldade,
    pontos,
    criteria,
    backTo = "/missoes",
}: MissionModalProps) {

    return (
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
            <Reveal>
                <Link
                    to={backTo}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition duration-300 hover:text-green-primary"
                >
                    <FaArrowLeft aria-hidden />
                    Voltar para missões
                </Link>
            </Reveal>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
                <div className="space-y-10">
                    <Reveal>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge type="dificuldade" value={dificuldade} />
                            <Badge type="impacto" value={impacto} />
                        </div>

                        <h1 className="mt-4 wrap-break-word font-heading text-2xl font-extrabold tracking-tight xs:text-3xl sm:text-4xl">
                            {titulo}
                        </h1>

                        <p className="mt-4 leading-relaxed text-text-secondary">
                            {descricao}
                        </p>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-text-main">
                            <FaListCheck className="text-green-primary" aria-hidden />
                            Critérios para conclusão
                        </h2>

                        {criteria}
                    </Reveal>
                </div>

                <Reveal delay={120}>
                    <aside className="rounded-3xl bg-night p-6 text-night-text sm:p-7 lg:sticky lg:top-24">
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-light">
                            Recompensa
                        </p>

                        <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
                            <div>
                                <p className="font-heading text-4xl font-extrabold text-green-light">+{pontos}</p>
                                <p className="text-xs text-night-muted">pontos</p>
                            </div>
                        </div>

                        <ItemList
                            variant="status"
                            className="mt-6 border-t border-night-line pt-6"
                            items={[
                                { title: "Impacto", value: impacto },
                                { title: "Dificuldade", value: dificuldade },
                                { title: "Evidência", value: "Vídeo curto" },
                            ]}
                        />

                        {id && (
                            <Button
                                to={`/validacao?missao=${id}`}
                                variant="accent"
                                size="lg"
                                full
                                arrow
                                className="mt-7"
                            >
                                Testar validação por IA
                            </Button>
                        )}

                        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-night-muted">
                            <FaWandMagicSparkles className="mt-0.5 shrink-0 text-green-light" aria-hidden />
                            Você enviará um vídeo como evidência. A IA auxilia na análise e as regras da
                            Greenlify decidem a aprovação.
                        </p>
                    </aside>
                </Reveal>
            </div>
        </section>
    );
}
