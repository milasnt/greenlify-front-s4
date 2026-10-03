import { useNavigate, useLocation } from "react-router-dom";
import Section from "../../components/Section";
import Hero from "../../components/Hero";
import Card from "../../components/Card";
import ContactForm from "../../components/Forms";
import { FaEnvelope, FaGithub, FaLocationDot, FaSeedling, FaCircleCheck } from "react-icons/fa6";

interface ContatoLocationState {
    submitted?: boolean;
}

export default function Contato() {
    const navigate = useNavigate();
    const location = useLocation();
    const submitted = Boolean((location.state as ContatoLocationState | null)?.submitted);

    function handleSubmitSuccess() {
        navigate("/contato", { state: { submitted: true }, replace: true });
    }

    return (
        <>
            <Section variant="primary">
                <Hero
                    badge={<FaEnvelope />}
                    title={<>Converse com a <span className="font-bold text-green-primary">nossa equipe</span></>}
                    text="Estamos disponíveis para responder dúvidas, receber sugestões e conversar sobre a solução criada."
                    visual={<div className="flex h-48 w-48 items-center justify-center rounded-[3rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[4.5rem] text-green-primary" /></div>}
                />
            </Section>

            <Section variant="secondary">
                <div className="mx-auto grid w-full max-w-[140rem] grid-cols-2 gap-12 px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[900px]:grid-cols-1 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex flex-col gap-8">
                        <Card>
                            <h2 className="mb-8 text-[2.2rem] font-bold text-text-main">
                                Informações de Contato
                            </h2>

                            <div className="flex flex-col gap-8">
                                <div className="flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-ultra-light text-[1.8rem] text-green-primary">
                                        <FaEnvelope />
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-[1.5rem] font-semibold text-text-main">
                                            Email
                                        </h3>
                                        <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                                            greenlify@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-ultra-light text-[1.8rem] text-green-primary">
                                        <FaLocationDot />
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-[1.5rem] font-semibold text-text-main">
                                            Localização
                                        </h3>
                                        <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                                            Av. Paulista, 1106 - Bela Vista, São Paulo - SP.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-ultra-light text-[1.8rem] text-green-primary">
                                        <FaGithub />
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-[1.5rem] font-semibold text-text-main">
                                            GitHub
                                        </h3>
                                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-[1.4rem] leading-[1.6] text-text-secondary transition duration-300 hover:text-green-primary">
                                            github.com/greenlify
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="mb-8 text-[2.2rem] font-bold text-text-main">
                                Horário de Atendimento
                            </h2>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-border pb-4 text-[1.4rem] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[0.6rem]">
                                    <span className="text-text-secondary">Segunda - Sexta</span>
                                    <span className="font-semibold text-text-main">9h - 18h</span>
                                </div>

                                <div className="flex items-center justify-between border-b border-border pb-4 text-[1.4rem] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[0.6rem]">
                                    <span className="text-text-secondary">Sábado</span>
                                    <span className="font-semibold text-text-main">9h - 13h</span>
                                </div>

                                <div className="flex items-center justify-between text-[1.4rem]">
                                    <span className="text-text-secondary">Domingo</span>
                                    <span className="font-semibold text-text-main">Fechado</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-ultra-light">
                                    <FaCircleCheck className="text-[3rem] text-green-primary" />
                                </div>

                                <h2 className="mb-4 text-[2.2rem] font-bold text-text-main">
                                    Mensagem enviada!
                                </h2>

                                <p className="max-w-120 text-[1.4rem] leading-[1.6] text-text-secondary">
                                    Obrigado por entrar em contato. Nossa equipe responderá em
                                    até 24 horas úteis.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h2 className="mb-8 text-[2.2rem] font-bold text-text-main">
                                    Envie sua Mensagem
                                </h2>

                                <ContactForm onSubmitSuccess={handleSubmitSuccess} />
                            </>
                        )}
                    </Card>
                </div>
            </Section>
        </>
    );
}
