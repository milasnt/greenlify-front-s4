import { apiRequest } from "../../../shared/services/api";
import type { UsuarioAPI } from "../../usuario/types/usuario";
import type { PerfilSustentavelAPI, ResumoImpactoAPI } from "../types/profile";

export async function buscarUsuario(idUsuario: number): Promise<UsuarioAPI> {
    return apiRequest<UsuarioAPI>(`/usuarios/${idUsuario}`);
}

export async function buscarPerfil(idUsuario: number): Promise<PerfilSustentavelAPI> {
    return apiRequest<PerfilSustentavelAPI>(`/perfis-sustentaveis/${idUsuario}`);
}

export async function buscarResumoImpacto(idUsuario: number): Promise<ResumoImpactoAPI> {
    return apiRequest<ResumoImpactoAPI>(`/resumos/impacto/${idUsuario}`);
}