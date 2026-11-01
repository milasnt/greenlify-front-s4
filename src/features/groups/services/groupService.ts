import { apiRequest } from "../../../shared/services/api";
import type { GrupoAPI, ResumoGrupoAPI } from "../types/group";

export async function buscarGrupos(): Promise<GrupoAPI[]> {
    return apiRequest<GrupoAPI[]>("/grupos");
}

export async function buscarResumoGrupo(idGrupo: number): Promise<ResumoGrupoAPI> {
    return apiRequest<ResumoGrupoAPI>(`/resumos/grupos/${idGrupo}`);
}