import Reveal from "../../../../components/layout/Reveal";
import IconBox from "../../../../components/ui/IconBox";
import ProgressBar from "../../../../components/ui/ProgressBar";

interface ProfileHeaderProps {
    nome: string;
    nivel: string;
    xp: number;
    proximoNivelXp: number;
    pontos: number;
    missoes?: number;
}

export default function ProfileHeader({
    nome,
    nivel,
    xp,
    proximoNivelXp,
    pontos,
    missoes,
}: ProfileHeaderProps) {

    const progress = Math.min((xp / proximoNivelXp) * 100, 100);

    return (
        <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-night p-7 text-night-text sm:p-8">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-green-light/20 blur-3xl" aria-hidden />

                <div className="relative flex flex-wrap items-center gap-8">
                    <div className="relative grid h-28 w-28 shrink-0 place-items-center">
                        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
                            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" />
                            <circle
                                cx="50"
                                cy="50"
                                r="44"
                                fill="none"
                                stroke="var(--color-green-light)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${progress * 2.764} 276.4`}
                                className="transition-[stroke-dasharray] duration-1000"
                            />
                        </svg>

                        <IconBox name={nome} size="lg" variant="gradientPurple" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="font-heading text-xl font-bold">
                            {nome}
                        </h2>

                        <p className="mt-1 text-sm text-night-muted">
                            {nivel}
                        </p>

                        <div className="mt-4 flex justify-between text-xs text-night-muted">
                            <span>XP</span>
                            <span>{xp.toLocaleString("pt-BR")} / {proximoNivelXp.toLocaleString("pt-BR")}</span>
                        </div>

                        <ProgressBar value={progress} label="Progresso de XP" className="mt-2" />
                    </div>

                    <div className="flex gap-8">
                        <div>
                            <p className="font-heading text-3xl font-extrabold text-green-light">
                                {pontos.toLocaleString("pt-BR")}
                            </p>

                            <p className="text-xs text-night-muted">pontos totais</p>
                        </div>

                        {missoes !== undefined && (
                            <div>
                                <p className="font-heading text-3xl font-extrabold">{missoes}</p>
                                <p className="text-xs text-night-muted">missões concluídas</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Reveal>
    );
}
