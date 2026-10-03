import { useState } from "react";
import type { ReactNode } from "react";
import { FaXmark, FaLeaf, FaCircleCheck, FaStar } from "react-icons/fa6";
import Card from "../Card";
import Upload from "../Upload";
import type { UploadStatus } from "../Upload";

interface MissionModalProps {
    titulo: string;
    descricao: string;
    impacto: "Baixo" | "Médio" | "Alto";
    dificuldade: "Fácil" | "Média" | "Difícil";
    pontos: number;
    xp: number;
    criteria: ReactNode;
    onClose?: () => void;
}

export default function MissionModal({
    titulo,
    descricao,
    impacto,
    dificuldade,
    pontos,
    xp,
    criteria,
    onClose,
}: MissionModalProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
    const [fileName, setFileName] = useState<string | null>(null);

    function handleClose() {
        setIsOpen(false);
        onClose?.();
    }

    function handleSelectFile(file: File) {
        setFileName(file.name);
        setUploadStatus("selected");
    }

    function handleSubmitUpload() {
        setUploadStatus("sending");
        setTimeout(() => {
            setUploadStatus("success");
        }, 1500);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 px-6 py-10 backdrop-blur-sm max-[480px]:px-[1.6rem] max-[480px]:py-[2.5rem]">
            <div className="relative max-h-[90vh] w-full max-w-360 overflow-y-auto rounded-4xl border border-border bg-bg p-10 shadow-custom-md max-[768px]:p-[1.8rem] max-[480px]:p-[1.6rem]">
                
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-ultra-light text-[1.8rem] text-green-primary transition duration-300 hover:bg-green-primary hover:text-bg"
                    aria-label="Fechar missão"
                >
                    <FaXmark />
                </button>

                <div className="mb-10 pr-16 max-[480px]:mb-[1.6rem] max-[480px]:pr-16">
                    <div className="mb-5 flex items-center gap-3 text-[1.4rem] font-semibold text-green-primary max-[480px]:text-[1.3rem]">
                        <FaLeaf />
                        Missão sustentável
                    </div>

                    <h2 className="mb-5 text-[3.2rem] font-bold leading-tight text-text-main max-[480px]:text-[2.4rem]">
                        {titulo}
                    </h2>

                    <p className="max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary max-[480px]:text-[1.4rem]">
                        {descricao}
                    </p>
                </div>

                <div className="mb-10 grid grid-cols-4 gap-5 max-[992px]:gap-[1.6rem] max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                    <Card center>
                        <FaLeaf className="mx-auto mb-4 text-[2.5rem] text-green-primary" />

                        <span className="mb-2 block text-[1.3rem] text-text-secondary">
                            Impacto
                        </span>

                        <strong className="text-[1.7rem] font-bold text-text-main">
                            {impacto}
                        </strong>
                    </Card>

                    <Card center>
                        <FaCircleCheck className="mx-auto mb-4 text-[2.5rem] text-green-primary" />

                        <span className="mb-2 block text-[1.3rem] text-text-secondary">
                            Dificuldade
                        </span>

                        <strong className="text-[1.7rem] font-bold text-text-main">
                            {dificuldade}
                        </strong>
                    </Card>

                    <Card center>
                        <FaStar className="mx-auto mb-4 text-[2.5rem] text-green-primary" />

                        <span className="mb-2 block text-[1.3rem] text-text-secondary">
                            Pontuação
                        </span>

                        <strong className="text-[1.7rem] font-bold text-text-main">
                            +{pontos} pontos
                        </strong>
                    </Card>

                    <Card center>
                        <FaStar className="mx-auto mb-4 text-[2.5rem] text-green-primary" />

                        <span className="mb-2 block text-[1.3rem] text-text-secondary">
                            Experiência
                        </span>

                        <strong className="text-[1.7rem] font-bold text-text-main">
                            +{xp} XP
                        </strong>
                    </Card>
                </div>

                <div className="mb-10 max-[480px]:mb-[1.6rem]">
                    <h3 className="mb-5 text-[2.2rem] font-bold text-text-main">
                        Critérios para conclusão
                    </h3>

                    <Card>
                        <div className="flex flex-col gap-4">
                            {criteria}
                        </div>
                    </Card>
                </div>

                <Upload
                    status={uploadStatus}
                    fileName={fileName}
                    onSelectFile={handleSelectFile}
                    onSubmit={handleSubmitUpload}
                />
            </div>
        </div>
    );
}
