export function limparTexto(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ç/g, "c")
        .replace(/Ç/g, "C")
        .replace(/[^a-zA-Z0-9 ]/g, "");
}

export function formatarCnpj(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
        return apenasNumeros.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }

    if (apenasNumeros.length === 14) {
        return apenasNumeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }

    return valor;
}
