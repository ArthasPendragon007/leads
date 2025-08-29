import { normalizarTexto } from "@/lib/formatters/stringFormatters";

export function formatarFonteMeio(fonte?: string, meio?: string): string {
    if (!fonte && !meio) return "";

    const saoIguais = fonte && meio && normalizarTexto(fonte) === normalizarTexto(meio);

    if (saoIguais) return fonte;

    // Se houver fonte e meio, insere uma quebra de linha entre eles
    return fonte && meio ? `${fonte}\n(${meio})` : fonte || meio || "";
}