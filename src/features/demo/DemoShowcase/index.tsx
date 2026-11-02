import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { Link, matchPath, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Reveal from "../../../components/layout/Reveal";
import Button from "../../../components/ui/Button";
import Dashboard from "../../../components/ui/Dashboard";
import IconBox from "../../../components/ui/IconBox";
import ItemList from "../../../components/ui/ItemList";
import Tabs from "../../../components/ui/Tabs";


export interface DemoScreen {
    id: string;
    label: string;
    shortLabel?: string;
    path: string;
    render: (missionId: string) => ReactNode;
}

interface DemoMission {
    id: string;
    titulo: string;
}

interface DemoShowcaseProps {
    screens: DemoScreen[];
    missions: DemoMission[];
}

export default function DemoShowcase({ screens, missions }: DemoShowcaseProps) {
    const [params, setParams] = useSearchParams();
    const frameRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);
    const shouldFocus = useRef(false);

    const screen = screens.find((item) => item.id === params.get("tela")) ?? screens[0]!;
    const missionParam = params.get("missao");
    const missionId = missions.find((item) => item.id === missionParam)?.id ?? missions[0]?.id ?? "";

    const index = screens.indexOf(screen);
    const previous = index > 0 ? screens[index - 1] : null;
    const next = index < screens.length - 1 ? screens[index + 1] : null;
    const usesMission = screen.path.includes(":id") || screen.path === "/validacao";

    const go = useCallback(
        (screenId: string, mission?: string | null) => {
            const target = screens.find((item) => item.id === screenId) ?? screens[0]!;
            const query = new URLSearchParams({ tela: target.id });

            if (target.path.includes(":id") || target.path === "/validacao") {
                query.set("missao", mission ?? missionId);
            }

            shouldFocus.current = true;
            setParams(query, { preventScrollReset: true });
        },
        [screens, missionId, setParams],
    );

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const frame = frameRef.current;
        if (frame && frame.getBoundingClientRect().top < 0) {
            frame.scrollIntoView({ block: "start", behavior: "smooth" });
        }

        if (shouldFocus.current) {
            panelRef.current?.focus({ preventScroll: true });
            shouldFocus.current = false;
        }
    }, [screen.id, missionId]);

    function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
        const anchor = (event.target as HTMLElement).closest("a");
        if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

        const url = new URL(anchor.href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        for (const item of screens) {
            const match = matchPath(item.path, url.pathname);
            if (!match) continue;

            event.preventDefault();
            event.stopPropagation();
            go(item.id, match.params.id ?? url.searchParams.get("missao"));
            return;
        }
    }

    return (
        <div>
            <Tabs
                items={screens.map((item) => ({ id: item.id, label: item.label, shortLabel: item.shortLabel }))}
                active={screen.id}
                onChange={(id) => go(id)}
                ariaLabel="Telas da demonstração"
                panelId="painel-demo"
                numbered
            />

            <div
                ref={frameRef}
                onClickCapture={handleClickCapture}
                className="mt-6 scroll-mt-24 overflow-clip rounded-[2.5rem] border border-border bg-bg shadow-2xl shadow-green-primary/10"
            >
                <div className="flex flex-wrap items-center gap-3 border-b border-border bg-bg-card px-5 py-3">
                    <span className="flex gap-1.5" aria-hidden>
                        <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-light" />
                    </span>

                    <p className="min-w-0 flex-1 truncate rounded-full bg-bg-muted px-4 py-1 text-xs text-text-secondary">
                        greenlify.app<span className="font-semibold text-text-main">{screen.path.replace(":id", missionId)}</span>
                    </p>

                    {usesMission && (
                        <label className="flex items-center gap-2 text-xs text-text-secondary">
                            <span>Missão da demo</span>

                            <select
                                value={missionId}
                                onChange={(event) => go(screen.id, event.target.value)}
                                className="max-w-64 rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-text-main outline-none focus:border-green-primary"
                            >
                                {missions.map((mission) => (
                                    <option key={mission.id} value={mission.id}>
                                        {mission.titulo}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                </div>

                <div
                    ref={panelRef}
                    id="painel-demo"
                    role="tabpanel"
                    aria-labelledby={`tab-${screen.id}`}
                    tabIndex={-1}
                    className="outline-none"
                >
                    <div key={`${screen.id}-${usesMission ? missionId : ""}`} className="animate-enter">
                        {screen.render(missionId)}
                    </div>
                </div>
            </div>

            <nav aria-label="Sequência da demonstração" className="mt-6 flex items-center justify-between gap-3">
                {previous ? (
                    <Button variant="secondary" onClick={() => go(previous.id)}>
                        <FaArrowLeft aria-hidden />
                        <span className="max-sm:hidden">{previous.label}</span>
                        <span className="sm:hidden">Anterior</span>
                    </Button>
                ) : (
                    <span />
                )}

                <p className="text-xs text-text-secondary" aria-live="polite">
                    Tela {index + 1} de {screens.length}
                </p>

                {next ? (
                    <Button onClick={() => go(next.id)}>
                        <span className="max-sm:hidden">{next.label}</span>
                        <span className="sm:hidden">Próxima</span>
                        <FaArrowRight aria-hidden />
                    </Button>
                ) : (
                    <span />
                )}
            </nav>
        </div>
    );
}


interface OverviewItem {
    to: string;
    label: string;
    text: string;
    icon: ReactNode;
}

interface DemoOverviewProps {
    items: OverviewItem[];
    stats: { value: string; title: string }[];
}

export function DemoOverview({ items, stats }: DemoOverviewProps) {
    return (
        <div className="relative overflow-clip">
            <div className="heroGrid absolute inset-0" aria-hidden />
            <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-green-light/15 blur-3xl" aria-hidden />

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                    <Reveal>
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-green-primary">
                            Visão geral
                        </p>

                        <h3 className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                            O Greenlify em <span className="textGradient">{items.length} telas</span>
                        </h3>

                        <p className="mt-4 max-w-xl leading-relaxed text-text-secondary">
                            Escolha uma missão, envie a evidência, acompanhe a validação e veja o progresso virar
                            nível, ranking e conquistas. Toque em qualquer tela — os dados vêm do back-end.
                        </p>
                    </Reveal>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                        {items.map((item, index) => (
                            <li key={item.to} className="h-full">
                                <Reveal delay={(index % 2) * 70} className="h-full">
                                    <Link
                                        to={item.to}
                                        className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-bg-card p-4 transition duration-300 hover:-translate-y-0.5 hover:border-green-primary/40 hover:shadow-lg hover:shadow-green-primary/10"
                                    >
                                        <IconBox icon={item.icon} />

                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center justify-between gap-2 font-heading text-sm font-bold text-text-main">
                                                {item.label}
                                                <FaArrowRight className="text-green-primary opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                                            </span>

                                            <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                                                {item.text}
                                            </span>
                                        </span>
                                    </Link>
                                </Reveal>
                            </li>
                        ))}
                    </ul>

                    <ItemList variant="stats" items={stats} className="mt-8 border-t border-border pt-6" />
                </div>

                <Reveal delay={120} className="relative pb-6">
                    <Dashboard />
                </Reveal>
            </div>
        </div>
    );
}