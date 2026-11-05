import { useState } from "react";
import type { ReactNode } from "react";
import { FaChartLine, FaChevronRight, FaFire, FaLeaf, FaRegCircleUser, FaShareNodes, FaTrophy } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";
import Feedback from "../../../../components/ui/Feedback";
import type { DadosPerfil, Ir, Tela } from "../../types/demo";
import { numero, traco } from "../../utils/formatar";

interface PhonePerfilProps {
    dados: DadosPerfil;
    onIr: Ir;
}

export default function PhonePerfil({ dados, onIr }: PhonePerfilProps) {
    const { usuario, perfil, impacto, erro } = dados;

    if (erro) return <Feedback tipo="erro" mensagem={erro} />;

    const posicao = impacto?.posicaoRanking ?? 0;

    const links: { icone: ReactNode; titulo: string; texto: string; tela: Tela }[] = [
        { icone: <FaLeaf />, titulo: "Coletar Selos Verdes", texto: `Saldo: ${traco(impacto?.pontos)} pts`, tela: "coletarSelos" },
        { icone: <FaChartLine />, titulo: "Meu resumo", texto: "Veja e compartilhe sua evolução", tela: "resumo" },
        {
            icone: <FaTrophy />,
            titulo: "Minha posição no ranking",
            texto: posicao > 0 ? `Você está em ${posicao}º lugar` : "Acompanhe sua evolução",
            tela: "ranking",
        },
        { icone: <FaFire />, titulo: "Missões e streak", texto: "Continue sua jornada sustentável", tela: "centralMissoes" },
    ];

    return (
        <>
            <div className="rounded-2xl bg-linear-to-br from-green-ultra-light to-purple-lighter px-2.5 py-4 text-center">
                <span className="mx-auto mb-2 grid size-14 place-items-center rounded-full bg-bg-muted text-3xl text-text-muted">
                    <FaRegCircleUser aria-hidden />
                </span>

                <h1 className="font-heading text-base font-bold text-text-main">{usuario?.nome ?? "Carregando..."}</h1>
                <p className="mb-3 mt-1 text-[10px] text-text-secondary">{perfil?.nivel?.nome ?? "—"} · Perfil sustentável</p>

                <div className="flex justify-around text-[9px] text-text-secondary">
                    {[
                        { valor: traco(impacto?.pontos), rotulo: "saldo (pts)" },
                        { valor: traco(perfil?.xpSustentavel), rotulo: "XP" },
                        { valor: traco(impacto?.missoesConcluidas), rotulo: "missões" },
                    ].map((item) => (
                        <span key={item.rotulo} className="grid gap-0.5">
                            <strong className="font-heading text-sm text-green-primary">{item.valor}</strong>
                            {item.rotulo}
                        </span>
                    ))}
                </div>
            </div>

            <ul className="mt-2">
                {links.map((link) => (
                    <li key={link.titulo} className="border-b border-border last:border-0">
                        <button type="button" onClick={() => onIr(link.tela)} className="flex w-full items-center gap-2 py-2 text-left">
                            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-green-lighter text-base text-green-primary">{link.icone}</span>

                            <span className="grid min-w-0 flex-1 gap-0.5">
                                <strong className="text-[11px] text-text-main">{link.titulo}</strong>
                                <small className="text-[9px] text-text-secondary">{link.texto}</small>
                            </span>

                            <FaChevronRight className="shrink-0 text-text-muted" aria-hidden />
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export function PhoneResumo({ dados }: { dados: DadosPerfil }) {
    const { perfil, impacto, erro } = dados;
    const [copiado, setCopiado] = useState(false);

    if (erro) return <Feedback tipo="erro" mensagem={erro} />;

    async function compartilhar() {
        if (!impacto) return;

        const texto = `Meu impacto na SoulUp: ${impacto.missoesConcluidas} missões concluídas e ${impacto.pontos} pontos na Greenlify!`;

        try {
            await navigator.clipboard.writeText(texto);
            setCopiado(true);
        } catch {
            setCopiado(false);
        }
    }

    const itens = [
        { valor: traco(impacto?.missoesConcluidas), rotulo: "missões concluídas" },
        { valor: traco(impacto?.pontos), rotulo: "pontos no saldo" },
        { valor: perfil ? `${numero(perfil.totalCarbonoEconomizado)} kg` : "—", rotulo: "de CO₂ economizados" },
    ];

    return (
        <>
            <div className="rounded-2xl bg-linear-to-br from-night to-green-primary p-4 text-white">
                <span className="grid size-9 place-items-center rounded-xl bg-white/20 text-xl">
                    <FaLeaf aria-hidden />
                </span>

                <small className="mt-3 block text-[8px] tracking-widest text-green-light">MEU IMPACTO NA SOULUP</small>
                <h2 className="mb-3.5 mt-1.5 font-heading text-xl leading-tight font-extrabold">
                    Pequenas ações.
                    <br />
                    Grandes mudanças.
                </h2>

                <div className="grid gap-1.5">
                    {itens.map((item) => (
                        <span key={item.rotulo} className="flex justify-between gap-1.5 border-t border-white/25 py-1.5 text-[10px]">
                            {item.rotulo}
                            <strong className="text-xs">{item.valor}</strong>
                        </span>
                    ))}
                </div>

                <p className="mt-3 text-[10px] leading-relaxed text-night-text">Meu compromisso com um futuro mais sustentável continua!</p>
            </div>

            <Button size="sm" full onClick={compartilhar} disabled={!impacto} className="mt-3">
                <FaShareNodes aria-hidden /> Compartilhar resumo
            </Button>

            {copiado && (
                <p role="status" className="mt-2 text-[10px] text-text-secondary">
                    Resumo copiado para compartilhar!
                </p>
            )}
        </>
    );
}
