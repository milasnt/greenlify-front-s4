import { FaUsers, FaLeaf, FaTrophy, FaMedal, FaRegCircleUser, FaArrowRight } from "react-icons/fa6";
import Grid from "../../components/layout/Grid";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Feedback from "../../components/ui/Feedback";
import Button from "../../components/ui/Button";
import ColetarSelos from "../../features/badges/components/ColetarSelos";
import { useGrupos, useResumoGrupo } from "../../features/groups/hooks/useGroups";
import { usePerfil } from "../../features/profile/hooks/useProfile";

const tones = ["green", "purple", "night"];

export default function Grupos() {
  const { grupos, carregando, erro } = useGrupos();
  const { usuario } = usePerfil();
  const meuGrupo = usuario?.grupo ?? null;
  const { resumo, carregando: carregandoResumo, erro: erroResumo } = useResumoGrupo(meuGrupo?.idGrupo ?? 0);

  return (
    <>
      <Section size="sm">
        <div className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
              <FaUsers className="text-xl" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meu grupo</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acompanhe os integrantes e as conquistas da sua comunidade.</p>
            </div>
          </div>

          {!meuGrupo ? (
            <Feedback tipo="vazio" mensagem="Você ainda não faz parte de um grupo." />
          ) : carregandoResumo ? (
            <Card hover={false} className="h-48" children={undefined} />
          ) : erroResumo || !resumo ? (
            <Feedback tipo="erro" mensagem={erroResumo ?? "Não foi possível carregar seu grupo."} />
          ) : (
            <article className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm dark:border-green-900 dark:bg-gray-900">
              <div className="bg-green-50 p-6 dark:bg-green-950/40">
                <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                  <FaLeaf aria-hidden="true" />
                  Seu grupo
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{meuGrupo.nome}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">As conquistas individuais contribuem para o resultado coletivo.</p>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaUsers aria-hidden="true" />
                    Integrantes
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{resumo.integrantes.length}</p>
                </div>
                <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/40">
                  <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                    <FaLeaf aria-hidden="true" />
                    Selos Verdes
                  </div>
                  <p className="mt-2 text-2xl font-bold text-green-800 dark:text-green-200">{resumo.totalSelos}</p>
                  <p className="mt-1 text-xs text-green-700 dark:text-green-300">{resumo.tiposColetados} de {resumo.totalTipos} tipos coletados</p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <h4 className="mb-4 font-bold text-gray-900 dark:text-white">Integrantes do grupo</h4>
                {resumo.integrantes.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Este grupo ainda não tem integrantes.</p>
                ) : (
                  <div className="space-y-3">
                    {resumo.integrantes.map((integrante) => (
                      <div key={integrante.idUsuario} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                          <FaRegCircleUser aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900 dark:text-white">{integrante.nome}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Posição {integrante.posicao}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-green-700 dark:text-green-300">{integrante.selos} selos</span>
                      </div>
                    ))}
                  </div>
                )}

                {resumo.selos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                      <FaMedal className="text-green-600" aria-hidden="true" />
                      Selos conquistados
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {resumo.selos.map((selo) => (
                        <span key={selo.idSelo} className="rounded-full bg-green-50 px-3 py-2 text-sm font-medium text-green-800 dark:bg-green-950 dark:text-green-200">
                          {selo.nome} · {selo.quantidade}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 border-t border-gray-100 px-5 pb-5 pt-5 dark:border-gray-800">
                <ColetarSelos variant="primary" full renderBotao={(abrir) => (
                  <Button onClick={abrir} variant="secondary" size="sm">
                      Coletar mais Selos Verdes
                    <FaArrowRight aria-hidden="true" />
                  </Button>
                  )}
                />
              </div>
            </article>
          )}
        </div>

        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <FaTrophy aria-hidden="true" className="text-green-600" />
          <span>Ranking organizado pelo total de Selos Verdes.</span>
        </div>

        {carregando ? (
          <Card hover={false} className="h-64" children={undefined} />
        ) : erro ? (
          <Feedback tipo="erro" mensagem={erro} />
        ) : grupos.length === 0 ? (
          <Feedback tipo="vazio" mensagem="Nenhum grupo cadastrado até o momento." />
        ) : (
          <Grid>
            {grupos.map((grupo, index) => {
              const tone = tones[index % tones.length];

              return (
                <Reveal key={grupo.id}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                    <div className={`flex h-44 items-center justify-center ${tone === "green" ? "bg-green-100 dark:bg-green-950" : tone === "purple" ? "bg-purple-100 dark:bg-purple-950" : "bg-slate-200 dark:bg-slate-800"}`} aria-hidden="true">
                      <FaUsers className="text-5xl text-green-700 dark:text-green-300" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                          <FaTrophy aria-hidden="true" />
                          {`#${index + 1}`}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Grupo</span>
                      </div>

                      <h3 className="mb-5 flex-1 text-xl font-bold text-gray-900 dark:text-white">{grupo.nome}</h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                          <div className="mb-1 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <FaUsers aria-hidden="true" />
                            <span className="text-xs">Integrantes</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{grupo.membros}</p>
                        </div>
                        <div className="rounded-xl bg-green-50 p-3 dark:bg-green-950/50">
                          <div className="mb-1 flex items-center gap-2 text-green-700 dark:text-green-300">
                            <FaLeaf aria-hidden="true" />
                            <span className="text-xs">Selos Verdes</span>
                          </div>
                          <p className="text-lg font-bold text-green-800 dark:text-green-200">{grupo.selosVerdes ?? "—"}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </Grid>
        )}
      </Section>
    </>
  );
}