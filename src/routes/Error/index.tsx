import { FaLeaf } from "react-icons/fa6";
import Section from "../../components/layout/Section";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import IconBox from "../../components/ui/IconBox";

export default function Error() {
    return (
        <Section>
            <Card center full hover={false} className="mx-auto max-w-2xl">
                <div className="mb-5 flex justify-center">
                    <IconBox icon={<FaLeaf />} variant="gradient" size="lg" />
                </div>

                <Badge variant="purple">Erro 404</Badge>

                <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Página não <span className="textGradient">encontrada</span>
                </h1>

                <p className="mx-auto mt-4 max-w-md leading-relaxed text-text-secondary">
                    A página que você está procurando não existe ou pode ter
                    sido movida. Volte para o início e continue explorando
                    a Greenlify.
                </p>

                <div className="mt-8 flex justify-center">
                    <Button to="/" size="lg" arrow>
                        Voltar para o início
                    </Button>
                </div>
            </Card>
        </Section>
    );
}