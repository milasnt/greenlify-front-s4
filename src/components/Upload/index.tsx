import { useRef } from "react";
import type { ChangeEvent } from "react";
import { FaVideo, FaUpload, FaCircleCheck, FaSpinner } from "react-icons/fa6";
import Card from "../Card";
import Button from "../Button";

export type UploadStatus = "idle" | "selected" | "sending" | "success";

interface UploadProofProps {
    status?: UploadStatus;
    fileName?: string | null;
    onSelectFile?: (file: File) => void;
    onSubmit?: () => void;
}

export default function UploadProof({
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

    return (
        <div>
            <h3 className="mb-5 text-[2.2rem] font-bold text-text-main">
                Comprovação da missão
            </h3>

            <Card className="border-dashed border-green-primary/30">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-ultra-light">
                        {status === "success" ? (
                            <FaCircleCheck className="text-[3rem] text-green-primary" />
                        ) : (
                            <FaVideo className="text-[3rem] text-green-primary" />
                        )}
                    </div>

                    <h4 className="mb-3 text-[2rem] font-bold text-text-main">
                        {status === "success"
                            ? "Vídeo enviado com sucesso!"
                            : status === "selected"
                            ? "Vídeo selecionado"
                            : "Envie um vídeo da sua ação"}
                    </h4>

                    <p className="mb-8 max-w-180 text-[1.5rem] leading-[1.7] text-text-secondary">
                        {status === "success"
                            ? "Seu vídeo está em análise automatizada. Você será notificado com o resultado."
                            : status === "selected"
                            ? `Arquivo selecionado: ${fileName}`
                            : "O vídeo será utilizado como comprovação da missão e poderá passar por uma análise automatizada."}
                    </p>

                    {status !== "success" && (
                        <Button variant="secondary" size="md" onClick={handleButtonClick}>
                            <span className="flex items-center gap-3">
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
                            </span>
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
                        <span className="mt-5 text-[1.3rem] text-text-secondary">
                            Formatos aceitos: MP4, MOV ou WebM
                        </span>
                    )}
                </div>
            </Card>
        </div>
    );
}
