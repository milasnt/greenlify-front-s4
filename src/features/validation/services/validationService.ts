import { apiRequest } from "../../../shared/services/api";
import type { UploadAPI, UploadRequestAPI } from "../types/validation";

export async function enviarUpload(upload: UploadRequestAPI): Promise<UploadAPI> {
    return apiRequest<UploadAPI>("/uploads", {
        method: "POST",
        body: JSON.stringify(upload),
    });
}

export async function buscarUploads(): Promise<UploadAPI[]> {
    return apiRequest<UploadAPI[]>("/uploads");
}