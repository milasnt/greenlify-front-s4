import Hero from "../../components/layout/Hero";
import Button from "../../components/ui/Button";
import { FaMicrochip } from "react-icons/fa";
import ItemList from "../../components/ui/ItemList";
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

                <a href="#como-funciona" className="px-2 py-3.5 font-heading text-sm font-bold text-green-primary underline-offset-4 hover:underline">
                    Como funciona
                </a>

                <ItemList
                    variant="stats"
                    className="mt-4 w-full border-t border-border pt-6"
                    items={[
                        { value: "18", title: "missões concluídas" },
                        { value: "Contribuidora", title: "nível de contribuição" },
                        { value: "#3", title: "no ranking do mês" },
                    ]}
                />
            </Hero>
);
}