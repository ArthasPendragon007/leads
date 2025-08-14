/**
 * Remove acentos, caracteres especiais e normaliza o texto.
 */
export function limparTexto(texto: string): string {
    return texto
        .normalize("NFD")                    // Separa acentos
        .replace(/[\u0300-\u036f]/g, "")     // Remove acentos
        .replace(/ç/gi, "c")                 // Trata ç/Ç
        .replace(/[^a-z0-9 ]/gi, "");        // Remove caracteres especiais
}

/**
 * Remove espaços duplicados e deixa tudo minúsculo.
 */
export function normalizarTexto(texto: string): string {
    return texto.trim().toLowerCase().replace(/\s+/g, "");
}
