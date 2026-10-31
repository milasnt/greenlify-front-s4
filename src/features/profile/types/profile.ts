import type { UsuarioResumoAPI } from "../../usuario/types/usuario";

/** NivelContribuicao */
export interface NivelContribuicaoAPI {
    idNivel: number;
    nivel: number;
    nome: string;
    xpMinimo: number;
    xpMaximo: number;
}

/** PerfilSustentavelResponseDTO. */
export interface PerfilSustentavelAPI {
    idPerfilSustentavel: number;
    xpSustentavel: number;
    totalMissoesConcluidas: number;
    totalAguaEconomizada: number;
    totalEnergiaEconomizada: number;
    totalCarbonoEconomizado: number;
    usuario: UsuarioResumoAPI;
    nivel: NivelContribuicaoAPI;
}

/** ResumoImpactoResponseDTO */
export interface ResumoImpactoAPI {
    idUsuario: number;
    nome: string;
    pontos: number;
    posicaoRanking: number;
    mesesDeStreak: number;
    missoesConcluidas: number;
}