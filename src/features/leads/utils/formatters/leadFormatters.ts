import { normalizarTexto } from "@/lib/formatters/stringFormatters";
import React from "react";

export function formatarFonteMeio(fonte?: string, meio?: string): string {
    if (!fonte && !meio) return "";



    const saoIguais = fonte && meio && normalizarTexto(fonte) === normalizarTexto(meio);

    if (saoIguais) return fonte;

    return fonte && meio ? `${fonte} (${meio})` : fonte || meio || "";
}
