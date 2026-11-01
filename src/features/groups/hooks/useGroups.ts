import { useCarregar } from "../../../shared/hooks/useCarregar";
import { buscarRankingGrupos } from "../../ranking/services/rankingService";
import { buscarGrupos, buscarResumoGrupo } from "../services/groupService";
import type { GrupoUI } from "../types/group";

export function useGrupos() {
    const { dados, carregando, erro } = useCarregar(
        async () => {
            const grupos = await buscarGrupos();
            const ranking = await buscarRankingGrupos();
            const selos = new Map(ranking.map((item) => [item.grupo.idGrupo, item.pontuacao]));

            const lista: GrupoUI[] = grupos.map((grupo) => ({
                id: grupo.idGrupo,
                nome: grupo.nome,
                membros: grupo.qtdUsuarios,
                selosVerdes: selos.get(grupo.idGrupo) ?? null,
            }));

            return lista.sort((a, b) => (b.selosVerdes ?? -1) - (a.selosVerdes ?? -1));
        },
        [],
        "Não foi possível carregar os grupos.",
        "grupos",
    );

    return { grupos: dados ?? [], carregando, erro };
}

export function useResumoGrupo(idGrupo: number | null | undefined) {
    const { dados, carregando, erro } = useCarregar(
        async () => (idGrupo ? buscarResumoGrupo(idGrupo) : null),
        [idGrupo],
        "Não foi possível carregar os detalhes do grupo.",
        idGrupo ? `resumo-grupo:${idGrupo}` : undefined,
    );

    return { resumo: dados, carregando, erro };
}