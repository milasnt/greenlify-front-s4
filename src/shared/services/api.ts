const API_URL = import.meta.env.VITE_API_URL;

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
    await new Promise<void>((resolve) => fila.push(resolve));
}

function liberarVez(): void {
    const proximo = fila.shift();

    if (proximo) {
        proximo();
    } else {
        emAndamento--;
    }
}

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    if (!API_URL) {
        throw new Error("VITE_API_URL não configurada. Copie .env.example para .env.");
    }

    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (
        options.body !== undefined &&
        !(options.body instanceof FormData) &&
        !headers.has("Content-Type")
    ) {
        headers.set("Content-Type", "application/json");
    }

    await esperarVez();

    let response: Response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });
    } finally {
        liberarVez();
    }

    if (!response.ok) {
        const mensagem = await response.text().catch(() => "");

        throw new ApiError(
            response.status,
            mensagem || `Erro na requisição: ${response.status}`
        );
    }

    if (response.status === 204 || response.status === 205) {
        return undefined as T;
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        return (await response.json()) as T;
    }

    return (await response.text()) as T;
}
