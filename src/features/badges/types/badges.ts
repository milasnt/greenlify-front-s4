import type { UsuarioResumoAPI } from "../../auth/types/auth";

/** SeloResponseDTO */
export interface SeloAPI {
    idSelo: number;
    nome: string;
    valeEnergia: number;
    creditoCarbono: number;
    pontosNecessarios: number;
}

/** UsuarioSeloResponseDTO */
export interface UsuarioSeloAPI {
    idUsuarioSelo: number;
    dataColeta: string;
    usuario: UsuarioResumoAPI;
    selo: SeloAPI;
}

/** CarteiraResponseDTO */
export interface CarteiraAPI {
    idCarteira: number;
    qtdPontos: number;
    valorReal: number;
}

/** UsuarioSeloRequestDTO */
export interface ColetaSeloRequestAPI {
    dataColeta: string;
    idUsuario: number;
    idSelo: number;
}

/** Formato que os componentes já esperam */

export interface SeloUI {
    id: number;
    nome: string;
    pontos: number;
    valeEntrega: number;
    creditoCarbono: number;
    coletado: boolean;
    nivel: number;
}

export type ResultadoColeta = { ok: true } | { ok: false; mensagem: string };