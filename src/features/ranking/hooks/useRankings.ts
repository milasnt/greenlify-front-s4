import { useCarregar } from "../../../shared/hooks/useCarregar";
import { obterIdUsuarioAtual } from "../../usuario/utils/usuarioAtual";
import { buscarRankingAllTime, buscarRankingGrupos, buscarRankingIndividual } from "../services/rankingService";
import type { RankingUI } from "../types/ranking";

export function useRankings() {
    const { dados, carregando, erro } = useCarregar(
        async () => {
            const [individual, grupos, idUsuario] = await Promise.all([
                buscarRankingIndividual(),
                buscarRankingGrupos(),
                obterIdUsuarioAtual(),
            ]);

            const mensal: RankingUI[] = individual.map((item) => ({
                id: item.usuario.idUsuario,
                posicao: item.posicao,
                nome: item.usuario.nome,
                pontos: item.pontuacao,
            }));

            const gruposRows: RankingUI[] = grupos.map((item) => ({
                id: item.grupo.idGrupo,
                posicao: item.posicao,
                nome: item.grupo.nome,
                pontos: item.pontuacao,
            }));

            return {
                idUsuario,
                mensal,
                grupos: gruposRows,
                usuarioAtual: mensal.find((item) => item.id === idUsuario),
            };
        },
        [],
        "Não foi possível carregar o ranking.",
    );

    const geral = useCarregar(
        async () => {
            const lista = await buscarRankingAllTime();

            return lista.map(
                (item): RankingUI => ({
                    id: item.usuario.idUsuario,
                    posicao: item.posicao,
                    nome: item.usuario.nome,
                    pontos: item.totalMissoes,
                }),
            );
        },
        [],
        "Não foi possível carregar o ranking geral.",
        "ranking-all-time",
    );

    return {
        idUsuario: dados?.idUsuario ?? null,
        allTime: geral.dados ?? [],
        carregandoAllTime: geral.carregando,
        erroAllTime: geral.erro,
        mensal: dados?.mensal ?? [],
        grupos: dados?.grupos ?? [],
        usuarioAtual: dados?.usuarioAtual,
        carregando,
        erro,
    };
}