import {formatarFonteMeio} from "@/lib/formatters";
import React from "react";

interface LeadsFonteMeioTagProps {
    fonte?: string;
    meio?: string;
}

export function LeadsFonteMeioTag({ fonte, meio }: LeadsFonteMeioTagProps) {
    if (!fonte && !meio) {
        return <span className="italic text-muted-foreground">Não informado</span>;
    }

    const textoExibido = formatarFonteMeio(fonte, meio);

    return <span className="text-card-foreground">{textoExibido}</span>;
}
