import Section from "../../components/Section";
import Hero from "../../components/Hero";
import FAQCard from "../../components/FAQCard";
import Card from "../../components/Card";
import { FaQuestion, FaSeedling, FaComments } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../components/Button";

export default function FAQ() {
    const soulUpFAQs = [
        {
            question: "O que é a SoulUp?",
            answer: "A SoulUp é uma plataforma social voltada para impacto sustentável, que utiliza tecnologias como blockchain e sistemas de recompensas para transformar interações digitais em benefícios reais para os usuários e para o meio ambiente.",
        },
        {
            question: "Como funciona a SoulUp?",
            answer: "A plataforma recompensa os usuários por interações realizadas dentro do aplicativo, como assistir conteúdos e anúncios de parceiros. Essas ações geram Pontos ECOA, que podem ser convertidos em benefícios, experiências sustentáveis e descontos na conta de energia.",
        },
        {
            question: "O que são os Pontos ECOA?",
            answer: "Os Pontos ECOA são o sistema de recompensas da SoulUp. Os usuários acumulam pontos ao interagir com a plataforma e podem utilizá-los para resgatar Selos Verdes, descontos em contas de luz e benefícios relacionados à sustentabilidade e compensação de carbono.",
        },
        {
            question: "Qual é o diferencial da SoulUp?",
            answer: "O principal diferencial da SoulUp está na união entre tecnologia, sustentabilidade e recompensas reais. A plataforma busca transformar o tempo e a atenção dos usuários em impacto positivo, oferecendo uma experiência digital mais relevante, transparente e conectada a causas socioambientais.",
        },
        {
            question: "Como a SoulUp contribui para a sustentabilidade?",
            answer: "A SoulUp incentiva ações alinhadas aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU, permitindo que os usuários acumulem benefícios enquanto contribuem para iniciativas como compensação de carbono, consumo consciente e impacto socioambiental positivo.",
        },
    ];

    const greenlifyFAQs = [
        {
            question: "O que é a Greenlify?",
            answer: "Greenlify é um módulo da SoulUp que busca incentivar ações sustentáveis por meio de missões, pontuações, rankings e recompensas, transformando a participação dos usuários em impacto ambiental positivo e experiências mais relevantes dentro da plataforma.",
        },
        {
            question: "Como funciona a pontuação da Greenlify?",
            answer: (
                <div className="space-y-6">
                    <p>A pontuação é calculada considerando o impacto ambiental da missão e a dificuldade da atividade.</p>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-130 border-collapse text-center">
                            <thead>
                                <tr className="bg-green-ultra-light">
                                    <th className="border border-border px-5 py-4 text-left font-semibold text-text-main">Impacto/Dificuldade</th>
                                    <th className="border border-border px-5 py-4 font-semibold text-text-main">Fácil</th>
                                    <th className="border border-border px-5 py-4 font-semibold text-text-main">Médio</th>
                                    <th className="border border-border px-5 py-4 font-semibold text-text-main">Difícil</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="border border-border px-5 py-4 text-left font-semibold text-text-main">Baixo</th>
                                    <td className="border border-border px-5 py-4">20</td>
                                    <td className="border border-border px-5 py-4">40</td>
                                    <td className="border border-border px-5 py-4">60</td>
                                </tr>
                                <tr>
                                    <th className="border border-border px-5 py-4 text-left font-semibold text-text-main">Médio</th>
                                    <td className="border border-border px-5 py-4">40</td>
                                    <td className="border border-border px-5 py-4">60</td>
                                    <td className="border border-border px-5 py-4">80</td>
                                </tr>
                                <tr>
                                    <th className="border border-border px-5 py-4 text-left font-semibold text-text-main">Alto</th>
                                    <td className="border border-border px-5 py-4">60</td>
                                    <td className="border border-border px-5 py-4">80</td>
                                    <td className="border border-border px-5 py-4">100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>Para a atribuição de pontos, também são considerados os critérios de comprovação do arquivo enviado.</p>

                    <div className="space-y-2">
                        <p><strong>Aprovado:</strong> × 1.0</p>
                        <p><strong>Parcialmente aprovado:</strong> × 0.7</p>
                        <p><strong>Reprovado:</strong> × 0.0</p>
                    </div>
                </div>
            ),
        },
        {
            question: "Como as ações são validadas?",
            answer: "Após concluir uma missão, o usuário envia uma foto ou vídeo como comprovação. O conteúdo passa por validação automatizada utilizando inteligência artificial, que poderá retornar aprovado, parcialmente aprovado ou reprovado, com base na análise do conteúdo enviado.",
        },
        {
            question: "O que acontece se uma missão for parcialmente aprovada?",
            answer: "Em casos de aprovação parcial, o usuário ainda recebe pontos, porém com um fator redutor aplicado na pontuação final da missão. Ele também terá a possibilidade de reenviar a comprovação para uma nova validação, buscando alcançar a aprovação total e maximizar seus pontos.",
        },
        {
            question: "O que é o sistema de streak?",
            answer: "O streak funciona como uma sequência de participação contínua. Quanto maior a consistência do usuário ao cumprir as missões mensais, maior será sua evolução dentro da plataforma.",
        },
        {
            question: "Como a Greenlify evita fraudes?",
            answer: "O sistema utiliza fingerprint de mídia, validação automatizada e limites de execução das missões para reduzir tentativas de fraude e reutilização de conteúdo.",
        },
        {
            question: "Existem diferentes tipos de missões?",
            answer: "Sim. A plataforma possui missões contínuas, que são fixas na plataforma e podem ser repetidas dentro de limites mensais, e missões mensais, focadas em engajamento recorrente e manutenção do streak.",
        },
        {
            question: "Como funciona o ranking?",
            answer: "O ranking organiza os usuários com base na pontuação acumulada durante o período. Os 20 melhores colocados recebem benefícios e bônus dentro da plataforma, sendo o TOP 1 o grande campeão do mês e recebendo como prêmio o pagamento integral de sua conta de luz.",
        },
        {
            question: "A Greenlify é um aplicativo separado?",
            answer: "Não. A Greenlify foi projetada como um módulo integrado à SoulUp, funcionando como uma funcionalidade adicional dentro da própria plataforma.",
        },
    ];

    return (
        <>
            <Section variant="primary">
                <Hero
                    badge={<FaQuestion />}
                    title={<>Respondendo suas <span className="font-bold text-green-primary">principais dúvidas</span></>}
                    text="Encontre informações sobre a SoulUp e o Greenlify, entendendo melhor como funciona a plataforma e as funcionalidades da solução."
                    visual={<div className="flex h-48 w-48 items-center justify-center rounded-[3rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[4.5rem] text-green-primary" /></div>}
                />
            </Section>

            <Section variant="secondary">
                <div className="mx-auto grid w-full max-w-[140rem] grid-cols-2 gap-16 px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[768px]:grid-cols-1 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex flex-col justify-start">
                        <div className="flex items-start gap-6">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                                1
                            </div>
                            <div>
                                <h2 className="mb-4 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Perguntas sobre a SoulUp</h2>
                                <p className="max-w-2xl text-[1.5rem] leading-[1.7] text-text-secondary">Perguntas frequentes sobre a SoulUp e suas funcionalidades.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {soulUpFAQs.map((faq) => (
                            <Card key={faq.question}>
                                <FAQCard question={faq.question} answer={faq.answer} />
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            <Section variant="primary">
                <div className="mx-auto grid w-full max-w-[140rem] grid-cols-2 gap-16 px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[768px]:grid-cols-1 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex flex-col justify-start">
                        <div className="flex items-start gap-6">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">
                                2
                            </div>
                            <div>
                                <h2 className="mb-4 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Perguntas sobre a Greenlify</h2>
                                <p className="max-w-2xl text-[1.5rem] leading-[1.7] text-text-secondary">Perguntas frequentes sobre nossa solução.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {greenlifyFAQs.map((faq) => (
                            <Card key={faq.question}>
                                <FAQCard question={faq.question} answer={faq.answer} />
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <Card center full>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-ultra-light text-[2.4rem] text-green-primary">
                            <FaComments />
                        </div>

                        <h2 className="mb-4 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">
                            Ainda possui <span className="text-green-primary">dúvidas</span>?
                        </h2>

                        <p className="mx-auto mb-8 max-w-3xl text-[1.5rem] leading-[1.7] text-text-secondary">
                            Nossa equipe está pronta para te ajudar! Entre em contato conosco e retornaremos o mais rápido possível.
                        </p>

                        <div className="flex justify-center gap-5">

                            <Button size="md">
                                <Link to="/contato">
                                    Fale Conosco
                                </Link>
                            </Button>
                            
                            <Button size="md" variant="secondary">
                                <Link to="/">
                                    Voltar ao início
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </Section>
        </>
    );
}