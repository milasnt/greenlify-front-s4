import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";

export interface ContactFormData {
    nome: string;
    email: string;
    assunto: string;
    mensagem: string;
}

interface FormsProps {
    onSubmitSuccess?: (data: ContactFormData) => void;
}

export default function Forms({ onSubmitSuccess }: FormsProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>();

    async function onSubmit(data: ContactFormData) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        onSubmitSuccess?.(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 max-[480px]:gap-[1.6rem]">
            <div className="flex flex-col gap-2 max-[480px]:gap-[0.8rem]">
                <label htmlFor="nome" className="text-[1.4rem] font-semibold text-text-main max-[480px]:text-[1.2rem]">
                    Nome Completo
                </label>
                <input
                    id="nome"
                    type="text"
                    placeholder="Nome completo"
                    className="w-full rounded-lg border border-border bg-bg px-5 py-4 text-[1.4rem] text-text-main outline-none transition duration-300 placeholder:text-text-secondary focus:border-green-primary max-[480px]:p-[1.4rem] max-[480px]:text-[1.4rem]"
                    {...register("nome", {
                        required: "Informe seu nome completo.",
                        minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                    })}
                />
                {errors.nome && (
                    <span className="text-[1.3rem] text-red-500 max-[480px]:text-[1.3rem]">{errors.nome.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-2 max-[480px]:gap-[0.8rem]">
                <label htmlFor="email" className="text-[1.4rem] font-semibold text-text-main max-[480px]:text-[1.2rem]">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-border bg-bg px-5 py-4 text-[1.4rem] text-text-main outline-none transition duration-300 placeholder:text-text-secondary focus:border-green-primary max-[480px]:p-[1.4rem] max-[480px]:text-[1.4rem]"
                    {...register("email", {
                        required: "Informe seu email.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Informe um email válido.",
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-[1.3rem] text-red-500 max-[480px]:text-[1.3rem]">{errors.email.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-2 max-[480px]:gap-[0.8rem]">
                <label htmlFor="assunto" className="text-[1.4rem] font-semibold text-text-main max-[480px]:text-[1.2rem]">
                    Assunto
                </label>
                <input
                    id="assunto"
                    type="text"
                    placeholder="Sobre o que você quer falar?"
                    className="w-full rounded-lg border border-border bg-bg px-5 py-4 text-[1.4rem] text-text-main outline-none transition duration-300 placeholder:text-text-secondary focus:border-green-primary max-[480px]:p-[1.4rem] max-[480px]:text-[1.4rem]"
                    {...register("assunto", {
                        required: "Informe o assunto.",
                        minLength: { value: 3, message: "O assunto deve ter pelo menos 3 caracteres." },
                    })}
                />
                {errors.assunto && (
                    <span className="text-[1.3rem] text-red-500 max-[480px]:text-[1.3rem]">{errors.assunto.message}</span>
                )}
            </div>

            <div className="flex flex-col gap-2 max-[480px]:gap-[0.8rem]">
                <label htmlFor="mensagem" className="text-[1.4rem] font-semibold text-text-main max-[480px]:text-[1.2rem]">
                    Mensagem
                </label>
                <textarea
                    id="mensagem"
                    placeholder="Escreva sua mensagem aqui..."
                    className="min-h-48 w-full resize-y rounded-lg border border-border bg-bg px-5 py-4 text-[1.4rem] leading-[1.6] text-text-main outline-none transition duration-300 placeholder:text-text-secondary focus:border-green-primary max-[480px]:p-[1.4rem] max-[480px]:text-[1.4rem] max-[480px]:min-h-48"
                    {...register("mensagem", {
                        required: "Escreva sua mensagem.",
                        minLength: { value: 10, message: "A mensagem deve ter pelo menos 10 caracteres." },
                    })}
                />
                {errors.mensagem && (
                    <span className="text-[1.3rem] text-red-500 max-[480px]:text-[1.3rem]">{errors.mensagem.message}</span>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-primary px-6 py-4 text-[1.5rem] font-semibold text-bg transition duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <FaPaperPlane />
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </button>

            <p className="text-center text-[1.3rem] leading-normal text-text-secondary">
                Responderemos normalmente em até 24 horas úteis.
            </p>
        </form>
    );
}
