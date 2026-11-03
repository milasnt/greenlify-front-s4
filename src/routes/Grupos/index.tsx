import { FaArrowRight, FaLeaf, FaMedal, FaTrophy, FaUsers } from "react-icons/fa6";
import Grid from "../../components/layout/Grid";
import Reveal from "../../components/layout/Reveal";
import Section from "../../components/layout/Section";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Feedback from "../../components/ui/Feedback";
import IconBox from "../../components/ui/IconBox";
import ColetarSelos from "../../features/badges/components/ColetarSelos";
import { useGrupos, useResumoGrupo } from "../../features/groups/hooks/useGroups";
import { usePerfil } from "../../features/profile/hooks/useProfile";

const tones = ["green", "purple", "night"] as const;

const coverStyles = {
    green: "bg-green-lighter text-green-primary",
    purple: "bg-purple-lighter text-purple-primary",
    night: "bg-night text-green-light",
};

export default function Grupos() {
    const { grupos, carregando, erro } = useGrupos();
    const { usuario } = usePerfil();
    const meuGrupo = usuario?.grupo ?? null;
    const { resumo, carregando: carregandoResumo, erro: erroResumo } = useResumoGrupo(meuGrupo?.idGrupo ?? 0);

    return (
        <Section size="sm">
            <div className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                    <IconBox icon={<FaUsers />} size="lg" />

                    <div className="min-w-0">
                        <h2 className="font-heading text-xl font-extrabold tracking-tight text-text-main sm:text-2xl">Meu grupo</h2>
                        <p className="text-sm text-text-secondary">Acompanhe os integrantes e as conquistas da sua comunidade.</p>
                    </div>
                </div>

                {!meuGrupo ? (
                    <Feedback tipo="vazio" mensagem="Você ainda não faz parte de um grupo." />
                ) : carregandoResumo ? (
                    <Card hover={false} className="h-48" children={undefined} />
                ) : erroResumo || !resumo ? (
                    <Feedback tipo="erro" mensagem={erroResumo ?? "Não foi possível carregar seu grupo."} />
                ) : (
                    <article className="overflow-hidden rounded-3xl border border-border bg-bg-card shadow-custom-sm">
                        <div className="bg-green-lighter/70 p-5 sm:p-6">
                            <Badge variant="green" className="mb-3 bg-white/70">
                                <FaLeaf aria-hidden /> Seu grupo
                            </Badge>

                            <h3 className="wrap-break-word font-heading text-xl font-extrabold tracking-tight text-text-main sm:text-2xl">
                                {meuGrupo.nome}
                            </h3>

                            <p className="mt-1 text-sm text-text-secondary">
                                As conquistas individuais contribuem para o resultado coletivo.
                            </p>
                        </div>

                        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                            <div className="rounded-2xl bg-bg-soft p-4">
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <FaUsers aria-hidden />
                                    Integrantes
                                </div>
                                <p className="mt-2 font-heading text-2xl font-extrabold text-text-main">{resumo.integrantes.length}</p>
                            </div>

                            <div className="rounded-2xl bg-green-lighter p-4">
                                <div className="flex items-center gap-2 text-sm text-green-dark">
                                    <FaLeaf aria-hidden />
                                    Selos Verdes
                                </div>
                                <p className="mt-2 font-heading text-2xl font-extrabold text-green-dark">{resumo.totalSelos}</p>
                                <p className="mt-1 text-xs text-green-dark/80">
                                    {resumo.tiposColetados} de {resumo.totalTipos} tipos coletados
                                </p>
                            </div>
                        </div>

                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                            <h4 className="mb-4 font-heading font-bold text-text-main">Integrantes do grupo</h4>

                            {resumo.integrantes.length === 0 ? (
                                <p className="text-sm text-text-secondary">Este grupo ainda não tem integrantes.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {resumo.integrantes.map((integrante) => (
                                        <li
                                            key={integrante.idUsuario}
                                            className="flex items-center gap-3 rounded-2xl border border-border p-3"
                                        >
                                            <IconBox name={integrante.nome} />

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-heading text-sm font-bold text-text-main">{integrante.nome}</p>
                                                <p className="text-xs text-text-secondary">Posição {integrante.posicao}</p>
                                            </div>

                                            <span className="shrink-0 text-xs font-semibold text-green-primary sm:text-sm">
                                                {integrante.selos} selos
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {resumo.selos.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="mb-3 flex items-center gap-2 font-heading font-bold text-text-main">
                                        <FaMedal className="text-green-primary" aria-hidden />
                                        Selos conquistados
                                    </h4>

                                    <ul className="flex flex-wrap gap-2">
                                        {resumo.selos.map((selo) => (
                                            <li key={selo.idSelo}>
                                                <Badge variant="green" className="px-3 py-1.5 text-sm">
                                                    {selo.nome} · {selo.quantidade}
                                                </Badge>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-border bg-bg-soft px-5 py-4 sm:px-6">
                            <ColetarSelos
                                renderBotao={(abrir) => (
                                    <Button onClick={abrir} variant="secondary" size="sm" className="max-sm:w-full">
                                        Coletar mais Selos Verdes
                                        <FaArrowRight aria-hidden />
                                    </Button>
                                )}
                            />
                        </div>
                    </article>
                )}
            </div>

            <p className="mb-6 flex items-center gap-2 text-sm text-text-secondary">
                <FaTrophy aria-hidden className="shrink-0 text-green-primary" />
                Ranking organizado pelo total de Selos Verdes.
            </p>

            {carregando ? (
                <Card hover={false} className="h-64" children={undefined} />
            ) : erro ? (
                <Feedback tipo="erro" mensagem={erro} />
            ) : grupos.length === 0 ? (
                <Feedback tipo="vazio" mensagem="Nenhum grupo cadastrado até o momento." />
            ) : (
                <Grid>
                    {grupos.map((grupo, index) => {
                        const tone = tones[index % tones.length]!;

                        return (
                            <Reveal key={grupo.id} className="h-full">
                                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-card shadow-custom-sm transition duration-300 hover:-translate-y-1 hover:border-green-primary/40 hover:shadow-custom-md">
                                    <div
                                        className={`flex h-32 items-center justify-center sm:h-40 ${coverStyles[tone]}`}
                                        aria-hidden
                                    >
                                        <FaUsers className="text-5xl" />
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <Badge variant="green">
                                                <FaTrophy aria-hidden /> {`#${index + 1}`}
                                            </Badge>

                                            <span className="text-sm text-text-secondary">Grupo</span>
                                        </div>

                                        <h3 className="mb-5 flex-1 wrap-break-word font-heading text-lg font-bold text-text-main sm:text-xl">
                                            {grupo.nome}
                                        </h3>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl bg-bg-soft p-3">
                                                <div className="mb-1 flex items-center gap-2 text-text-secondary">
                                                    <FaUsers aria-hidden />
                                                    <span className="text-xs">Integrantes</span>
                                                </div>
                                                <p className="font-heading text-lg font-extrabold text-text-main">{grupo.membros}</p>
                                            </div>

                                            <div className="rounded-2xl bg-green-lighter p-3">
                                                <div className="mb-1 flex items-center gap-2 text-green-dark">
                                                    <FaLeaf aria-hidden />
                                                    <span className="text-xs">Selos Verdes</span>
                                                </div>
                                                <p className="font-heading text-lg font-extrabold text-green-dark">{grupo.selosVerdes ?? "—"}</p>
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
    );
}
