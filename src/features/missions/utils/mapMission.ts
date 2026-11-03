import type { Impacto, Dificuldade } from "../../../components/ui/Badge";
import type { DificuldadeAPI, ImpactoAPI, Missao, MissaoContinuaAPI, MissaoMensalAPI, MissaoMensalUI, UsuarioMissaoAPI } from "../types/mission";

function chave(valor: unknown): string {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();
}

const impactos: Record<string, Impacto> = {
    BAIXO: "Baixo", BAIXA: "Baixo",
    MEDIO: "Médio", MEDIA: "Médio",
    ALTO: "Alto", ALTA: "Alto",
};

const dificuldades: Record<string, Dificuldade> = {
    FACIL: "Fácil",
    MEDIO: "Média", MEDIA: "Média",
    DIFICIL: "Difícil",
};

function lerImpacto(missao: MissaoContinuaAPI): Impacto {

    const bruto = missao.pontuacao?.impacto ?? (missao as unknown as { impacto?: ImpactoAPI }).impacto;
    const valor = impactos[chave(bruto)];
    if (!valor) console.warn(`[Greenlify] Impacto desconhecido na missão ${missao.idMissao}:`, bruto);
    return valor ?? "Baixo";
}

function lerDificuldade(missao: MissaoContinuaAPI): Dificuldade {
    const bruto = missao.pontuacao?.dificuldade ?? (missao as unknown as { dificuldade?: DificuldadeAPI }).dificuldade;
    const valor = dificuldades[chave(bruto)];
    if (!valor) console.warn(`[Greenlify] Dificuldade desconhecida na missão ${missao.idMissao}:`, bruto);
    return valor ?? "Fácil";
}

export function mapMissaoContinua(missao: MissaoContinuaAPI): Missao {
    return {
        id: String(missao.idMissao),
        titulo: missao.nome,
        descricao: missao.descricao,
        impacto: lerImpacto(missao),
        dificuldade: lerDificuldade(missao),
        pontos: missao.pontuacao?.valorBase ?? 0,
        xp: missao.xp, 
        criterios: [missao.comoComprovar, missao.requisitos].filter((texto) => texto && texto.trim() !== ""),
        limiteRealizacoes: missao.limiteRealizacoes,
    };
}

export function mapMissoesMensais(missoes: MissaoMensalAPI[], progressos: UsuarioMissaoAPI[]): MissaoMensalUI[] {
    const agora = new Date();
    const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")}`;
    const progresso = new Map(progressos.map((item) => [item.missao.idMissao, item.progressoAtual]));

    return missoes
        .filter((missao) => String(missao.dataFim).slice(0, 10) >= hoje)
        .map((missao) => ({
            id: String(missao.idMissao),
            titulo: missao.nome,
            progresso: progresso.get(missao.idMissao) ?? 0,
            meta: missao.meta,
        }));
}