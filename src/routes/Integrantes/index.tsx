import { FaGithub, FaLeaf, FaLightbulb, FaLinkedinIn, FaSeedling, FaUsers } from "react-icons/fa";
import { FaShieldHeart, FaUserGroup } from "react-icons/fa6";

import imgCamila from "../../assets/img/integrantes/img-camila.jpeg";
import imgLucas from "../../assets/img/integrantes/img-lucas.jpeg";
import imgEnzo from "../../assets/img/integrantes/img-enzo.jpeg";
import imgSophia from "../../assets/img/integrantes/img-sophia.jpeg";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import SectionHeading from "../../components/layout/SectionHeading";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import FeatureCard from "../../components/ui/FeatureCard";

interface Integrante {
    nome: string;
    cargo: string;
    rm: string;
    turma: string;
    foto: string;
    linkedin: string;
    github: string;
}

export default function Integrantes() {
    const integrantes: Integrante[] = [
        {
            nome: "Camila de Souza",
            cargo: "Desenvolvedora Front-End",
            rm: "573993",
            turma: "1TDSPJ",
            foto: imgCamila,
            linkedin: "https://www.linkedin.com/in/camila-souza-52164a3a5/",
            github: "https://github.com/milasnt",
        },
        {
            nome: "Lucas Marti Zapater",
            cargo: "Administrador de Dados",
            rm: "571053",
            turma: "1TDSPJ",
            foto: imgLucas,
            linkedin: "https://www.linkedin.com/in/lucas-marti-zapater-vieira-b902a4236/",
            github: "https://github.com/Lucasvieira-tech",
        },
        {
            nome: "Enzo Gabriel Florencio",
            cargo: "Desenvolvedor Back-End",
            rm: "573898",
            turma: "1TDSPK",
            foto: imgEnzo,
            linkedin: "https://www.linkedin.com/in/enzo-pereira-931a323a6/",
            github: "https://github.com/EnzoPereira0618",
        },
        {
            nome: "Sophia Teixeira Ramada",
            cargo: "Desenvolvedora Back-End",
            rm: "573823",
            turma: "1TDSPJ",
            foto: imgSophia,
            linkedin: "https://www.linkedin.com/in/sophia-ramada-228b07364/",
            github: "https://github.com/sophRmd",
        },
    ];

    const valores = [
        { icon: <FaLeaf />, title: "Sustentabilidade", text: "Pequenas ações geram grandes impactos." },
        { icon: <FaLightbulb />, title: "Inovação", text: "Tecnologia aplicada ao impacto ambiental." },
        { icon: <FaUsers />, title: "Colaboração", text: "Comunidade unida pela mudança." },
        { icon: <FaShieldHeart />, title: "Transparência", text: "Dados claros e acessíveis." },
    ];

    const socialStyles = "grid h-10 w-10 place-items-center rounded-full border border-border text-text-secondary transition duration-300 hover:border-green-primary hover:bg-green-primary hover:text-white";

    return (
        <>
            <Hero
                badge={<><FaUserGroup /> Equipe</>}
                title={<>Conheça os <span className="textGradient">integrantes</span></>}
                text="Conheça quem está por trás do desenvolvimento da Greenlify. Uma equipe que uniu tecnologia e criatividade para criar uma solução sustentável para a SoulUp."
                visual={<div className="flex h-30 w-30 items-center justify-center rounded-[2.5rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[2.5rem] text-green-primary" /></div>}
            />

            <Section size="sm">
                <Grid columns={4}>
                    {integrantes.map((integrante, index) => (
                        <Reveal key={integrante.rm} delay={index * 90}>
                            <Card member className="h-full">
                                <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full ring-4 ring-green-light/40">
                                    <img
                                        src={integrante.foto}
                                        alt={`Foto de ${integrante.nome}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                <h3 className="font-heading text-lg font-bold text-text-main">
                                    {integrante.nome}
                                </h3>

                                <p className="mt-1 text-sm text-text-secondary">
                                    {integrante.cargo}
                                </p>

                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    <Badge variant="muted">RM {integrante.rm}</Badge>
                                    <Badge variant="purple">{integrante.turma}</Badge>
                                </div>

                                <div className="my-5 h-px bg-border" />

                                <div className="flex justify-center gap-3">
                                    <a
                                        href={integrante.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`LinkedIn de ${integrante.nome}`}
                                        className={socialStyles}
                                    >
                                        <FaLinkedinIn />
                                    </a>

                                    <a
                                        href={integrante.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`GitHub de ${integrante.nome}`}
                                        className={socialStyles}
                                    >
                                        <FaGithub />
                                    </a>
                                </div>
                            </Card>
                        </Reveal>
                    ))}
                </Grid>
            </Section>

            <Section variant="secondary">
                <SectionHeading align="center" label="Valores" title={<>Nossos <span className="textGradient">Valores</span></>} />

                <Grid columns={4} className="mt-12">
                    {valores.map((valor, index) => (
                        <Reveal key={valor.title} delay={index * 90}>
                            <FeatureCard icon={valor.icon} title={valor.title} text={valor.text} tone="purple" />
                        </Reveal>
                    ))}
                </Grid>
            </Section>
        </>
    );
}