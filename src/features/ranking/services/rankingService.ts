import { apiRequest } from "../../../shared/services/api";
import type { PosicaoAllTimeAPI, PosicaoGrupoAPI, PosicaoIndividualAPI } from "../types/ranking";

export async function buscarRankingIndividual(): Promise<PosicaoIndividualAPI[]> {
    return apiRequest<PosicaoIndividualAPI[]>("/posicoes-ranking/individual");
}

export async function buscarRankingGrupos(): Promise<PosicaoGrupoAPI[]> {
    return apiRequest<PosicaoGrupoAPI[]>("/posicoes-ranking/grupo");
}

export async function buscarRankingAllTime(): Promise<PosicaoAllTimeAPI[]> {
    return apiRequest<PosicaoAllTimeAPI[]>("/rankings/all-time");
}