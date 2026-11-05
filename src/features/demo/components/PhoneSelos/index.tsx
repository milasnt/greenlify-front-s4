import { useState } from "react";
import { FaLeaf, FaWallet } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";
import Feedback from "../../../../components/ui/Feedback";
import SeloBadge from "../../../badges/components/Badge";
import { useSelos } from "../../../badges/hooks/useBadges";
import { numero, traco } from "../../utils/formatar";

const situacaoStyles = {
    coletado: "bg-bg-muted text-text-secondary",
    disponivel: "bg-green-lighter text-green-dark",
    falta: "bg-gold/20 text-text-main",
};

export default function PhoneSelos() {
    const { selos, saldo, carregando, erro, coletando, coletar } = useSelos();
    const [escolhidoId, setEscolhidoId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

    const escolhido = selos.find((selo) => selo.id === escolhidoId && !selo.coletado) ?? null;
    const faltam = escolhido ? Math.max(escolhido.pontos - saldo, 0) : 0;

    async function confirmar() {
        if (!escolhido || faltam > 0) return;

        const resultado = await coletar(escolhido.id);

        if (resultado.ok) {
            setMensagem({ tipo: "sucesso", texto: `Selo "${escolhido.nome}" coletado! ${numero(escolhido.pontos)} pts foram descontados do seu saldo.` });
            setEscolhidoId(null);
        } else {
            setMensagem({ tipo: "erro", texto: resultado.mensagem });
        }
    }

    function escolher(id: number) {
        setEscolhidoId(id);
        setMensagem(null);
    }

    const detalhes: { rotulo: string; valor: string; aviso?: boolean }[] = [];

    if (escolhido) {
        detalhes.push({ rotulo: "Custo", valor: `${numero(escolhido.pontos)} pts` });
        detalhes.push({ rotulo: "Seu saldo", valor: `${numero(saldo)} pts` });

        if (faltam === 0) detalhes.push({ rotulo: "Saldo depois", valor: `${numero(saldo - escolhido.pontos)} pts` });
        else detalhes.push({ rotulo: "Pontos que faltam", valor: `${numero(faltam)} pts`, aviso: true });

        if (escolhido.valeEntrega > 0) detalhes.push({ rotulo: "Vale-entrega", valor: numero(escolhido.valeEntrega) });
        if (escolhido.creditoCarbono > 0) detalhes.push({ rotulo: "Créditos de carbono", valor: numero(escolhido.creditoCarbono) });
    }

    const textoBotao = coletando
        ? "Coletando..."
        : !escolhido
          ? "Selecione um selo"
          : faltam > 0
            ? "Pontos insuficientes"
            : `Coletar por ${numero(escolhido.pontos)} pts`;

    return (
        <div className="grid gap-2.5">
            <div className="flex items-center gap-2.5 rounded-2xl bg-gradient-green p-3 text-white shadow-green">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/20 text-base">
                    <FaWallet aria-hidden />
                </span>

                <div>
                    <small className="block text-[9px] text-white/85">Saldo disponível</small>
                    <strong className="mt-0.5 block font-heading text-xl leading-none">
                        {carregando && selos.length === 0 ? "—" : traco(saldo)} <em className="text-[10px] font-semibold not-italic opacity-85">pts</em>
                    </strong>
                </div>
            </div>

            <div className="grid gap-1">
                <strong className="text-xs text-text-main">Escolha seu selo</strong>
                <small className="text-[9px] leading-snug text-text-secondary">Cada selo pode ser coletado uma vez e conta para o ranking do seu grupo.</small>
            </div>

            {mensagem?.tipo === "sucesso" && (
                <p role="status" className="rounded-xl bg-green-lighter p-2.5 text-center text-[10px] leading-snug text-green-dark">
                    {mensagem.texto}
                </p>
            )}

            {mensagem?.tipo === "erro" && <Feedback tipo="erro" mensagem={mensagem.texto} />}

            {carregando && selos.length === 0 ? (
                <p className="py-3 text-[10px] text-text-secondary">Carregando Selos Verdes...</p>
            ) : erro ? (
                <Feedback tipo="erro" mensagem={erro} />
            ) : selos.length === 0 ? (
                <Feedback tipo="vazio" mensagem="Nenhum Selo Verde cadastrado no momento." />
            ) : (
                <>
                    <div role="radiogroup" aria-label="Selos Verdes disponíveis" className="grid gap-1.5">
                        {selos.map((selo) => {
                            const falta = Math.max(selo.pontos - saldo, 0);
                            const tom = selo.coletado ? "coletado" : falta === 0 ? "disponivel" : "falta";
                            const situacao = selo.coletado ? "Coletado" : falta === 0 ? "Disponível" : `Faltam ${numero(falta)}`;

                            return (
                                <button
                                    key={selo.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={escolhido?.id === selo.id}
                                    disabled={selo.coletado || coletando}
                                    onClick={() => escolher(selo.id)}
                                    className={`flex w-full items-center gap-2 rounded-2xl border-[1.5px] p-2 text-left shadow-custom-sm transition duration-300 disabled:opacity-80 ${
                                        escolhido?.id === selo.id ? "border-green-primary bg-green-ultra-light" : "border-transparent bg-bg-card"
                                    }`}
                                >
                                    <SeloBadge nivel={selo.nivel} tamanho="sm" apagado={selo.coletado} />

                                    <span className="grid min-w-0 flex-1 gap-0.5">
                                        <strong className="truncate text-[11px] text-text-main">{selo.nome}</strong>
                                        <small className="text-[9px] text-text-secondary">{numero(selo.pontos)} pts</small>
                                    </span>

                                    <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[8px] font-bold ${situacaoStyles[tom]}`}>{situacao}</span>
                                </button>
                            );
                        })}
                    </div>

                    {escolhido && (
                        <dl aria-live="polite" className="grid gap-1 rounded-xl border border-border bg-green-ultra-light p-2.5 text-[10px]">
                            {detalhes.map((item) => (
                                <div key={item.rotulo} className="flex justify-between gap-2">
                                    <dt className="text-text-secondary">{item.rotulo}</dt>
                                    <dd className={`font-bold ${item.aviso ? "text-danger" : "text-text-main"}`}>{item.valor}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    <Button size="sm" full onClick={confirmar} disabled={!escolhido || faltam > 0 || coletando}>
                        <FaLeaf aria-hidden /> {textoBotao}
                    </Button>
                </>
            )}
        </div>
    );
}
