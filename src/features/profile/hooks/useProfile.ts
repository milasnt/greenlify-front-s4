import { useCarregar } from "../../../shared/hooks/useCarregar";
import { obterIdUsuarioAtual } from "../../usuario/utils/usuarioAtual";
import { buscarPerfil, buscarResumoImpacto, buscarUsuario } from "../services/profileService";

export function usePerfil() {
    const { dados, carregando, erro } = useCarregar(
        async () => {
            const idUsuario = await obterIdUsuarioAtual();

            const [usuario, perfil, impacto] = await Promise.all([
                buscarUsuario(idUsuario),
                buscarPerfil(idUsuario),
                buscarResumoImpacto(idUsuario),
            ]);

            return { usuario, perfil, impacto };
        },
        [],
        "Não foi possível carregar o perfil.",
    );

    return {
        usuario: dados?.usuario ?? null,
        perfil: dados?.perfil ?? null,
        impacto: dados?.impacto ?? null,
        carregando,
        erro,
    };
}