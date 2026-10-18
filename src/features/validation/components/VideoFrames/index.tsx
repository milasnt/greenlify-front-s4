import { FaCheck, FaMagnifyingGlassChart } from "react-icons/fa6";
interface VideoFramesProps {
    onDark?: boolean;
    stage?: number;
    scanning?: boolean;
    count?: number;
    steps?: { label: string; done: boolean }[];
}

export default function VideoFrames({
    onDark = false,
    stage = 0,
    scanning = false,
    count = 8,
    steps = [
        { label: "Quadros extraídos", done: true },
        { label: "Elementos identificados", done: true },
        { label: "Critérios avaliados", done: false },
    ],
}: VideoFramesProps) {

    const scanLineStyles = "absolute h-0.5 animate-scan rounded-full bg-green-light shadow-[0_0_16px] shadow-green-light";

    if (onDark) {
        return (
            <div className="nightGlass rounded-3xl p-6" aria-hidden>
                <div className="relative overflow-hidden rounded-2xl bg-night p-4">
                    <div className="grid grid-cols-4 gap-1">
                        {Array.from({ length: count }).map((_, index) => (
                            <div key={index} className="aspect-video rounded-md bg-linear-to-br from-green-primary/40 to-purple-primary/40" />
                        ))}
                    </div>

                    <span className={`${scanLineStyles} left-3 right-3`} />
                </div>

                <div className="mt-5 space-y-2.5 text-sm">
                    {steps.map((step) => (
                        <p key={step.label} className="flex items-center gap-3">
                            <span className={step.done
                                ? "grid h-5 w-5 place-items-center rounded-full bg-green-light/25 text-[10px] text-green-light"
                                : "h-5 w-5 rounded-full border border-night-line"}
                            >
                                {step.done ? <FaCheck /> : null}
                            </span>

                            <span className={step.done ? "text-night-text" : "text-night-muted"}>{step.label}</span>
                        </p>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl">
            <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className={`flex aspect-video items-center justify-center rounded-lg transition-all duration-500 ${
                            stage >= 1 ? "bg-linear-to-br from-green-primary/40 to-purple-primary/40" : "bg-bg-muted"
                        }`}
                    >
                        <FaMagnifyingGlassChart
                            className={`transition-colors ${stage >= 2 ? "text-green-light" : "text-text-secondary/50"}`}
                            aria-hidden
                        />
                    </div>
                ))}
            </div>

            {scanning && <span className={`${scanLineStyles} left-1.5 right-1.5`} aria-hidden />}
        </div>
    );
}
