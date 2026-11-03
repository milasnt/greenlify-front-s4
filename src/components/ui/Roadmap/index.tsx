import type { ReactNode } from "react";
import { FaCheck, FaLaptopCode, FaLink, FaReact } from "react-icons/fa";

export interface RoadmapItem {
    title: string;
    text: string;
    icon: ReactNode;
    status: "done" | "active" | "default";
}

interface RoadmapProps {
    items?: RoadmapItem[];
    boxed?: boolean;
}

const roadmapItems: RoadmapItem[] = [
    {
        title: "Etapa 1 - Pesquisa",
        text: "Estudo dos requisitos propostos pela SoulUp e levantamento dos principais desafios relacionados à gamificação sustentável.",
        icon: <FaCheck />,
        status: "done",
    },
    {
        title: "Etapa 2 - Idealização",
        text: "Definição das missões, sistema de pontuação, ranking, streak e mecanismos de validação das ações sustentáveis.",
        icon: <FaCheck />,
        status: "done",
    },
    {
        title: "Etapa 3 - Desenvolvimento Acadêmico",
        text: "Desenvolvimento do protótipo funcional da Greenlify nas matérias de Front-end, Java, Python, Banco de Dados, Chatbot e Business.",
        icon: <FaLaptopCode />,
        status: "done",
    },
    {
        title: "Etapa 4 - Evolução com React",
        text: "Planejamento futuro da interface utilizando React e integração com funcionalidades mais dinâmicas e escaláveis.",
        icon: <FaReact />,
        status: "done",
    },
    {
        title: "Etapa 5 - Integração com a SoulUp",
        text: "Estruturação da integração do módulo com a plataforma SoulUp, incluindo APIs, validação automatizada e recursos de segurança.",
        icon: <FaLink />,
        status: "active",
    },
];

export default function Roadmap({ items = roadmapItems, boxed = false }: RoadmapProps) {
    const statusStyles: Record<string, string> = {
        done: "bg-green-primary text-white shadow-md shadow-green-primary/25",
        active: "bg-purple-primary text-white shadow-md shadow-purple-primary/25 animate-pulse",
        default: "bg-bg-muted text-text-secondary",
    };

    return (
        <div className={`flex flex-col ${boxed ? "rounded-3xl border border-border bg-bg-card p-5 sm:p-6" : ""}`}>
            {items.map((item, index) => (
                <div key={item.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {index < items.length - 1 && (
                        <div className={`absolute left-5 top-12 h-full w-px ${item.status === "done" ? "bg-green-light" : "bg-border"}`} />
                    )}

                    <div className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm ${statusStyles[item.status]}`}>
                        {item.icon}
                    </div>

                    <div className="min-w-0 pt-1.5">
                        <h3 className="font-heading text-base font-bold text-text-main">
                            {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                            {item.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}