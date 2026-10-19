import { useState } from "react";
import { FaUsers, FaLeaf, FaTrophy } from "react-icons/fa6";

import capaPraia from "../../assets/img/grupos/group-praia.jpg";
import capaHorta from "../../assets/img/grupos/group-horta.jpg";
import capaBike from "../../assets/img/grupos/group-bike.jpg";
import CtaBanner from "../../components/layout/CtaBanner";
import Grid from "../../components/layout/Grid";
import Hero from "../../components/layout/Hero";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import Toast, { type ToastType } from "../../components/ui/Toast";

type Grupo = {
  id: number;
  nome: string;
  membros: number;
  selosVerdes: number;
  descricao: string;
  capa?: {
    src: string;
    alt: string;
  };
  tone: string;
};

export const grupos: Grupo[] = [
  {
    id: 1,
    nome: "Eco Exploradores",
    membros: 10,
    selosVerdes: 22,
    descricao: "Uma comunidade que reúne pessoas em torno de ações sustentáveis.",
    capa: {
      src: capaPraia,
      alt: "Praia com pessoas participando de uma ação ambiental",
    },
    tone: "green",
  },
  {
    id: 2,
    nome: "Planeta em Ação",
    membros: 6,
    selosVerdes: 14,
    descricao: "Integrantes que contribuem individualmente para um planeta mais sustentável.",
    capa: {
      src: capaHorta,
      alt: "Horta comunitária com plantas e canteiros",
    },
    tone: "purple",
  },
  {
    id: 3,
    nome: "Verde em Movimento",
    membros: 4,
    selosVerdes: 11,
    descricao: "Um grupo que reúne usuários comprometidos com a sustentabilidade.",
    capa: {
      src: capaBike,
      alt: "Ciclistas em uma via arborizada",
    },
    tone: "night",
  },
  {
    id: 4,
    nome: "Impacto Sustentável",
    membros: 5,
    selosVerdes: 9,
    descricao: "Uma comunidade que soma as contribuições individuais de seus integrantes.",
    tone: "green",
  },
  {
    id: 5,
    nome: "Conexão Verde",
    membros: 8,
    selosVerdes: 17,
    descricao: "Usuários conectados pelo interesse em participar da comunidade SoulUp.",
    tone: "purple",
  },
  {
    id: 6,
    nome: "Geração Futuro",
    membros: 9,
    selosVerdes: 9,
    descricao: "Um grupo que reúne pessoas interessadas em contribuir para um futuro sustentável.",
    tone: "night",
  },
];

export default function Grupos() {
  const [participando, setParticipando] = useState<Set<number>>(new Set());
  const [aviso, setAviso] = useState<{
    mensagem: string;
    tipo: ToastType;
  } | null>(null);

  const gruposOrdenados = [...grupos].sort(
    (a, b) => b.selosVerdes - a.selosVerdes
  );

  function alternarParticipacao(id: number, nome: string) {
    const jaParticipa = participando.has(id);
    const novaParticipacao = new Set(participando);

    if (jaParticipa) {
      novaParticipacao.delete(id);
      setAviso({
        mensagem: `Você saiu do grupo ${nome}. (Demonstração)`,
        tipo: "info",
      });
    } else {
      novaParticipacao.add(id);
      setAviso({
        mensagem: `Você entrou no grupo ${nome}! (Demonstração)`,
        tipo: "success",
      });
    }

    setParticipando(novaParticipacao);
  }

  return (
    <>
        <Hero
            badge={<><FaLeaf />Grupos</>}
            title={<>Meu <span className="textGradient">Perfil</span></>}
            text="Conheça grupos da comunidade e acompanhe a soma dos Selos Verdes acumulados por seus integrantes."
        />

      <Section size="sm">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <FaTrophy aria-hidden="true" className="text-green-600" />
          <span>Ranking organizado pelo total de Selos Verdes.</span>
        </div>

        <Grid>
          {gruposOrdenados.map((grupo, index) => {
            const entrou = participando.has(grupo.id);

            return (
              <Reveal key={grupo.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                  {grupo.capa ? (
                    <img
                      src={grupo.capa.src}
                      alt={grupo.capa.alt}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-44 items-center justify-center ${
                        grupo.tone === "green"
                          ? "bg-green-100 dark:bg-green-950"
                          : grupo.tone === "purple"
                            ? "bg-purple-100 dark:bg-purple-950"
                            : "bg-slate-200 dark:bg-slate-800"
                      }`}
                      aria-hidden="true"
                    >
                      <FaUsers className="text-5xl text-green-700 dark:text-green-300" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                        <FaTrophy aria-hidden="true" />
                        {`#${index + 1}`}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Grupo
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {grupo.nome}
                    </h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {grupo.descricao}
                    </p>

                    <div className="mb-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                        <div className="mb-1 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <FaUsers aria-hidden="true" />
                          <span className="text-xs">Integrantes</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {grupo.membros}
                        </p>
                      </div>

                      <div className="rounded-xl bg-green-50 p-3 dark:bg-green-950/50">
                        <div className="mb-1 flex items-center gap-2 text-green-700 dark:text-green-300">
                          <FaLeaf aria-hidden="true" />
                          <span className="text-xs">Selos Verdes</span>
                        </div>
                        <p className="text-lg font-bold text-green-800 dark:text-green-200">
                          {grupo.selosVerdes}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => alternarParticipacao(grupo.id, grupo.nome)}
                      variant={entrou ? "secondary" : "primary"}
                    >
                      {entrou ? "Sair do grupo" : "Participar do grupo"}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Grid>

        <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">
          Os grupos, integrantes e totais exibidos nesta versão são dados de
          demonstração.
        </p>
      </Section>

      <CtaBanner
        title="Seus Selos Verdes também contam"
        text="Complete missões para ganhar pontos e escolha se deseja trocá-los por Selos Verdes. Os selos acumulados pelos integrantes contribuem para a posição de seus grupos.">
          <Button href="/rankings" variant="primary">
            Ver ranking
          </Button>
        </CtaBanner>

        <Toast message={aviso?.mensagem ?? null} type={aviso?.tipo} onClose={() => setAviso(null)} />
    </>
  );
}