import { useState } from "react";
import { obterIdUsuarioAtual } from "../../../utils/usuarioAtual";
import { enviarVideo } from "../services/uploadService";
import type { EstadoEnvio } from "../types/upload";

export const TOTAL_ETAPAS = 4;

/**
 * Instantes (ms após o clique) em que a etapa visual avança para 1, 2 e 3. O back-end responde uma única
 * vez, no fim, então o avanço é uma ESTIMATIVA do que ele está fazendo; a última etapa (parecer da IA)
 * fica ativa até a resposta chegar.
 */
const AVANCO_DAS_ETAPAS_MS = [3000, 8000, 12000];

/**
 * Envio da evidência em vídeo:
 *  1. envia o arquivo ao back-end Java; 2. o Java pede o pHash ao serviço de IA (Python);
 *  3. compara com os envios anteriores; 4. o Gemini confere a missão e as regras definem status e parecer.
 */
export function useEnviarEvidencia() {
    const [estado, setEstado] = useState<EstadoEnvio>({ tipo: "ocioso" });

    async function enviar(arquivo: File, idMissao: number) {
        const temporizadores: number[] = [];

        try {
            const idUsuario = obterIdUsuarioAtual();

            setEstado({ tipo: "processando", etapa: 0 });
            AVANCO_DAS_ETAPAS_MS.forEach((ms, i) => {
                temporizadores.push(window.setTimeout(() => setEstado({ tipo: "processando", etapa: i + 1 }), ms));
            });

            const upload = await enviarVideo(arquivo, idMissao, idUsuario);

            setEstado({ tipo: "resultado", upload });
        } catch (e) {
            console.error("Falha ao enviar a evidência.", e);

            const demorou = e instanceof DOMException && (e.name === "TimeoutError" || e.name === "AbortError");

            setEstado({
                tipo: "erro",
                mensagem: demorou
                    ? "A análise demorou mais que o esperado. Tente novamente em instantes."
                    : e instanceof Error
                      ? e.message
                      : "Não foi possível enviar a evidência.",
            });
        } finally {
            temporizadores.forEach((id) => window.clearTimeout(id));
        }
    }

    function reiniciar() {
        setEstado({ tipo: "ocioso" });
    }

    return { estado, enviar, reiniciar };
}
