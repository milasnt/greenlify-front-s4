import Hero from "../../components/layout/Hero";
import Button from "../../components/ui/Button";
import { FaMicrochip } from "react-icons/fa";
import Dashboard from "../../components/ui/Dashboard";

export default function Home() {
    return (
            <Hero
                variant="home"
                badge={<><FaMicrochip /> Gamificação + IA + Sustentabilidade</>}
                title={<>O próximo nível do <span className="textGradient">impacto ambiental</span></>}
                text="Uma experiência sustentável onde missões interativas transformam atitudes conscientes em evolução, recompensas e impacto positivo."
                visual={<Dashboard />}
            >
                <Button to="/nossasolucao#demonstracao" size="lg" arrow>
                    Testar interface
                </Button>

                <Button to="/sobre" variant="secondary" size="lg">
                    Conhecer projeto
                </Button>
            </Hero>
);
}