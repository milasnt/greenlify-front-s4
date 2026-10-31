/** GrupoResponseDTO */
export interface GrupoAPI {
    idGrupo: number;
    nome: string;
    dataCriacao: string;
    qtdUsuarios: number;
}

/** ResumoGrupoResponseDTO */
export interface ResumoGrupoAPI {
    idGrupo: number;
    nomeGrupo: string;
    totalSelos: number;
    tiposColetados: number;
    totalTipos: number;
    selos: { idSelo: number; nome: string; quantidade: number }[];
    integrantes: { posicao: number; idUsuario: number; nome: string; selos: number }[];
}

export interface GrupoUI {
    id: number;
    nome: string;
    membros: number;
    selosVerdes: number | null;
}