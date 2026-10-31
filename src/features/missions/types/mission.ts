import type { Impacto, Dificuldade } from "../../../components/ui/Badge";
import type { UsuarioResumoAPI } from "../../auth/types/auth";

export type CategoriaAPI =
    | "RECICLAGEM" | "PLANTIO" | "AGUA" | "ENERGIA"
    | "MOBILIDADE" | "CONSUMO_CONSCIENTE" | "IMPACTO_SOCIAL" | "GERAL";

export type ImpactoAPI = "BAIXO" | "MEDIO" | "ALTO";
export type DificuldadeAPI = "FACIL" | "MEDIO" | "DIFICIL";
export type TipoMetricaAPI = "KM" | "M3" | "KWH" | "KG_CO2" | "ITENS_RECICLADOS";

export interface PontuacaoAPI {
    idPontuacao: number;
    impacto: ImpactoAPI;
    dificuldade: DificuldadeAPI;
    valorBase: number;
}

/** MissaoContinuaCompletaResponseDTO */
export interface MissaoContinuaAPI {
    idMissao: number;
    nome: string;
    descricao: string;
    comoComprovar: string;
    requisitos: string;
    categoria: CategoriaAPI;
    limiteRealizacoes: number;
    tipoMetrica: TipoMetricaAPI;
    valorMetrica: number;
    pontuacao: PontuacaoAPI;
}

/** MissaoMensalCompletaResponseDTO */
export interface MissaoMensalAPI {
    idMissao: number;
    nome: string;
    descricao: string;
    comoComprovar: string;
    requisitos: string;
    categoria: CategoriaAPI;
    meta: number;
    dataInicio: string;
    dataFim: string;
}

/** UsuarioMissaoResponseDTO */
export interface UsuarioMissaoAPI {
    idUsuarioMissao: number;
    tentativas: number;
    progressoAtual: number;
    usuario: UsuarioResumoAPI;
    missao: { idMissao: number; nome: string };
}

/** ResumoMissoesResponseDTO */
export interface ResumoTipoMissoesAPI {
    total: number;
    emAndamento: number;
    concluidas: number;
    percentualConcluido: number;
    pontosMaximos: number;
    diasParaExpirar: number;
}

export interface ResumoMissoesAPI {
    idUsuario: number;
    continuas: ResumoTipoMissoesAPI;
    mensais: ResumoTipoMissoesAPI;
}

/** Formato que os componentes já esperam */

export interface Missao {
    id: string;
    titulo: string;
    descricao: string;
    impacto: Impacto;
    dificuldade: Dificuldade;
    pontos: number;
    criterios: string[];
    limiteRealizacoes: number;
}

export interface MissaoMensalUI {
    id: string;
    titulo: string;
    progresso: number;
    meta: number;
}