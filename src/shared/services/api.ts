const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    if (!API_URL) {
        throw new Error("A URL da API não foi configurada.");
    }

    const headers = new Headers(options.headers);

    if (
        options.body !== undefined &&
        !(options.body instanceof FormData) &&
        !headers.has("Content-Type")
    ) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const mensagem = await response.text();

        throw new ApiError(
            response.status,
            mensagem || `Erro na requisição: ${response.status}`
        );
    }

    if (response.status === 204 || response.status === 205) {
        return undefined as T;
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
    }

    return (await response.text()) as T;
}