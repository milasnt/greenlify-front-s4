import Card from "../Card";

interface ProfileHeaderProps {
    nome: string;
    nivel: string;
    xp: number;
    proximoNivelXp: number;
    pontos: number;
}

export default function ProfileHeader({
    nome,
    nivel,
    xp,
    proximoNivelXp,
    pontos,
}: ProfileHeaderProps) {

    const progress = Math.min((xp / proximoNivelXp) * 100, 100);

    return (
        <Card className="flex items-center gap-10 max-[992px]:items-start max-[768px]:flex-col max-[768px]:items-start max-[480px]:flex-col max-[480px]:items-start">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-green-ultra-light text-[3rem] font-bold text-green-primary max-[480px]:h-24 max-[480px]:w-24 max-[480px]:text-[2.4rem]">
                {nome.charAt(0)}
            </div>

            <div className="flex-1">
                <h2 className="mb-2 text-[2.4rem] font-bold text-text-main">
                    {nome}
                </h2>

                <p className="mb-6 text-[1.5rem] text-green-primary">
                    {nivel}
                </p>

                <div className="mb-3 flex items-center justify-between text-[1.4rem] text-text-secondary">
                    <span>XP</span>
                    <span>{xp} / {proximoNivelXp}</span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-green-ultra-light">
                    <div
                        className="h-full rounded-full bg-gradient-green transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="min-w-32 text-center max-[480px]:text-center">
                <span className="block text-[1.4rem] text-text-secondary">
                    Pontos
                </span>

                <strong className="text-[2.8rem] font-bold text-green-primary max-[480px]:text-[2rem]">
                    {pontos}
                </strong>
            </div>
        </Card>
    );
}