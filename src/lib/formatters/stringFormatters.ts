/**
 * Remove acentos, caracteres especiais e normaliza o texto.
 */
export function limparTexto(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ç/gi, "c")
        .replace(/[^a-z0-9 ]/gi, "");
}

/**
 * Remove espaços duplicados e deixa tudo minúsculo.
 */
export function normalizarTexto(texto: string): string {
    return texto.trim().toLowerCase().replace(/\s+/g, "");
}
