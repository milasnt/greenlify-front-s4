import type { ReactNode } from "react";
import Reveal from "../Reveal";

interface HeroProps {
    children?: ReactNode;
    visual?: ReactNode;
    badge?: ReactNode;
    title: ReactNode;
    text?: ReactNode;
    variant?: "home" | "internal";
}

export default function Hero({
    children,
    visual,
    title,
    text,
    variant = "internal",
}: HeroProps) {
    const isHome = variant === "home";

    const containerStyles = visual
        ? "lg:grid-cols-[1.05fr_0.95fr]"
        : "";

    const spacingStyles = isHome
        ? "pb-20 pt-16 lg:pt-24"
        : "pb-14 pt-14 lg:pb-20 lg:pt-20";

    const titleStyles = isHome
        ? "text-4xl sm:text-5xl lg:text-6xl"
        : "text-4xl sm:text-5xl";

    return (
        <section className="relative w-full overflow-hidden bg-bg">
            <div className="heroGrid absolute inset-0" aria-hidden />
            <div className="absolute -top-32 right-0 h-120 w-120 rounded-full bg-green-light/15 blur-3xl" aria-hidden />
            <div className="absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-purple-primary/10 blur-3xl" aria-hidden />

            <div className={`relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 ${containerStyles} ${spacingStyles}`}>
                <Reveal>

                    <h1 className={`mt-6 max-w-3xl font-heading font-extrabold leading-[1.08] tracking-tight ${titleStyles}`}>
                        {title}
                    </h1>

                    {text && (
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
                            {text}
                        </p>
                    )}

                    {children && (
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {children}
                        </div>
                    )}
                </Reveal>

                {visual && (
                    <Reveal delay={150} className="relative flex items-center justify-center">
                        {!isHome && (
                            <div className="absolute flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72" aria-hidden>
                                <div className="absolute h-full w-full rounded-full bg-green-primary/5" />
                                <div className="absolute right-0 top-3 h-12 w-12 rounded-full bg-green-primary/10" />
                                <div className="absolute bottom-3 left-2 h-9 w-9 rounded-full bg-green-primary/10" />
                                <div className="absolute right-5 bottom-10 h-2.5 w-2.5 rounded-full bg-green-primary/30" />
                                <div className="absolute left-7 top-8 h-1.5 w-1.5 rounded-full bg-green-primary/20" />
                                <div className="absolute right-12 top-16 h-1.5 w-1.5 rounded-full bg-green-primary/30" />
                                <div className="absolute h-44 w-44 rotate-12 rounded-[35%] border border-green-primary/10 sm:h-52 sm:w-52" />
                                <div className="absolute h-52 w-52 -rotate-12 rounded-[40%] border border-green-primary/5 sm:h-60 sm:w-60" />
                                <div className="absolute left-3 top-7 h-6 w-6 rounded-full border border-green-primary/10" />
                                <div className="absolute right-1 bottom-8 h-5 w-5 rounded-full border border-green-primary/10" />
                            </div>
                        )}
                        <div className="relative z-10">
                            {visual}
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}