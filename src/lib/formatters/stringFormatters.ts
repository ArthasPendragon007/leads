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

/**
 * Formata uma string de telefone para os padrões brasileiros.
 * Lida com DDI, DDD, 9º dígito e números de 8 e 9 dígitos.
 * @param phoneNumber A string do telefone a ser formatada.
 * @returns A string do telefone formatada.
 */
export function formatarTelefone(phoneNumber: string): string {

        const cleaned = phoneNumber.replace(/\D/g, '');

        // Verifica se o número tem o DDI do Brasil (+55)
        if (cleaned.length === 13 && cleaned.startsWith('55')) {
            // Exemplo: 5511988887777 -> (11) 98888-7777
            const formatted = cleaned.slice(2);
            return `(${formatted.substring(0, 2)}) ${formatted.substring(2, 7)}-${formatted.substring(7, 11)}`;
        }

        // Padrão (XX) 9XXXX-XXXX (11 dígitos, DDD e 9º dígito)
        const elevenDigits = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (elevenDigits) {
            return `(${elevenDigits[1]}) ${elevenDigits[2]}-${elevenDigits[3]}`;
        }

        // Padrão (XX) XXXX-XXXX (10 dígitos, DDD sem 9º dígito)
        const tenDigits = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (tenDigits) {
            return `(${tenDigits[1]}) ${tenDigits[2]}-${tenDigits[3]}`;
        }

        // Padrão XXXXX-XXXX (9 dígitos, sem DDD)
        const nineDigits = cleaned.match(/^(\d{5})(\d{4})$/);
        if (nineDigits) {
            return `${nineDigits[1]}-${nineDigits[2]}`;
        }

        // Padrão XXXX-XXXX (8 dígitos, sem DDD e sem 9º dígito)
        const eightDigits = cleaned.match(/^(\d{4})(\d{4})$/);
        if (eightDigits) {
            return `${eightDigits[1]}-${eightDigits[2]}`;
        }

        // Se nenhum padrão for correspondido (ex: número incompleto), retorna a string original limpa.
        return cleaned;
    }

/**
 * Formata CPF ou CNPJ baseado no número de dígitos.
 */
export function formatarCpfCnpj(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, "");

    if (apenasNumeros.length === 11) {
        return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    if (apenasNumeros.length === 14) {
        return apenasNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

    return valor;
}
