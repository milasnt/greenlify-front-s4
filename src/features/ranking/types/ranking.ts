import type { UsuarioResumoAPI } from "../../auth/types/auth";
import type { GrupoAPI } from "../../groups/types/group";

export interface RankingAPI {
    idRanking: number;
    dataInicio: string;
    dataFim: string;
    tipo: "INDIVIDUAL" | "GRUPAL";
    status: "ABERTO" | "FECHADO";
}

/** PosicaoRankingIndividualResponseDTO */
export interface PosicaoIndividualAPI {
    idPosicao: number;
    posicao: number;
    pontuacao: number;
    usuario: UsuarioResumoAPI;
    ranking: RankingAPI;
}

/** PosicaoRankingGrupoResponseDTO */
export interface PosicaoGrupoAPI {
    idPosicao: number;
    posicao: number;
    pontuacao: number;
    grupo: GrupoAPI;
    ranking: RankingAPI;
}

/** RankingAllTimeResponseDTO */
export interface PosicaoAllTimeAPI {
    posicao: number;
    usuario: UsuarioResumoAPI;
    totalMissoes: number;
}

/** Formato que os componentes já esperam */

export interface RankingUI {
    id: number;
    posicao: number;
    nome: string;
    pontos: number;
}