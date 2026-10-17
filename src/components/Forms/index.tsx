import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import Field from "../Field";
import Button from "../ui/Button";

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
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <Field label="Nome Completo" htmlFor="nome" error={errors.nome?.message}>
                <input
                    id="nome"
                    type="text"
                    placeholder="Nome completo"
                    className="inputField"
                    aria-invalid={Boolean(errors.nome)}
                    {...register("nome", {
                        required: "Informe seu nome completo.",
                        minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres." },
                    })}
                />
            </Field>

            <Field label="Email" htmlFor="email" error={errors.email?.message}>
                <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="inputField"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email", {
                        required: "Informe seu email.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Informe um email válido.",
                        },
                    })}
                />
            </Field>

            <Field label="Assunto" htmlFor="assunto" error={errors.assunto?.message}>
                <input
                    id="assunto"
                    type="text"
                    placeholder="Sobre o que você quer falar?"
                    className="inputField"
                    aria-invalid={Boolean(errors.assunto)}
                    {...register("assunto", {
                        required: "Informe o assunto.",
                        minLength: { value: 3, message: "O assunto deve ter pelo menos 3 caracteres." },
                    })}
                />
            </Field>

            <Field label="Mensagem" htmlFor="mensagem" error={errors.mensagem?.message}>
                <textarea
                    id="mensagem"
                    rows={5}
                    placeholder="Escreva sua mensagem aqui..."
                    className="inputField resize-none"
                    aria-invalid={Boolean(errors.mensagem)}
                    {...register("mensagem", {
                        required: "Escreva sua mensagem.",
                        minLength: { value: 10, message: "A mensagem deve ter pelo menos 10 caracteres." },
                    })}
                />
            </Field>

            <Button type="submit" size="lg" full disabled={isSubmitting}>
                <FaPaperPlane />
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>

            <p className="text-center text-xs text-text-secondary">
                Responderemos normalmente em até 24 horas úteis.
            </p>
        </form>
    );
}