import { useState } from "react";
import type { ReactNode } from "react";
import { FaLeaf, FaWallet } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";
import Feedback from "../../../../components/ui/Feedback";
import Toast, { type ToastType } from "../../../../components/ui/Toast";
import { useSelos } from "../../hooks/useBadges";
import type { SeloUI } from "../../types/badges";
import Badge from "../Badge";
import Modal from "../../../../components/ui/Modal";


const numero = (valor: number) => valor.toLocaleString("pt-BR");

interface ColetarSelosProps {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    full?: boolean;
    className?: string;
    renderBotao?: (abrir: () => void) => ReactNode;
}

interface AvisoToast {
    mensagem: string;
    tipo: ToastType;
}

export default function ColetarSelos({ variant = "primary", size = "md", full, className, renderBotao }: ColetarSelosProps) {
    const [aberto, setAberto] = useState(false);
    const [aviso, setAviso] = useState<AvisoToast | null>(null);

    return (
        <>
            {renderBotao ? (
                renderBotao(() => setAberto(true))
            ) : (
                <Button variant={variant} size={size} full={full} className={className} onClick={() => setAberto(true)}>
                    <FaLeaf aria-hidden /> Coletar Selos Verdes
                </Button>
            )}

            {aberto && (
                <ModalColeta
                    onClose={() => setAberto(false)}
                    onResultado={(mensagem, tipo) => setAviso({ mensagem, tipo })}
                />
            )}

            <Toast message={aviso?.mensagem ?? null} type={aviso?.tipo} onClose={() => setAviso(null)} />
        </>
    );
}

