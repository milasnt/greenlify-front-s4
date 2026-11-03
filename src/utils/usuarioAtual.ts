/**
 * O back-end tem POST /usuarios/login, mas o Greenlify ainda não possui tela de login
 * nem token. Até existir, o usuário usado pelo front vem de VITE_USUARIO_ID.
 */
export function obterIdUsuarioAtual(): number {
    const id = Number(import.meta.env.VITE_USUARIO_ID);

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("VITE_USUARIO_ID não configurada. Defina o id de um usuário existente no .env.");
    }

    return id;
}
