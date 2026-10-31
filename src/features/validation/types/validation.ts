import type { UsuarioResumoAPI } from "../../auth/types/auth";

/** FingerprintFrameRequestDTO */
export interface FrameRequestAPI {
    numeroFrame: number;
    tempoSegundo: number;
    pHash: string;
    embedding: string;
    idFingerprint: number;
}

/** UploadRequestDTO */
export interface UploadRequestAPI {
    arquivo: string;
    tamanhoMB: number;
    idMissao: number;
    idUsuario: number;
    hashVideo: string;
    frames: FrameRequestAPI[];
}

export type StatusUploadAPI = "EM_ANALISE" | "APROVADO" | "PARCIALMENTE_APROVADO" | "REPROVADO";

/** UploadResponseDTO */
export interface UploadAPI {
    idUpload: number;
    status: StatusUploadAPI;
    dataEnvio: string;
    dataAnalise: string | null;
    arquivo: string;
    analise: string;
    confiancaDuplicidade: number;
    missao: { idMissao: number; nome: string };
    usuario: UsuarioResumoAPI;
}

/** Alimenta o Roadmap e o VideoFrames da tela de validação. */
export type EstadoEnvio =
    | { tipo: "ocioso" }
    | { tipo: "processando"; etapa: number }
    | { tipo: "resultado"; upload: UploadAPI }
    | { tipo: "erro"; mensagem: string };