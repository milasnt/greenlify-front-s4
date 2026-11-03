/** Espelha UsuarioResumoDTO (Java). */
export interface UsuarioResumoAPI {
    idUsuario: number;
    nome: string;
}

/** Espelha o model Grupo serializado dentro de outros DTOs. */
export interface GrupoAPI {
    idGrupo: number;
    nome: string;
    dataCriacao: string;
    qtdUsuarios: number;
}

/** Espelha UsuarioCadastroResponseDTO (Java). */
export interface UsuarioAPI {
    idUsuario: number;
    nome: string;
    email: string;
    nivelAcesso: number;
    statusConta: "ATIVA" | "SUSPENSA" | "BLOQUEADA" | "INATIVA";
    dataNascimento: string;
    grupo: GrupoAPI | null;
}
