import Section from "../../components/Section";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa6";

export default function Error() {
    return (
        <Section>
            <div className="mx-auto flex min-h-[70vh] w-full max-w-[140rem] items-center justify-center px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                <Card center full>
                    <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-4xl bg-green-ultra-light text-[4rem] text-green-primary">
                        <FaLeaf />
                    </div>

                    <span className="mb-4 block text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-green-primary">
                        Erro 404
                    </span>

                    <h1 className="mb-6 text-[4.8rem] font-bold text-text-main max-[768px]:text-[3.8rem] max-[480px]:text-[3rem]">
                        Página não <span className="text-green-primary">encontrada</span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-[70rem] text-[1.6rem] leading-[1.7] text-text-secondary">
                        A página que você está procurando não existe ou pode ter
                        sido movida. Volte para o início e continue explorando
                        a Greenlify.
                    </p>

                    <div className="flex justify-center">
                        <Link to="/">
                            <Button size="lg">
                                Voltar para o início
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </Section>
    );
}