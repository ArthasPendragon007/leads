// src/components/leads/LeadsFonteMeioTag.tsx
import {formatarFonteMeio} from "@/lib/formatters";
import React from "react";

interface LeadsFonteMeioTagProps {
    fonte?: string;
    meio?: string;
}

export function LeadsFonteMeioTag({ fonte, meio }: LeadsFonteMeioTagProps) {
    if (!fonte && !meio) {
        return <span className="italic text-gray-400">Não informado</span>;
    }

    const textoExibido = formatarFonteMeio(fonte, meio);

    return <span className="text-gray-900">{textoExibido}</span>;
}
