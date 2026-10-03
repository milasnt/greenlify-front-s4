import { useEffect, useState } from "react";
import Section from "../../components/Section";
import Hero from "../../components/Hero";
import { MissionCard, MissaoMensal } from "../../components/MissionCard";
import { FaLeaf, FaListCheck } from "react-icons/fa6";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export interface Missao {
    id: string;
    titulo: string;
    descricao: string;
    impacto: "Baixo" | "Médio" | "Alto";
    dificuldade: "Fácil" | "Média" | "Difícil";
    pontos: number;
    xp: number;
    criterios: string[];
}

export const missoes: Missao[] = [
    {
        id: "separar-materiais-reciclaveis",
        titulo: "Separar materiais recicláveis",
        descricao: "Separe materiais recicláveis e organize-os corretamente para descarte.",
        impacto: "Médio",
        dificuldade: "Fácil",
        pontos: 40,
        xp: 30,
        criterios: [
            "A ação deve ser realizada pelo próprio usuário.",
            "O vídeo deve mostrar claramente a realização da ação.",
            "O conteúdo enviado deve corresponder à missão selecionada.",
        ],
    },
    {
        id: "utilizar-alternativa-reutilizavel",
        titulo: "Utilizar uma alternativa reutilizável",
        descricao: "Substitua um produto descartável por uma alternativa reutilizável durante sua rotina.",
        impacto: "Baixo",
        dificuldade: "Fácil",
        pontos: 30,
        xp: 20,
        criterios: [
            "A ação deve ser realizada pelo próprio usuário.",
            "O vídeo deve mostrar claramente a realização da ação.",
            "O conteúdo enviado deve corresponder à missão selecionada.",
        ],
    },
    {
        id: "levar-residuos-ponto-coleta",
        titulo: "Levar resíduos a um ponto de coleta",
        descricao: "Leve materiais recicláveis ou resíduos específicos a um ponto de coleta adequado.",
        impacto: "Alto",
        dificuldade: "Média",
        pontos: 70,
        xp: 50,
        criterios: [
            "A ação deve ser realizada pelo próprio usuário.",
            "O vídeo deve mostrar claramente a realização da ação.",
            "O conteúdo enviado deve corresponder à missão selecionada.",
        ],
    },
    {
        id: "reutilizar-embalagem",
        titulo: "Reutilizar uma embalagem",
        descricao: "Dê uma nova utilidade a uma embalagem que seria descartada.",
        impacto: "Médio",
        dificuldade: "Fácil",
        pontos: 40,
        xp: 30,
        criterios: [
            "A ação deve ser realizada pelo próprio usuário.",
            "O vídeo deve mostrar claramente a realização da ação.",
            "O conteúdo enviado deve corresponder à missão selecionada.",
        ],
    },
    {
        id: "compra-consciente",
        titulo: "Realizar uma compra consciente",
        descricao: "Escolha uma alternativa de compra que reduza o uso de materiais descartáveis.",
        impacto: "Médio",
        dificuldade: "Média",
        pontos: 50,
        xp: 40,
        criterios: [
            "A ação deve ser realizada pelo próprio usuário.",
            "O vídeo deve mostrar claramente a realização da ação.",
            "O conteúdo enviado deve corresponder à missão selecionada.",
        ],
    },
    {
        id: "acao-de-reciclagem",
        titulo: "Participar de uma ação de reciclagem",
        descricao: "Participe de uma ação relacionada à coleta, separação ou reciclagem de resíduos.",
        impacto: "Alto",
        dificuldade: "Difícil",
        pontos: 90,
        xp: 70,
        criterios: [
            "A ação deve ser realizada pelo próprio usuário.",
            "O vídeo deve mostrar claramente a realização da ação.",
            "O conteúdo enviado deve corresponder à missão selecionada.",
        ],
    },
];

const missoesMensais = [
    {
        titulo: "Faça 5 missões fáceis",
        progresso: 3,
        meta: 5,
    },
    {
        titulo: "Faça 10 missões de impacto baixo",
        progresso: 7,
        meta: 10,
    },
    {
        titulo: "Complete 3 missões de impacto alto",
        progresso: 2,
        meta: 3,
    },
    {
        titulo: "Complete 5 missões diferentes",
        progresso: 4,
        meta: 5,
    },
];

export default function Missoes() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Section>
                <Hero
                    variant="internal"
                    badge={<FaLeaf />}
                    title={<>Missões <span className="font-bold text-green-primary">Greenlify</span></>}
                    text="Realize ações sustentáveis, comprove sua participação e acumule pontos e XP para evoluir dentro da SoulUp."
                    visual={
                        <div className="flex h-48 w-48 items-center justify-center rounded-[3rem] border border-black/5 bg-bg-card shadow-custom-md">
                            <FaListCheck className="text-[4.5rem] text-green-primary" />
                        </div>
                    }
                />
            </Section>

            <Section variant="primary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            1
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Missões mensais
                            </h2>

                            <p className="mb-12 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                As missões mensais acompanham o desempenho do usuário durante o mês
                                e são cumpridas a partir das missões contínuas realizadas.
                            </p>

                            <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                {missoesMensais.map((missao) => (
                                    <MissaoMensal
                                        key={missao.titulo}
                                        titulo={missao.titulo}
                                        progresso={missao.progresso}
                                        meta={missao.meta}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                            2
                        </div>

                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                                Missões disponíveis
                            </h2>

                            <p className="mb-12 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                                Escolha uma missão contínua para realizar uma ação sustentável,
                                acumular pontos e XP e contribuir para suas metas mensais.
                            </p>

                            {isLoading ? (
                                <div className="grid grid-cols-3 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div
                                            key={item}
                                            className="h-80 animate-pulse rounded-2xl border border-border bg-bg-card"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                    {missoes.map((missao) => (
                                        <MissionCard
                                            key={missao.id}
                                            id={missao.id}
                                            titulo={missao.titulo}
                                            descricao={missao.descricao}
                                            impacto={missao.impacto}
                                            dificuldade={missao.dificuldade}
                                            pontos={missao.pontos}
                                            xp={missao.xp}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <Card center full>
                        <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                            Acompanhe sua <span className="text-green-primary">evolução</span>
                        </h2>

                        <p className="mx-auto mb-10 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">
                            Acesse seu perfil para acompanhar seus pontos, XP, conquistas,
                            nível de contribuição e posição nos rankings.
                        </p>

                        <div className="flex justify-center gap-6 max-[480px]:flex-col">
                            <Link to="/perfil">
                                <Button size="lg">
                                    Ver meu perfil
                                </Button>
                            </Link>

                            <Link to="/nossasolucao">
                                <Button variant="secondary" size="lg">
                                    Conhecer a solução
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </Section>
        </>
    );
}
