import { useRef, useState } from "react";
import { useCarregar, limparCache } from "../../../shared/hooks/useCarregar";
import { ApiError } from "../../../shared/services/api";
import { obterIdUsuarioAtual } from "../../usuario/utils/usuarioAtual";
import { buscarCarteira, buscarSelos, buscarSelosDoUsuario, coletarSelo } from "../services/badgeService";
import type { ResultadoColeta, SeloUI } from "../types/badges";

function hojeLocal(): string {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${agora.getFullYear()}-${mes}-${dia}`;
}

function mensagemDaApi(e: unknown): string {
    if (e instanceof ApiError && e.message) {
        const [, depois] = e.message.split(/:\s(.+)/);
        return depois ?? e.message;
    }
    return "Não foi possível registrar a coleta. Tente novamente.";
}

export function useSelos() {
    const { dados, carregando, erro } = useCarregar(
        async () => {
            const idUsuario = await obterIdUsuarioAtual();
            const [catalogo, coletados, carteira] = await Promise.all([
                buscarSelos(),
                buscarSelosDoUsuario(idUsuario),
                buscarCarteira(idUsuario),
            ]);

            const jaColetados = new Set(coletados.map((item) => item.selo.idSelo));
            const ordenados = [...catalogo].sort((a, b) => a.pontosNecessarios - b.pontosNecessarios);

            const selos: SeloUI[] = ordenados.map((selo, indice) => ({
                id: selo.idSelo,
                nome: selo.nome,
                pontos: selo.pontosNecessarios,
                valeEntrega: selo.valeEnergia,
                creditoCarbono: selo.creditoCarbono,
                coletado: jaColetados.has(selo.idSelo),
                nivel: Math.min(3, Math.floor((indice * 4) / Math.max(ordenados.length, 1))),
            }));

            return { selos, saldo: carteira?.qtdPontos ?? 0 };
        },
        [],
        "Não foi possível carregar os selos e a carteira.",
    );

    const [coletando, setColetando] = useState(false);
    const emAndamento = useRef(false);

    async function coletar(idSelo: number): Promise<ResultadoColeta> {
        if (emAndamento.current) return { ok: false, mensagem: "Aguarde: a coleta anterior ainda está em andamento." };

        emAndamento.current = true;
        setColetando(true);

        try {
            const idUsuario = await obterIdUsuarioAtual();
            await coletarSelo({ dataColeta: hojeLocal(), idUsuario, idSelo });
            return { ok: true };
        } catch (e) {
            console.error("Falha ao coletar o selo", e);
            return { ok: false, mensagem: mensagemDaApi(e) };
        } finally {
            emAndamento.current = false;
            setColetando(false);
            limparCache();
        }
    }

    return {
        selos: dados?.selos ?? [],
        saldo: dados?.saldo ?? 0,
        carregando,
        erro,
        coletando,
        coletar,
    };
}