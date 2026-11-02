import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
}

const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, title, description, children, footer }: ModalProps) {
    const painel = useRef<HTMLDivElement>(null);
    const idTitulo = useId();
    const idDescricao = useId();

    useEffect(() => {
        if (!open) return;

        const anterior = document.activeElement as HTMLElement | null;
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        painel.current?.focus();

        function aoTeclar(evento: KeyboardEvent) {
            if (evento.key === "Escape") {
                evento.stopPropagation();
                onClose();
                return;
            }

            if (evento.key !== "Tab" || !painel.current) return;

            const itens = Array.from(painel.current.querySelectorAll<HTMLElement>(FOCAVEIS));
            if (itens.length === 0) {
                evento.preventDefault();
                return;
            }

            const primeiro = itens[0]!;
            const ultimo = itens[itens.length - 1]!;
            const ativo = document.activeElement;

            if (evento.shiftKey && (ativo === primeiro || ativo === painel.current)) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey && ativo === ultimo) {
                evento.preventDefault();
                primeiro.focus();
            }
        }

        document.addEventListener("keydown", aoTeclar);

        return () => {
            document.removeEventListener("keydown", aoTeclar);
            document.body.style.overflow = overflowAnterior;
            anterior?.focus();
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-60 flex items-end justify-center bg-night/60 backdrop-blur-sm sm:items-center sm:p-6"
            onMouseDown={(evento) => {
                if (evento.target === evento.currentTarget) onClose();
            }}
        >
            <div
                ref={painel}
                role="dialog"
                aria-modal="true"
                aria-labelledby={idTitulo}
                aria-describedby={description ? idDescricao : undefined}
                tabIndex={-1}
                className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-4xl border border-border bg-bg-card shadow-2xl outline-none sm:max-h-[85dvh] sm:rounded-4xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
                    <div>
                        <h2 id={idTitulo} className="font-heading text-xl font-extrabold tracking-tight text-text-main">
                            {title}
                        </h2>
                        {description && (
                            <p id={idDescricao} className="mt-1 text-sm leading-relaxed text-text-secondary">
                                {description}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-text-secondary transition duration-300 hover:bg-green-lighter hover:text-text-main"
                    >
                        <FaXmark aria-hidden />
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">{children}</div>

                {footer && <div className="border-t border-border bg-bg-soft px-5 py-4 sm:px-6">{footer}</div>}
            </div>
        </div>,
        document.body,
    );
}