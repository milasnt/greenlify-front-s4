import { useRef } from "react";
import type { ChangeEvent } from "react";
import { FaVideo, FaUpload, FaCircleCheck, FaSpinner, FaCloudArrowUp } from "react-icons/fa6";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import IconBox from "../../../../components/ui/IconBox";

export type UploadStatus = "idle" | "selected" | "sending" | "success";

interface UploadProofProps {
    variant?: "mission" | "dropzone";
    disabled?: boolean;
    status?: UploadStatus;
    fileName?: string | null;
    onSelectFile?: (file: File) => void;
    onSubmit?: () => void;
}

/** mission: envio com etapas (selecionar, enviar, sucesso) · dropzone: só a área de seleção (Validação por IA). */
export default function UploadProof({
    variant = "mission",
    disabled = false,
    status = "idle",
    fileName = null,
    onSelectFile,
    onSubmit,
}: UploadProofProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleButtonClick() {
        if (status === "selected") {
            onSubmit?.();
            return;
        }

        inputRef.current?.click();
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) onSelectFile?.(file);
    }

    if (variant === "dropzone") {
        const stateStyles = disabled
            ? "border-border bg-bg-muted/50"
            : "border-green-primary/40 bg-green-lighter/40 hover:border-green-primary hover:bg-green-lighter";

        return (
            <label
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition duration-300 ${stateStyles}`}
            >
                <input
                    type="file"
                    accept="video/*"
                    className="sr-only"
                    disabled={disabled}
                    onChange={handleFileChange}
                />

                <FaCloudArrowUp className="text-4xl text-green-primary" aria-hidden />

                <p className="mt-3 font-heading text-sm font-bold text-text-main">
                    {fileName ?? "Arraste ou selecione um vídeo"}
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                    MP4 ou MOV, até 60 segundos · o envio é simulado nesta demonstração
                </p>
            </label>
        );
    }

    return (
        <div>
            <h3 className="mb-4 font-heading text-xl font-bold text-text-main">
                Comprovação da missão
            </h3>

            <Card variant="dashed" hover={false}>
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                    <IconBox
                        size="lg"
                        variant={status === "success" ? "solid" : "green"}
                        icon={status === "success" ? <FaCircleCheck /> : <FaVideo />}
                    />

                    <h4 className="font-heading text-lg font-bold text-text-main">
                        {status === "success"
                            ? "Vídeo enviado com sucesso!"
                            : status === "selected"
                            ? "Vídeo selecionado"
                            : "Envie um vídeo da sua ação"}
                    </h4>

                    <p className="max-w-md text-sm leading-relaxed text-text-secondary">
                        {status === "success"
                            ? "Seu vídeo está em análise automatizada. Você será notificado com o resultado."
                            : status === "selected"
                            ? `Arquivo selecionado: ${fileName}`
                            : "O vídeo será utilizado como comprovação da missão e poderá passar por uma análise automatizada."}
                    </p>

                    {status !== "success" && (
                        <Button variant="secondary" size="md" onClick={handleButtonClick} disabled={status === "sending"}>
                            {status === "sending" ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaUpload />
                            )}
                            {status === "sending"
                                ? "Enviando..."
                                : status === "selected"
                                ? "Enviar vídeo"
                                : "Selecionar vídeo"}
                        </Button>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {status === "idle" && (
                        <span className="text-xs text-text-muted">
                            Formatos aceitos: MP4, MOV ou WebM
                        </span>
                    )}
                </div>
            </Card>
        </div>
    );
}