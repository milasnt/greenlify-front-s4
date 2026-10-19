import { FaBolt, FaBullseye, FaDroplet, FaFire, FaLightbulb, FaMedal, FaRoute, FaTrophy, FaWandMagicSparkles } from "react-icons/fa6";
import heroLeaf from "../../../assets/img/home/hero-leaf.png";
import IconBox from "../IconBox";
import ProgressBar from "../ProgressBar";
import VideoFrames from "../../../features/validation/components/VideoFrames";


interface DashboardProps {
    variant?: "phone" | "window";
    mission?: string;
    reward?: string;
    level?: string;
    xp?: string;
    progress?: number;
}

export default function Dashboard({
    variant = "phone",
    mission = "Participar de uma ação de reciclagem",
    reward = "Missão · +90 pts",
    level = "Contribuidora",
    xp = "780 / 1000 XP",
    progress = 78,
}: DashboardProps) {

    if (variant === "window") {
        return (
            <div className="relative mx-auto w-full max-w-md" aria-hidden>
                <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-linear-to-br from-green-light/20 via-transparent to-purple-primary/20 blur-2xl" />

                <div className="relative rounded-[2.5rem] border border-border bg-bg-card p-5 shadow-2xl shadow-green-primary/15">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <IconBox icon={<FaBullseye />} />

                            <div>
                                <p className="font-heading text-sm font-bold text-text-main">{mission}</p>
                                <p className="text-xs text-text-secondary">{reward}</p>
                            </div>
                        </div>

                        <span className="rounded-full bg-green-light/15 px-2.5 py-1 text-[10px] font-bold text-green-primary">
                            Em análise
                        </span>
                    </div>

                    <div className="mt-5 rounded-2xl bg-night p-2">
                        <VideoFrames onDark />
                    </div>

                    <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="font-heading font-bold text-text-main">{level}</span>
                            <span className="text-text-secondary">{xp}</span>
                        </div>

                        <ProgressBar value={progress} label="XP" />
                    </div>
                </div>

                <div className="glassPanel absolute -left-4 top-10 z-10 hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 sm:flex">
                    <FaWandMagicSparkles className="text-green-primary" />
                    <span className="font-heading text-xs font-bold text-text-main">Validação por IA</span>
                </div>

                <div className="absolute -right-3 bottom-24 z-10 hidden animate-float-slow items-center gap-2 rounded-full bg-night px-3.5 py-2 text-night-text shadow-xl sm:flex">
                    <FaFire className="text-green-light" />
                    <span className="font-heading text-xs font-bold">Streak ativo</span>
                </div>

                <img src={heroLeaf} alt="" className="absolute -bottom-10 -left-8 z-10 w-24 animate-drift drop-shadow-xl sm:w-32" loading="lazy" />
            </div>
        );
    }

    return (
        <div className="relative mx-auto w-fit" aria-hidden>
            <div className="glassPanel absolute -left-10 top-16 z-20 hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 sm:flex">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-purple-primary text-white">
                    <FaMedal />
                </span>

                <div>
                    <p className="font-heading text-xs font-bold text-text-main">Ranking #42</p>
                    <p className="text-[10px] text-text-secondary">↑ 8 posições</p>
                </div>
            </div>

            <div className="glassPanel absolute -right-8 top-40 z-20 hidden animate-float-slow rounded-2xl px-4 py-3 sm:block">
                <p className="textGradient font-heading text-lg font-extrabold">+60 XP</p>
                <p className="text-[10px] font-medium text-text-secondary">hoje</p>
            </div>

            <img
                src={heroLeaf}
                alt=""
                className="absolute -bottom-8 -right-14 z-20 w-28 animate-drift drop-shadow-xl sm:w-36"
                loading="lazy"
            />

            <div className="absolute -left-6 bottom-24 z-20 hidden animate-float-slow items-center gap-2 rounded-full bg-night px-3.5 py-2 text-night-text shadow-xl sm:flex">
                <FaFire className="text-green-light" />
                <span className="font-heading text-xs font-bold">4 meses de streak</span>
            </div>

            <div className="relative z-10 w-72.5 rounded-[3rem] border-10 border-night bg-night shadow-2xl shadow-green-primary/20 sm:w-77.5">
                <div className="overflow-hidden rounded-[2.3rem] bg-bg">
                    <div className="flex items-center justify-between px-6 pt-4">
                        <span className="text-[10px] font-semibold text-text-secondary">9:41</span>
                        <span className="h-5 w-20 rounded-full bg-night" />
                        <span className="flex gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/60" />
                            <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/60" />
                            <span className="h-1.5 w-1.5 rounded-full bg-green-primary" />
                        </span>
                    </div>

                    <div className="flex items-center justify-between px-5 pt-4">
                        <div>
                            <p className="text-[11px] text-text-secondary">Bom dia,</p>
                            <p className="font-heading text-base font-bold text-text-main">Camila 🌱</p>
                        </div>

                        <IconBox name="Camila" variant="gradientPurple" />
                    </div>

                    <div className="mx-4 mt-4 rounded-2xl bg-night p-4 text-night-text">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-night-muted">Contribuidora</p>
                                <p className="font-heading text-sm font-bold">780 / 1000 XP</p>
                            </div>

                            <span className="flex items-center gap-1 rounded-full bg-green-light/20 px-2.5 py-1 font-heading text-[10px] font-bold text-green-light">
                                <FaBolt /> 460 XP
                            </span>
                        </div>

                        <ProgressBar value={78} onDark size="sm" label="XP" className="mt-3" />

                        <p className="mt-2 text-[10px] text-night-muted">220 XP para o próximo nível</p>
                    </div>

                    <div className="mx-4 mt-3 rounded-2xl border border-border bg-bg-card p-4">
                        <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-lighter text-green-primary">
                                <FaTrophy />
                            </span>

                            <div className="min-w-0 flex-1">
                                <p className="truncate font-heading text-xs font-bold text-text-main">Missões ativas</p>
                                <p className="text-[10px] text-text-secondary">5 missões contínuas de reciclagem</p>
                            </div>

                            <span className="font-heading text-xs font-extrabold text-green-primary">60%</span>
                        </div>

                        <div className="mt-3 flex gap-1">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <span
                                    key={item}
                                    className={`h-1.5 flex-1 rounded-full ${item <= 3 ? "bg-green-light" : "bg-bg-muted"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mx-4 mt-3 mb-4 grid grid-cols-3 gap-2">
                        {[
                            { icon: <FaDroplet />, value: "320L", label: "Água" },
                            { icon: <FaLightbulb />, value: "45kWh", label: "Energia" },
                            { icon: <FaRoute />, value: "28kg", label: "CO₂" },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl bg-green-lighter px-2 py-3 text-center">
                                <span className="text-green-primary">{item.icon}</span>
                                <p className="mt-1 font-heading text-xs font-extrabold text-green-dark">{item.value}</p>
                                <p className="text-[9px] text-text-secondary">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
