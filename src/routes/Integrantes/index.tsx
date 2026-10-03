import Section from "../../components/Section";
import Hero from "../../components/Hero";
import { FaGithub, FaLinkedinIn, FaSeedling, FaLeaf, FaLightbulb, FaUsers } from "react-icons/fa";
import { FaUserGroup, FaShieldHeart } from "react-icons/fa6";
import Card from "../../components/Card";

import imgCamila from "../../assets/img/integrantes/img-camila.jpeg";
import imgLucas from "../../assets/img/integrantes/img-lucas.jpeg";
import imgEnzo from "../../assets/img/integrantes/img-enzo.jpeg";
import imgSophia from "../../assets/img/integrantes/img-sophia.jpeg";

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

    return (
        <>
            <Section>
                <Hero
                    badge={<FaUserGroup />}
                    title={<>Conheça os <span className="font-bold text-green-primary">integrantes</span></>}
                    text="Conheça quem está por trás do desenvolvimento da Greenlify. Uma equipe que uniu tecnologia e criatividade para criar uma solução sustentável para a SoulUp."
                    visual={<div className="flex h-48 w-48 items-center justify-center rounded-[3rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[4.5rem] text-green-primary" /></div>}
                />
            </Section>

            <Section>
                <div className="grid grid-cols-4 gap-8 max-[992px]:grid-cols-2 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                    {integrantes.map((integrante) => (
                        <Card key={integrante.rm} member>
                            <div className="mx-auto mb-8 h-48 w-48 overflow-hidden rounded-full border-3 border-green-ultra-light shadow-custom-sm max-[992px]:h-72 max-[992px]:w-72 max-[768px]:h-64 max-[768px]:w-64 max-[480px]:h-56 max-[480px]:w-56">
                                <img src={integrante.foto} alt={`Foto de ${integrante.nome}`} className="h-full w-full object-cover" />
                            </div>

                            <h3 className="mx-auto mb-3 flex min-h-10 max-w items-center justify-center text-[1.7rem] font-bold leading-[1.3] text-text-main">
                                {integrante.nome}
                            </h3>

                            <p className="min-h-11 text-[1.4rem] leading-[1.6] text-text-secondary">
                                {integrante.cargo}
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-3">
                                <span className="rounded-4xl bg-green-ultra-light px-4 py-2 text-[1.3rem] font-semibold text-green-primary">RM {integrante.rm}</span>
                                <span className="rounded-4xl bg-green-ultra-light px-4 py-2 text-[1.3rem] font-semibold text-green-primary">{integrante.turma}</span>
                            </div>

                            <div className="my-8 h-px w-full bg-border" />

                            <div className="flex justify-center gap-4">
                                <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${integrante.nome}`} className="flex h-15 w-15 items-center justify-center rounded-full border border-border text-[1.5rem] text-text-secondary transition duration-300 hover:border-green-primary hover:bg-green-primary hover:text-bg">
                                    <FaLinkedinIn />
                                </a>

                                <a href={integrante.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${integrante.nome}`} className="flex h-15 w-15 items-center justify-center rounded-full border border-border text-[1.5rem] text-text-secondary transition duration-300 hover:border-green-primary hover:bg-green-primary hover:text-bg">
                                    <FaGithub />
                                </a>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
            
            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="mb-16 text-center">
                        <h2 className="text-[3.6rem] font-bold text-text-main">
                            Nossos <span className="text-green-primary">Valores</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-4 gap-8 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                        <Card center>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-ultra-light text-[2.4rem] text-green-primary">
                                <FaLeaf />
                            </div>
                            <h3 className="mb-3 text-[1.7rem] font-bold text-text-main">
                                Sustentabilidade
                            </h3>
                            <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                                Pequenas ações geram grandes impactos.
                            </p>
                        </Card>

                        <Card center>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-ultra-light text-[2.4rem] text-green-primary">
                                <FaLightbulb />
                            </div>
                            <h3 className="mb-3 text-[1.7rem] font-bold text-text-main">
                                Inovação
                            </h3>
                            <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                                Tecnologia aplicada ao impacto ambiental.
                            </p>
                        </Card>

                        <Card center>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-ultra-light text-[2.4rem] text-green-primary">
                                <FaUsers />
                            </div>
                            <h3 className="mb-3 text-[1.7rem] font-bold text-text-main">
                                Colaboração
                            </h3>
                            <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                                Comunidade unida pela mudança.
                            </p>
                        </Card>

                        <Card center>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-ultra-light text-[2.4rem] text-green-primary">
                                <FaShieldHeart />
                            </div>
                            <h3 className="mb-3 text-[1.7rem] font-bold text-text-main">
                                Transparência
                            </h3>
                            <p className="text-[1.4rem] leading-[1.6] text-text-secondary">
                                Dados claros e acessíveis.
                            </p>
                        </Card>
                    </div>
                </div>
            </Section>

        </>
    );
}