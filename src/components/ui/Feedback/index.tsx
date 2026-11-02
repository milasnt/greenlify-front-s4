import { FaCircleExclamation, FaInbox } from "react-icons/fa6";

interface FeedbackProps {
    tipo: "erro" | "vazio";
    mensagem: string;
    className?: string;
}

export default function Feedback({ tipo, mensagem, className = "" }: FeedbackProps) {
    const isErro = tipo === "erro";

    return (
        <div
            role={isErro ? "alert" : "status"}
            className={`flex items-center justify-center gap-3 rounded-2xl border border-dashed p-6 text-center text-sm ${
                isErro ? "border-danger/40 text-danger" : "border-border text-text-secondary"
            } ${className}`}
        >
            {isErro ? <FaCircleExclamation aria-hidden /> : <FaInbox aria-hidden />}
            <span>{mensagem}</span>
        </div>
    );
}