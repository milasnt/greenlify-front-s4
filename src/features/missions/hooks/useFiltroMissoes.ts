import { useMemo, useState } from "react";
import type { Missao } from "../types/mission";

export const OPCOES_IMPACTO = ["Todos", "Baixo", "Médio", "Alto"];
export const OPCOES_DIFICULDADE = ["Todas", "Fácil", "Média", "Difícil"];

function normalizar(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function useFiltroMissoes(missoes: Missao[], porPagina: number) {
    const [busca, setBuscaEstado] = useState("");
    const [impacto, setImpactoEstado] = useState(OPCOES_IMPACTO[0]!);
    const [dificuldade, setDificuldadeEstado] = useState(OPCOES_DIFICULDADE[0]!);
    const [pagina, setPagina] = useState(1);

    const filtradas = useMemo(() => {
        const termo = normalizar(busca);

        return missoes.filter((missao) => {
            if (impacto !== OPCOES_IMPACTO[0] && missao.impacto !== impacto) return false;
            if (dificuldade !== OPCOES_DIFICULDADE[0] && missao.dificuldade !== dificuldade) return false;
            if (termo && !normalizar(`${missao.titulo} ${missao.descricao}`).includes(termo)) return false;
            return true;
        });
    }, [missoes, busca, impacto, dificuldade]);

    const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const visiveis = filtradas.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

    const filtrosAtivos =
        busca.trim() !== "" || impacto !== OPCOES_IMPACTO[0] || dificuldade !== OPCOES_DIFICULDADE[0];

    const quantidadeFiltros =
        Number(impacto !== OPCOES_IMPACTO[0]) + Number(dificuldade !== OPCOES_DIFICULDADE[0]) + Number(busca.trim() !== "");

    return {
        busca,
        impacto,
        dificuldade,
        setBusca: (valor: string) => { setBuscaEstado(valor); setPagina(1); },
        setImpacto: (valor: string) => { setImpactoEstado(valor); setPagina(1); },
        setDificuldade: (valor: string) => { setDificuldadeEstado(valor); setPagina(1); },
        limpar: () => {
            setBuscaEstado("");
            setImpactoEstado(OPCOES_IMPACTO[0]!);
            setDificuldadeEstado(OPCOES_DIFICULDADE[0]!);
            setPagina(1);
        },
        filtradas,
        visiveis,
        total: filtradas.length,
        pagina: paginaAtual,
        totalPaginas,
        setPagina,
        filtrosAtivos,
        quantidadeFiltros,
    };
}

export function usePaginacao<T>(itens: T[], porPagina: number) {
    const [pagina, setPagina] = useState(1);
    const totalPaginas = Math.max(1, Math.ceil(itens.length / porPagina));
    const paginaAtual = Math.min(pagina, totalPaginas);

    return {
        visiveis: itens.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina),
        pagina: paginaAtual,
        totalPaginas,
        setPagina,
    };
}