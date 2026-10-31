import type { GrupoAPI } from "../../groups/types/group";

/** UsuarioCadastroResponseDTO */
export interface UsuarioAPI {
    idUsuario: number;
    nome: string;
    email: string;
    nivelAcesso: number;
    statusConta: "ATIVA" | "SUSPENSA" | "BLOQUEADA" | "INATIVA";
    dataNascimento: string;
    grupo: GrupoAPI | null;
}

/** UsuarioResumoDTO */
export interface UsuarioResumoAPI {
    idUsuario: number;
    nome: string;
}
