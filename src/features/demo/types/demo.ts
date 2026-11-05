import type { useMissoesContinuas, useMissoesMensais } from "../../missions/hooks/useMissoes";
import type { usePerfil } from "../../profile/hooks/useProfile";

export type Tela =
    | "home"
    | "grupos"
    | "grupo"
    | "criar"
    | "reels"
    | "conversas"
    | "centralMissoes"
    | "missoes"
    | "detalhe"
    | "ranking"
    | "perfil"
    | "resumo"
    | "coletarSelos";

export type Ir = (tela: Tela) => void;

export type DadosPerfil = ReturnType<typeof usePerfil>;
export type DadosContinuas = ReturnType<typeof useMissoesContinuas>;
export type DadosMensais = ReturnType<typeof useMissoesMensais>;
