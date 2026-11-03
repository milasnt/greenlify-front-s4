import type { AnalysisStatus } from "../components/AnalysisResult";
import type { StatusUploadAPI } from "../types/upload";

/** StatusUploadEnum (Java) -> estado visual do AnalysisResult. */
export function statusDoUpload(status: StatusUploadAPI): AnalysisStatus {
    switch (status) {
        case "APROVADO":
            return "approved";
        case "PARCIALMENTE_APROVADO":
            return "partially_approved";
        case "REPROVADO":
            return "rejected";
        default:
            return "processing";
    }
}
