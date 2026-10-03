import type { ReactNode } from "react";

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
    badge,
    title,
    text,
    variant = "internal",
}: HeroProps) {
    const isHome = variant === "home";

    return (
        <section className="relative w-full overflow-hidden bg-bg">
            <div className={`mx-auto flex max-w-[140rem] items-stretch justify-between gap-24 px-16 ${isHome ? "py-40" : "py-32"} max-[992px]:flex-col max-[992px]:items-center max-[992px]:text-center max-[992px]:gap-20 max-[992px]:px-12 max-[992px]:pt-32 max-[992px]:pb-24 max-[768px]:gap-16 max-[768px]:pt-28 max-[768px]:pb-20 max-[480px]:gap-[3.2rem] max-[480px]:px-[1.6rem] max-[480px]:pt-24 max-[480px]:pb-16`}>
                <div className="flex max-w-240 flex-col items-start gap-20 max-[992px]:max-w-full max-[992px]:items-center max-[768px]:gap-16 max-[480px]:gap-12">
                    {badge && (
                        <div className="flex items-center gap-2 rounded-2xl border border-[rgba(0,168,107,0.12)] bg-green-ultra-light px-6 py-6 text-[1.3rem] font-semibold text-green-primary max-[480px]:px-[1.5rem] max-[480px]:py-[0.9rem] max-[480px]:text-[1.2rem]">
                            {badge}
                        </div>
                    )}

                    <div className="flex flex-col gap-20 max-[992px]:items-center max-[768px]:gap-16 max-[480px]:gap-12">
                        <h1 className="wrap-break-word text-[6rem] font-bold leading-[1.1] text-text-main max-[1300px]:text-[5.2rem] max-[992px]:text-[4.8rem] max-[768px]:text-[4rem] max-[480px]:text-[3.2rem] max-[480px]:leading-[1.2]">
                            {title}
                        </h1>

                        {text && (
                            <p className="max-w-3xl text-[1.7rem] leading-[1.8] text-text-secondary max-[992px]:max-w-[65rem] max-[768px]:text-[1.6rem] max-[768px]:leading-[1.7] max-[480px]:text-[1.5rem] max-[480px]:leading-[1.7]">
                                {text}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                {visual && (
                    <div className="flex w-full max-w-4xl items-center justify-center max-[992px]:max-w-[70rem]">
                        {isHome ? (
                            visual
                        ) : (
                            <div className="relative flex h-120 w-120 items-center justify-center">
                                <div className="absolute h-100 w-100 rounded-full bg-green-primary/5" />
                                <div className="absolute right-4 top-8 h-24 w-24 rounded-full bg-green-primary/10" />
                                <div className="absolute bottom-8 left-8 h-16 w-16 rounded-full bg-green-primary/10" />
                                <div className="absolute right-20 bottom-16 h-4 w-4 rounded-full bg-green-primary/30" />
                                <div className="absolute left-20 top-16 h-3 w-3 rounded-full bg-green-primary/20" />
                                <div className="absolute right-32 top-32 h-2 w-2 rounded-full bg-green-primary/30" />
                                <div className="absolute h-72 w-72 rotate-12 rounded-[35%] border border-green-primary/10" />
                                <div className="absolute h-80 w-80 -rotate-12 rounded-[40%] border border-green-primary/5" />
                                <div className="absolute left-8 top-12 h-12 w-12 rounded-full border border-green-primary/10" />
                                <div className="absolute bottom-16 right-4 h-8 w-8 rounded-full border border-green-primary/10" />

                                <div className="relative z-10">
                                    {visual}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}