import type { ReactNode } from "react";
import { FaLeaf } from "react-icons/fa6";
import Reveal from "../Reveal";

interface CtaBannerProps {
    title: ReactNode;
    text?: ReactNode;
    children?: ReactNode;
}

export default function CtaBanner({ title, text, children }: CtaBannerProps) {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
            <Reveal>
                <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-green-primary via-green-primary to-green-light/80 px-5 py-12 text-center text-white xs:px-8 sm:rounded-[2.5rem] sm:px-16 sm:py-16">
                    <FaLeaf className="absolute -left-8 top-8 animate-float text-[7rem] text-white/10" aria-hidden />
                    <FaLeaf className="absolute -right-6 bottom-6 rotate-45 animate-float-slow text-[9rem] text-white/10" aria-hidden />

                    <h2 className="relative mx-auto max-w-2xl wrap-break-word font-heading text-2xl xs:text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {title}
                    </h2>

                    {text && (
                        <p className="relative mx-auto mt-4 max-w-xl text-white/85">
                            {text}
                        </p>
                    )}

                    {children && (
                        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                            {children}
                        </div>
                    )}
                </div>
            </Reveal>
        </section>
    );
}
