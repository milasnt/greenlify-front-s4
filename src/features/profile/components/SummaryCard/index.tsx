import type { ReactNode } from "react";
import { FaCheck, FaCopy, FaFire, FaLeaf, FaMedal, FaShareNodes, FaTrophy, FaWandMagicSparkles } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";

interface SummaryStat {
    value: string | number;
    label: string;
}

interface SummaryCategory {
    nome: string;
    valor: number;
}

interface ShareProps {
    variant: "share";
    onShare: () => void;
    onCopy: () => void;
    copied?: boolean;
    children?: ReactNode;
}

interface CardProps {
    variant?: "card";
    mes: string;
    nome: string;
    nivel: string;
    stats: SummaryStat[];
    categorias: SummaryCategory[];
    sequencia: string;
    posicao: string;
}

type SummaryCardProps = CardProps | ShareProps;

export default function SummaryCard(props: SummaryCardProps) {
    if (props.variant === "share") {
        const { onShare, onCopy, copied = false, children } = props;

        return (
            <div className="rounded-3xl border border-border bg-bg-card p-7">
                <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-text-main">
                    <FaWandMagicSparkles className="text-purple-primary" aria-hidden />
                    Compartilhar resumo
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Publique seu mês na SoulUp ou envie para amigos. Nada é compartilhado sem a sua ação.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Button size="lg" full onClick={onShare}>
                        <FaShareNodes aria-hidden />
                        Compartilhar resumo
                    </Button>

                    <Button variant="secondary" size="lg" full onClick={onCopy}>
                        {copied ? <FaCheck className="text-green-primary" aria-hidden /> : <FaCopy aria-hidden />}
                        {copied ? "Link copiado" : "Copiar link"}
                    </Button>
                </div>

                {children && (
                    <div className="mt-7 border-t border-border pt-6">
                        {children}
                    </div>
                )}
            </div>
        );
    }

    const { mes, nome, nivel, stats, categorias, sequencia, posicao } = props;
    const maxCategory = Math.max(...categorias.map((item) => item.valor), 1);

    return (
        <article
            aria-label={`Resumo de ${mes}`}
            className="relative overflow-hidden rounded-[2.5rem] bg-night p-8 text-night-text shadow-2xl shadow-green-primary/20 sm:p-10"
        >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-light/25 blur-3xl" aria-hidden />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-purple-primary/30 blur-3xl" aria-hidden />
            <FaLeaf className="absolute right-8 top-8 animate-float text-6xl text-green-light/20" aria-hidden />

            <div className="relative">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-green-light to-green-primary text-white">
                            <FaLeaf aria-hidden />
                        </span>

                        <span className="font-heading text-sm font-bold">Greenlify</span>
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                        {mes}
                    </span>
                </div>

                <p className="mt-8 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                    Meu mês de <span className="textGradient">impacto</span>
                </p>

                <p className="mt-2 text-sm text-night-muted">
                    {nome} · {nivel}
                </p>

                <dl className="mt-8 grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="nightGlass rounded-2xl p-4">
                            <dt className="sr-only">{stat.label}</dt>

                            <dd className="font-heading text-2xl font-extrabold text-green-light sm:text-3xl">
                                {stat.value}
                            </dd>

                            <dd className="mt-1 text-[11px] leading-tight text-night-muted">
                                {stat.label}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-night-muted">
                        Ações por categoria
                    </p>

                    <div className="mt-3 space-y-2.5">
                        {categorias.map((item) => (
                            <div key={item.nome} className="flex items-center gap-3">
                                <span className="w-24 shrink-0 text-xs font-medium">{item.nome}</span>

                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-linear-to-r from-green-light to-green-primary"
                                        style={{ width: `${(item.valor / maxCategory) * 100}%` }}
                                    />
                                </div>

                                <span className="w-5 text-right font-heading text-xs font-bold text-green-light">
                                    {item.valor}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-2">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-light/15 px-3 py-1.5 text-xs font-semibold text-green-light">
                        <FaFire aria-hidden />
                        {sequencia}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-light/15 px-3 py-1.5 text-xs font-semibold text-green-light">
                        <FaTrophy aria-hidden />
                        {posicao}
                    </span>
                </div>
            </div>
        </article>
    );
}
