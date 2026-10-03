import Hero from "../../components/Hero";
import Button from "../../components/Button";
import Dashboard from "../../components/Dashboard";
import Section from "../../components/Section";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Section>
            <Hero
                variant="home"
                badge={
                    <>
                        <FaLeaf/>
                        Gamificação + IA + Sustentabilidade
                    </>
                }
                title={
                    <>
                        O próximo nível do{" "}
                        <span className="text-green-primary">
                            impacto ambiental
                        </span>
                    </>
                }
                text="Uma experiência sustentável onde missões interativas transformam atitudes conscientes em evolução, recompensas e impacto positivo."
                visual={<Dashboard />}
            >
                <div className="flex gap-8 max-[992px]:gap-[1.6rem] max-[768px]:gap-[1.2rem] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-4">
                    <Button size="lg">
                        <Link to="/sobre">
                            Conhecer Projeto
                        </Link>
                    </Button>

                    <Button variant="secondary" size="lg">
                        <Link to="/nossasolucao">
                            Testar Interface
                        </Link>
                    </Button>
                </div>
            </Hero>
        </Section>
);
}