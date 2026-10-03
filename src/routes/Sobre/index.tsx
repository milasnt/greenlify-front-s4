import Section from "../../components/Section";
import Hero from "../../components/Hero";
import Card from "../../components/Card";
import Roadmap from "../../components/Roadmap";
import imgFiap from "../../assets/img/sobre/img-fiap.jpeg";
import imgSoulup from "../../assets/img/sobre/img-soulup.png";
import { FaSeedling, FaLeaf, FaRobot, FaChartLine, FaUsers, FaTrophy, FaCode, FaCss3Alt } from "react-icons/fa";
import { FaBolt, FaListCheck, FaReact } from "react-icons/fa6";

export default function Sobre() {
    return (
        <>
            <Section>
                <Hero
                    badge={<FaLeaf />}
                    title={<>Gameficação e <span className="font-bold text-green-primary">Sustentabilidade</span></>}
                    text="Conheça a Greenlify, a solução desenvolvida para a SoulUp que transforma ações sustentáveis em desafios, pontuações e recompensas reais dentro da plataforma."
                    visual={<div className="flex h-48 w-48 items-center justify-center rounded-[3rem] border border-black/5 bg-bg-card shadow-custom-md"><FaSeedling className="text-[4.5rem] text-green-primary" /></div>}
                />
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="grid grid-cols-2 items-center gap-16 max-[768px]:grid-cols-1">
                        <div>
                            <div className="mb-8 flex items-start gap-8">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">1</div>
                                <div>
                                    <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Contexto</h2>
                                    <p className="mb-6 text-[1.6rem] leading-[1.7] text-text-secondary">A SoulUp é uma plataforma digital focada em engajamento e recompensas sustentáveis, criada a partir da integração entre a Prospera e a startup SoulPrime. Em parceria com a FIAP, a empresa propôs aos alunos o desenvolvimento de soluções reais para desafios existentes dentro da plataforma.</p>
                                    <p className="text-[1.6rem] leading-[1.7] text-text-secondary">Entre os desafios apresentados, nosso grupo escolheu desenvolver um sistema de gamificação sustentável capaz de incentivar ações ambientais dentro do aplicativo da SoulUp, utilizando mecanismos de pontuação, ranking e validação automatizada.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
                        <Card className="flex items-center justify-center p-8">
                            <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl">
                                <img src={imgFiap} alt="FIAP" className="h-full w-full object-contain"/>
                            </div>
                        </Card>
                        <Card className="flex items-center justify-center p-8">
                            <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl">
                                <img src={imgSoulup} alt="SoulUp" className="h-full w-full object-contain"/>
                            </div>
                        </Card>
                        </div>
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="grid grid-cols-2 gap-16 max-[900px]:grid-cols-1">
                        <div>
                            <div className="flex items-start gap-8">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">2</div>
                                <div>
                                    <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Desafio</h2>
                                    <p className="mb-6 text-[1.6rem] leading-[1.7] text-text-secondary">O principal objetivo do desafio era criar uma solução capaz de transformar ações sustentáveis em pontuações justas e comparáveis entre os usuários da plataforma.</p>
                                    <p className="mb-6 text-[1.6rem] leading-[1.7] text-text-secondary">Além disso, o sistema precisava resolver problemas importantes relacionados à escalabilidade, validação automática das ações, prevenção de fraudes e manutenção do engajamento contínuo dos usuários.</p>
                                    <p className="text-[1.6rem] leading-[1.7] text-text-secondary">Outro requisito do challenge era a utilização de vídeos como forma de comprovação das atividades realizadas, permitindo que as ações fossem analisadas automaticamente pela plataforma.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-8">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">3</div>
                                <div className="w-full">
                                    <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Objetivos</h2>
                                    <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                        <Card center>
                                            <FaRobot className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Validação Automatizada</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Desenvolver um sistema capaz de validar automaticamente ações sustentáveis enviadas pelos usuários.</p>
                                        </Card>

                                        <Card center>
                                            <FaChartLine className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Pontuação Justa</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Criar um modelo de pontuação baseado em impacto ambiental, dificuldade e consistência das ações.</p>
                                        </Card>

                                        <Card center>
                                            <FaLeaf className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Impacto Ambiental</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Permitir o acompanhamento do impacto ambiental gerado pelos usuários dentro da plataforma.</p>
                                        </Card>

                                        <Card center>
                                            <FaUsers className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Engajamento</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Incentivar a recorrência de participação através de missões, streaks, rankings e recompensas.</p>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="flex items-start gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">4</div>
                        <div className="w-full">
                            <h2 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Solução</h2>
                            <p className="mb-6 text-[1.6rem] leading-[1.7] text-text-secondary">A Greenlify funciona como um módulo integrado à SoulUp, no qual os usuários podem participar de missões sustentáveis dentro do aplicativo.</p>
                            <p className="mb-6 text-[1.6rem] leading-[1.7] text-text-secondary">As missões são divididas entre atividades contínuas e mensais. Após concluir uma ação, o usuário envia um vídeo como comprovação, que passa por um processo de validação automatizada utilizando inteligência artificial, análise comportamental e fingerprint de mídia. Com base no impacto ambiental da missão, na dificuldade da atividade e no resultado da validação, o sistema calcula a pontuação do usuário e atualiza o ranking da plataforma.</p>
                            <p className="mb-12 text-[1.6rem] leading-[1.7] text-text-secondary">Além disso, a solução também conta com um sistema de streak, compartilhamento de desempenho mensal, níveis de contribuição e um sistema de fingerprint que captura os uploads de fotos e vídeos enviados pelo usuário, incentivando o engajamento contínuo e reduzindo comportamentos fraudulentos dentro do aplicativo.</p>

                            <div className="grid grid-cols-5 gap-6 max-[992px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                <Card center>
                                    <FaListCheck className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Missões</h3>
                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Missões contínuas e mensais com objetivos sustentáveis e critérios específicos de execução.</p>
                                </Card>

                                <Card center>
                                    <FaRobot className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Validação Inteligente</h3>
                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Fotos e vídeos analisados por IA para verificar autenticidade e compatibilidade com a missão.</p>
                                </Card>

                                <Card center>
                                    <FaChartLine className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Pontuação</h3>
                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Pontuação baseada no impacto ambiental, dificuldade da missão e resultado da validação.</p>
                                </Card>

                                <Card center>
                                    <FaTrophy className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Ranking e Prêmios</h3>
                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Rankings mensais para conquistar bônus e benefícios dentro da plataforma.</p>
                                </Card>

                                <Card center>
                                    <FaUsers className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                    <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Engajamento</h3>
                                    <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Streak, metas mensais, rankings, recompensas e resumos compartilháveis.</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section variant="secondary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <Card center full>
                        <h3 className="mb-6 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Veja o projeto <span className="text-green-primary">funcionando</span></h3>
                        <p className="mx-auto mb-8 max-w-280 text-[1.6rem] leading-[1.7] text-text-secondary">Explore as diferentes funcionalidades da plataforma através de demonstrações interativas.</p>

                        <div className="flex justify-center gap-6 max-[480px]:flex-col">
                            <a href="/missoes" className="rounded-xl bg-green-primary px-8 py-4 text-[1.5rem] font-semibold text-bg transition duration-300 hover:-translate-y-1">Ver Missões</a>
                            <a href="/" className="rounded-xl border border-border px-8 py-4 text-[1.5rem] font-semibold text-text-main transition duration-300 hover:-translate-y-1">Ver Perfil</a>
                        </div>
                    </Card>
                </div>
            </Section>

            <Section variant="primary">
                <div className="mx-auto w-full max-w-[140rem] px-16 py-24 max-[992px]:px-12 max-[992px]:py-20 max-[480px]:px-[1.6rem] max-[480px]:py-12">
                    <div className="grid grid-cols-2 gap-16 max-[900px]:grid-cols-1">
                        <div>
                            <div className="flex items-start gap-8">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">5</div>
                                <div className="w-full">
                                    <h2 className="mb-8 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Roadmap</h2>
                                    <Roadmap />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-8">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-ultra-light text-[2rem] font-bold text-green-primary">6</div><div className="w-full">
                                    <h2 className="mb-8 text-[2.8rem] font-bold text-text-main max-[992px]:text-[2.6rem] max-[480px]:text-[2rem]">Tecnologias</h2>

                                    <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                                        <Card center>
                                            <FaReact className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">React</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Desenvolvimento da interface e criação de componentes reutilizáveis para a aplicação.</p>
                                        </Card>

                                        <Card center>
                                            <FaBolt className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Vite</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Ferramenta utilizada para configuração do projeto, desenvolvimento e build da aplicação.</p>
                                        </Card>

                                        <Card center>
                                            <FaCode className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">TypeScript</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Tipagem dos componentes, propriedades, dados e funcionalidades da aplicação.</p>
                                        </Card>

                                        <Card center>
                                            <FaCss3Alt className="mx-auto mb-5 text-[2.8rem] text-green-primary" />
                                            <h3 className="mb-3 text-[1.8rem] font-bold text-text-main">Tailwind CSS</h3>
                                            <p className="text-[1.5rem] leading-[1.7] text-text-secondary">Estilização da interface, criação do layout e desenvolvimento responsivo das páginas.</p>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}