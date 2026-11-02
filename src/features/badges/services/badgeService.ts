import { ApiError, apiRequest } from "../../../shared/services/api";
import type { CarteiraAPI, ColetaSeloRequestAPI, SeloAPI, UsuarioSeloAPI } from "../types/badges";

export async function buscarSelos(): Promise<SeloAPI[]> {
    return apiRequest<SeloAPI[]>("/selos");
}

export async function buscarSelosDoUsuario(idUsuario: number): Promise<UsuarioSeloAPI[]> {
    return apiRequest<UsuarioSeloAPI[]>(`/usuarios-selos/usuario/${idUsuario}`);
}

export async function buscarCarteira(idUsuario: number): Promise<CarteiraAPI | null> {
    try {
        return await apiRequest<CarteiraAPI>(`/carteira/usuario/${idUsuario}`);
    } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
    }
}

export async function coletarSelo(coleta: ColetaSeloRequestAPI): Promise<string> {
    return apiRequest<string>("/usuarios-selos", {
        method: "POST",
        body: JSON.stringify(coleta),
    });
}