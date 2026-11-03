import { apiRequest } from "../../../shared/services/api";
import type { UploadAPI, UploadRequestAPI } from "../types/upload";

/**
 * Cobre cold start do Render (Java + Python) e a análise do Gemini. Precisa ser maior que a soma dos
 * timeouts do back-end, senão o front desiste enquanto o Java ainda grava o resultado.
 */
const TEMPO_LIMITE_MS = 400_000;

/**
 * Envia o vídeo de verdade. O Java repassa ao serviço de IA (pHash + Gemini), compara com os envios
 * anteriores, grava o resultado, credita os pontos e devolve status e parecer.
 */
export async function enviarVideo(arquivo: File, idMissao: number, idUsuario: number): Promise<UploadAPI> {
    const form = new FormData();
    form.append("idUsuario", String(idUsuario));
    form.append("idMissao", String(idMissao));
    form.append("video", arquivo);

    return apiRequest<UploadAPI>("/uploads/validar", {
        method: "POST",
        body: form,
        signal: AbortSignal.timeout(TEMPO_LIMITE_MS),
    });
}

/** Fluxo antigo (hash e frames calculados no navegador). O Java grava o upload, compara os frames com os envios anteriores e já devolve status e parecer. */
export async function enviarUpload(upload: UploadRequestAPI): Promise<UploadAPI> {
    return apiRequest<UploadAPI>("/uploads", {
        method: "POST",
        body: JSON.stringify(upload),
    });
}

export async function buscarUploads(): Promise<UploadAPI[]> {
    return apiRequest<UploadAPI[]>("/uploads");
}
