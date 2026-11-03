import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Badge, { type Impacto, type Dificuldade } from "../../../../components/ui/Badge";
import Card from "../../../../components/ui/Card";
import ProgressBar from "../../../../components/ui/ProgressBar";

interface MissionCardProps {
    id: string;
    titulo: string;
    descricao: string;
    impacto: Impacto;
    dificuldade: Dificuldade;
    pontos: number;
    xp: number;
    icon?: ReactNode;
    variant?: "default" | "featured" | "row";
    index?: number;
    label?: string;
}

export function MissionCard({
    id,
    titulo,
    descricao,
    impacto,
    dificuldade,
    pontos,
    xp,
    icon,
    variant = "default",
    index,
    label = "Missão em destaque",
}: MissionCardProps) {

    if (variant === "featured") {
        return (
            <Link
                to={`/missoes/${id}`}
                className="group relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-night p-6 text-night-text transition duration-300 hover:-translate-y-1 sm:p-10 lg:flex-row lg:items-end"
            >
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-light/25 blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden />
                <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-purple-primary/30 blur-3xl" aria-hidden />

                <div className="relative max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-green-light/15 px-3 py-1 text-xs font-bold text-green-light">
                            {label}
                        </span>

                        <Badge type="dificuldade" value={dificuldade} />
                        <Badge type="impacto" value={impacto} />
                    </div>

                    <h2 className="mt-4 font-heading text-2xl font-extrabold sm:text-3xl">
                        {titulo}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-night-muted">
                        {descricao}
                    </p>
                </div>

                <div className="relative flex shrink-0 flex-wrap items-center gap-6">
                    <div>
                        <p className="font-heading text-3xl font-extrabold text-green-light">
                            +{pontos}
                        </p>

                        <p className="text-xs text-night-muted">
                            pontos · {xp} XP
                        </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-green-light px-5 py-3 font-heading text-sm font-bold text-night">
                        Ver missão
                        <FaArrowUpRightFromSquare className="text-xs" aria-hidden />
                    </span>
                </div>
            </Link>
        );
    }

    if (variant === "row") {
        return (
            <Link
                to={`/missoes/${id}`}
                className="group flex items-center gap-5 rounded-3xl border border-border bg-bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-green-primary/40 hover:shadow-custom-md"
            >
                {index !== undefined && (
                    <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-green-lighter font-heading text-xl font-extrabold text-green-primary sm:grid">
                        {String(index).padStart(2, "0")}
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-lg font-bold text-text-main">
                            {titulo}
                        </h3>

                        <Badge type="impacto" value={impacto} />
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                        {descricao}
                    </p>
                </div>

                <span className="shrink-0 font-heading text-lg font-extrabold text-green-primary">
                    +{pontos}
                </span>
            </Link>
        );
    }

    return (
        <Link to={`/missoes/${id}`} className="group block h-full">
            <Card className="flex h-full flex-col">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    {icon && (
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-lighter text-xl text-green-primary">
                            {icon}
                        </div>
                    )}

                    <Badge type="dificuldade" value={dificuldade} />
                    <Badge type="impacto" value={impacto} />
                </div>

                <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-text-main">
                    {titulo}
                </h3>

                <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {descricao}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="font-heading font-extrabold text-green-primary">
                        +{pontos} pts
                    </span>

                    <span className="text-xs text-text-secondary">
                        +{xp} XP
                    </span>

                    <FaArrowRight className="text-green-primary transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </div>
            </Card>
        </Link>
    );
}

interface MissaoMensalProps {
    titulo: string;
    progresso: number;
    meta: number;
}

export function MissaoMensal({
    titulo,
    progresso,
    meta,
}: MissaoMensalProps) {
    const percentage = Math.min((progresso / meta) * 100, 100);

    return (
        <Card>
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <h3 className="mb-1 font-heading text-base font-bold leading-snug text-text-main">
                        {titulo}
                    </h3>

                    <p className="text-sm text-text-secondary">
                        {progresso} de {meta} concluídas
                    </p>
                </div>

                <span className="font-heading text-lg font-extrabold text-green-primary">
                    {Math.round(percentage)}%
                </span>
            </div>

            <ProgressBar value={percentage} label={titulo} />
        </Card>
    );
}