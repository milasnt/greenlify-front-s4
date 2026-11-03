import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleCheck, FaEnvelope, FaGithub, FaLocationDot} from "react-icons/fa6";
import { FaSeedling } from "react-icons/fa";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import IconBox from "../../components/ui/IconBox";
import ItemList from "../../components/ui/ItemList";
import ContactForm from "../../components/ui/Forms";


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
            <Hero
                badge={<><FaEnvelope /> Contato</>}
                title={<>Converse com a <span className="textGradient">nossa equipe</span></>}
                text="Estamos disponíveis para responder dúvidas, receber sugestões e conversar sobre a solução criada."
                visual={<div className="flex h-30 w-30 items-center justify-center rounded-[2.5rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[2.5rem] text-green-primary" /></div>}
            />

            <Section variant="secondary" size="sm">
                <Grid split="even">
                    <div className="flex flex-col gap-6">
                        <Reveal>
                            <Card hover={false}>
                                <h2 className="mb-6 font-heading text-xl font-bold text-text-main">
                                    Informações de Contato
                                </h2>

                                <ItemList
                                    variant="contact"
                                    items={[
                                        { icon: <FaEnvelope />, title: "Email", text: "greenlify@gmail.com" },
                                        { icon: <FaLocationDot />, title: "Localização", text: "Av. Paulista, 1106 - Bela Vista, São Paulo - SP." },
                                        { icon: <FaGithub />, title: "GitHub", text: "github.com/greenlify", href: "https://github.com/" },
                                    ]}
                                />
                            </Card>
                        </Reveal>

                        <Reveal delay={100}>
                            <Card hover={false}>
                                <h2 className="mb-6 font-heading text-xl font-bold text-text-main">
                                    Horário de Atendimento
                                </h2>

                                <ItemList
                                    variant="rows"
                                    items={[
                                        { title: "Segunda - Sexta", value: "9h - 18h" },
                                        { title: "Sábado", value: "9h - 13h" },
                                        { title: "Domingo", value: "Fechado" },
                                    ]}
                                />
                            </Card>
                        </Reveal>
                    </div>

                    <Reveal delay={150}>
                        <Card hover={false} className="p-6 sm:p-8">
                            {submitted ? (
                                <div className="flex flex-col items-center gap-4 py-10 text-center">
                                    <IconBox icon={<FaCircleCheck />} variant="solid" size="lg" />

                                    <h2 className="font-heading text-2xl font-bold text-text-main">
                                        Mensagem enviada!
                                    </h2>

                                    <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                                        Obrigado por entrar em contato. Nossa equipe responderá em
                                        até 24 horas úteis.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="mb-6 font-heading text-xl font-bold text-text-main">
                                        Envie sua Mensagem
                                    </h2>

                                    <ContactForm onSubmitSuccess={handleSubmitSuccess} />
                                </>
                            )}
                        </Card>
                    </Reveal>
                </Grid>
            </Section>
        </>
    );
}
