const API_URL = import.meta.env.VITE_API_URL;

/** Erro lançado quando o back-end responde com status fora de 2xx. */
export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

/**
 * O back-end abre uma conexão nova com o Oracle a cada consulta e o usuário do banco tem limite de sessões
 * (ORA-02391). Para não estourar o limite, o front faz no máximo MAX_SIMULTANEAS requisições ao mesmo tempo;
 * as demais esperam na fila. Pode ser removido quando o back-end passar a usar pool de conexões.
 */
const MAX_SIMULTANEAS = 2;
let emAndamento = 0;
const fila: (() => void)[] = [];

async function esperarVez(): Promise<void> {
    if (emAndamento < MAX_SIMULTANEAS) {
        emAndamento++;
        return;
    }

    // A vaga é repassada diretamente por liberarVez(), sem decrementar o contador.
    await new Promise<void>((resolve) => fila.push(resolve));
}

function liberarVez() {
    const proximo = fila.shift();

    if (proximo) {
        proximo();
    } else {
        emAndamento--;
    }
}

/**
 * Cliente HTTP único do front. Todos os services passam por aqui.
 * - O Java devolve JSON nas consultas e texto puro em alguns POST/PUT (ex.: "Usuário cadastrado com sucesso!").
 * - Erros do Java chegam como texto no corpo; ele vira a mensagem do ApiError.
 */
export async function api<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> {
    if (!API_URL) {
        throw new Error("VITE_API_URL não configurada. Copie .env.example para .env.");
    }

    await esperarVez();

    let response: Response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                Accept: "application/json",
                // FormData (upload de vídeo): o navegador define o Content-Type com o boundary; não sobrescrever.
                ...(options?.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
                ...options?.headers,
            },
        });
    } finally {
        liberarVez();
    }

    if (!response.ok) {
        const mensagem = await response.text().catch(() => "");
        throw new ApiError(response.status, mensagem || `Erro HTTP: ${response.status}`);
    }

    // 204 No Content (DELETE/PUT sem corpo): não há o que converter.
    if (response.status === 204) {
        return undefined as T;
    }

    const tipo = response.headers.get("content-type") ?? "";

    if (tipo.includes("application/json")) {
        return response.json() as Promise<T>;
    }

    return response.text() as Promise<T>;
}
