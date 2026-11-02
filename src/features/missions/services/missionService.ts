import { apiRequest } from "../../../shared/services/api";
import type { MissaoContinuaAPI, MissaoMensalAPI, ResumoMissoesAPI, UsuarioMissaoAPI } from "../types/mission";

export async function buscarMissoesContinuas(): Promise<MissaoContinuaAPI[]> {
    return apiRequest<MissaoContinuaAPI[]>("/missoes-continuas");
}

export async function buscarMissaoContinuaPorId(id: string): Promise<MissaoContinuaAPI> {
    return apiRequest<MissaoContinuaAPI>(`/missoes-continuas/${id}`);
}

export async function buscarMissoesMensais(): Promise<MissaoMensalAPI[]> {
    return apiRequest<MissaoMensalAPI[]>("/missoes-mensais");
}

export async function buscarProgressoDoUsuario(idUsuario: number): Promise<UsuarioMissaoAPI[]> {
    return apiRequest<UsuarioMissaoAPI[]>(`/usuarios-missoes/usuario/${idUsuario}`);
}

export async function buscarResumoMissoes(idUsuario: number): Promise<ResumoMissoesAPI> {
    return apiRequest<ResumoMissoesAPI>(`/resumos/missoes/${idUsuario}`);
}