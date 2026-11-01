
import { useCarregar } from "../../../shared/hooks/useCarregar";
import { obterIdUsuarioAtual } from "../../usuario/utils/usuarioAtual.ts";
import { buscarMissaoContinuaPorId, buscarMissoesContinuas, buscarMissoesMensais, buscarProgressoDoUsuario } from "../services/missionService";
import { mapMissaoContinua, mapMissoesMensais } from "../utils/mapMission.ts";

export function useMissoesContinuas() {
    const { dados, carregando, erro } = useCarregar(
        async () => (await buscarMissoesContinuas()).map(mapMissaoContinua),
        [],
        "Não foi possível carregar as missões.",
    );

    return { missoes: dados ?? [], carregando, erro };
}

export function useMissaoContinua(id: string | undefined) {
    const { dados, carregando, erro } = useCarregar(
        async () => (id ? mapMissaoContinua(await buscarMissaoContinuaPorId(id)) : null),
        [id],
        "Não foi possível carregar a missão.",
    );

    return { missao: dados, carregando, erro };
}

export function useMissoesMensais() {
    const { dados, carregando, erro } = useCarregar(
        async () => {
            const [missoes, progressos] = await Promise.all([
                buscarMissoesMensais(),
                buscarProgressoDoUsuario(await obterIdUsuarioAtual()),
            ]);

            return mapMissoesMensais(missoes, progressos);
        },
        [],
        "Não foi possível carregar as missões mensais.",
    );

    return { missoes: dados ?? [], carregando, erro };
}