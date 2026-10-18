import { FaBullseye, FaUsers } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";
import IconBox from "../../../../components/ui/IconBox";
import ProgressBar from "../../../../components/ui/ProgressBar";

interface GroupCardProps {
    nome: string;
    descricao: string;
    membros: number;
    foco: string;
    progresso: number;
    meta: string;
    capa?: { src: string; alt: string };
    tone?: "green" | "purple" | "night";
    membrosPreview?: string[];
    joined?: boolean;
    onToggle?: () => void;
}

export default function GroupCard({
    nome,
    descricao,
    membros,
    foco,
    progresso,
    meta,
    capa,
    tone = "green",
    membrosPreview = [],
    joined = false,
    onToggle,
}: GroupCardProps) {

    const toneStyles = {
        green: "from-green-primary/80 to-green-light/80",
        purple: "from-purple-primary/80 to-purple-light/80",
        night: "from-night to-purple-primary/70",
    };

    const preview = membrosPreview.slice(0, 3);
    const extra = Math.max(membros - preview.length, 0);

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-primary/10">
            {capa ? (
                <div className="relative overflow-hidden">
                    <img
                        src={capa.src}
                        alt={capa.alt}
                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-xs font-bold text-night-text backdrop-blur">
                        {foco}
                    </span>
                </div>
            ) : (
                <div className={`relative flex aspect-video items-end bg-linear-to-br p-5 ${toneStyles[tone]}`}>
                    <span className="rounded-full bg-night/60 px-3 py-1 text-xs font-bold text-night-text backdrop-blur">
                        {foco}
                    </span>

                    <FaUsers className="absolute right-5 top-5 text-4xl text-white/40" aria-hidden />
                </div>
            )}

            <div className="flex flex-1 flex-col p-6">
                <h2 className="font-heading text-lg font-bold text-text-main">
                    {nome}
                </h2>

                <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-text-secondary">
                    {descricao}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2.5">
                        {preview.map((name) => (
                            <IconBox key={name} name={name} size="sm" className="border-2 border-bg-card" />
                        ))}

                        {extra > 0 && (
                            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-bg-card bg-bg-muted text-[9px] font-bold text-text-secondary">
                                +{extra}
                            </span>
                        )}
                    </div>

                    <span className="text-xs font-semibold text-text-secondary">
                        {membros} membros
                    </span>
                </div>

                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-semibold text-text-secondary">
                            <FaBullseye className="text-green-primary" aria-hidden />
                            {meta}
                        </span>

                        <span className="font-heading font-extrabold text-green-primary">
                            {progresso}%
                        </span>
                    </div>

                    <ProgressBar value={progresso} label={`Progresso coletivo de ${nome}`} size="sm" />
                </div>

                <Button
                    variant={joined ? "secondary" : "primary"}
                    full
                    className="mt-6"
                    onClick={onToggle}
                >
                    {joined ? "Participando ✓" : "Participar do grupo"}
                </Button>
            </div>
        </article>
    );
}