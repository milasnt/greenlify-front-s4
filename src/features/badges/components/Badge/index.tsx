import { FaLeaf } from "react-icons/fa6";

const TONS = [
    "from-green-light to-green-primary",
    "from-green-primary to-green-dark",
    "from-purple-light to-purple-primary",
    "from-gold to-green-primary",
];

interface BadgeProps {
    nivel: number;
    tamanho?: "sm" | "md" | "lg";
    apagado?: boolean;
}

const TAMANHOS = { sm: "h-11 w-11 text-lg", md: "h-14 w-14 text-xl", lg: "h-20 w-20 text-3xl" };

export default function Badge({ nivel, tamanho = "md", apagado = false }: BadgeProps) {
    const tom = TONS[Math.min(Math.max(nivel, 0), TONS.length - 1)];
    const estadoApagado = apagado ? "opacity-50 grayscale" : "";

    return (
        <span
            aria-hidden
            className={`grid shrink-0 place-items-center rounded-full bg-linear-to-br text-white shadow-md ring-4 ring-white/70 ${tom} ${TAMANHOS[tamanho]} ${estadoApagado}`}
        >
            <FaLeaf />
        </span>
    );
}