export function numero(valor: number): string {
    return valor.toLocaleString("pt-BR");
}

export function traco(valor: number | null | undefined): string {
    return valor === null || valor === undefined ? "—" : numero(valor);
}