function ModalColeta({
    onClose,
    onResultado,
}: {
    onClose: () => void;
    onResultado: (mensagem: string, tipo: ToastType) => void;
}) {
    const { selos, saldo, carregando, erro, coletando, coletar } = useSelos();
    const [escolhidoId, setEscolhidoId] = useState<number | null>(null);
    const [erroColeta, setErroColeta] = useState<string | null>(null);

    const escolhido = selos.find((selo) => selo.id === escolhidoId && !selo.coletado) ?? null;
    const faltam = escolhido ? Math.max(escolhido.pontos - saldo, 0) : 0;
    const podeColetar = escolhido !== null && faltam === 0 && !coletando;

    async function confirmar() {
        if (!escolhido || !podeColetar) return;

        const nome = escolhido.nome;
        const resultado = await coletar(escolhido.id);

        if (resultado.ok) {
            onResultado(`Selo "${nome}" coletado! ${numero(escolhido.pontos)} pts foram descontados da sua carteira.`, "success");
            onClose();
        } else {
            setErroColeta(resultado.mensagem);
            onResultado(resultado.mensagem, "error");
        }
    }

    return (
        <Modal
            open
            onClose={onClose}
            title="Coletar Selos Verdes"
            description="Troque seus pontos por Selos Verdes. Cada selo pode ser coletado uma vez e conta no ranking do seu grupo."
            footer={
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button variant="outline" onClick={onClose} disabled={coletando}>
                        Cancelar
                    </Button>
                    <Button onClick={confirmar} disabled={!podeColetar}>
                        {coletando ? "Coletando..." : escolhido ? `Coletar por ${numero(escolhido.pontos)} pts` : "Escolha um selo"}
                    </Button>
                </div>
            }
        >
            <div className="flex items-center gap-3 rounded-2xl border border-green-primary/20 bg-green-lighter px-4 py-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-green-primary text-white" aria-hidden>
                    <FaWallet />
                </span>
                <div>
                    <p className="text-xs font-semibold text-text-secondary">Saldo da carteira</p>
                    <p className="font-heading text-xl font-extrabold text-text-main">
                        {carregando && selos.length === 0 ? "—" : `${numero(saldo)} pts`}
                    </p>
                </div>
            </div>

            <div className="mt-5">
                {carregando && selos.length === 0 ? (
                    <div className="space-y-3" aria-busy="true">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-20 animate-pulse rounded-2xl bg-bg-muted" />
                        ))}
                    </div>
                ) : erro ? (
                    <Feedback tipo="erro" mensagem={erro} />
                ) : selos.length === 0 ? (
                    <Feedback tipo="vazio" mensagem="Nenhum Selo Verde cadastrado até o momento." />
                ) : (
                    <ul role="radiogroup" aria-label="Selos Verdes disponíveis" className="space-y-3">
                        {selos.map((selo) => (
                            <li key={selo.id}>
                                <OpcaoSelo
                                    selo={selo}
                                    saldo={saldo}
                                    selecionado={escolhido?.id === selo.id}
                                    onEscolher={() => {
                                        setEscolhidoId(selo.id);
                                        setErroColeta(null);
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {escolhido && (
                <div className="mt-5 rounded-2xl border border-border bg-bg-soft p-4 text-sm" aria-live="polite">
                    <p className="font-heading font-bold text-text-main">{escolhido.nome}</p>

                    <dl className="mt-3 space-y-1.5">
                        <Detalhe rotulo="Custo" valor={`${numero(escolhido.pontos)} pts`} />
                        <Detalhe rotulo="Seu saldo" valor={`${numero(saldo)} pts`} />
                        {faltam === 0 && <Detalhe rotulo="Saldo depois" valor={`${numero(saldo - escolhido.pontos)} pts`} />}
                        {escolhido.valeEntrega > 0 && <Detalhe rotulo="Vale-entrega" valor={numero(escolhido.valeEntrega)} />}
                        {escolhido.creditoCarbono > 0 && (
                            <Detalhe rotulo="Créditos de carbono" valor={numero(escolhido.creditoCarbono)} />
                        )}
                    </dl>

                    {faltam > 0 && (
                        <p role="alert" className="mt-3 font-semibold text-danger">
                            Pontos insuficientes: este selo custa {numero(escolhido.pontos)} pts e você tem {numero(saldo)} pts
                            (faltam {numero(faltam)}).
                        </p>
                    )}
                </div>
            )}

            {erroColeta && (
                <p role="alert" className="mt-4 rounded-2xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
                    {erroColeta}
                </p>
            )}
        </Modal>
    );
}

function Detalhe({ rotulo, valor }: { rotulo: string; valor: string }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <dt className="text-text-secondary">{rotulo}</dt>
            <dd className="font-heading font-bold text-text-main">{valor}</dd>
        </div>
    );
}

function OpcaoSelo({
    selo,
    saldo,
    selecionado,
    onEscolher,
}: {
    selo: SeloUI;
    saldo: number;
    selecionado: boolean;
    onEscolher: () => void;
}) {
    const faltam = Math.max(selo.pontos - saldo, 0);
    const situacao = selo.coletado ? "Já coletado" : faltam === 0 ? "Disponível" : `Faltam ${numero(faltam)} pts`;

    const tomSituacao = selo.coletado
        ? "bg-bg-muted text-text-secondary"
        : faltam === 0
          ? "bg-green-lighter text-green-dark"
          : "bg-gold/20 text-text-main";

    return (
        <button
            type="button"
            role="radio"
            aria-checked={selecionado}
            disabled={selo.coletado}
            onClick={onEscolher}
            className={`flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition duration-300 disabled:cursor-not-allowed ${
                selecionado
                    ? "border-green-primary bg-green-lighter shadow-md shadow-green-primary/15"
                    : "border-border bg-bg-card hover:border-green-primary/50"
            }`}
        >
            <Badge nivel={selo.nivel} apagado={selo.coletado} />

            <span className="min-w-0 flex-1">
                <span className={`block truncate font-heading font-bold ${selo.coletado ? "text-text-secondary" : "text-text-main"}`}>
                    {selo.nome}
                </span>
                <span className="mt-0.5 block text-sm text-text-secondary">{numero(selo.pontos)} pts</span>
            </span>

            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${tomSituacao}`}>{situacao}</span>
        </button>
    );
}