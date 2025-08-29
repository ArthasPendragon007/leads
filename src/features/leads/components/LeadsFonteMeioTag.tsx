"use client";

import React from "react";
import {formatarFonteMeio} from "@/features/leads/utils/formatters";
import { cn } from "@/lib/utils";

interface LeadsFonteMeioTagProps {
    fonte?: string;
    meio?: string;
}

export const LeadsFonteMeioTag: React.FC<LeadsFonteMeioTagProps> = ({ fonte, meio }) => {
    const textoFormatado = formatarFonteMeio(fonte, meio);
    const textoDividido = textoFormatado.split('\n');

    return (
        <div className="flex flex-col items-center">
            {textoDividido.length > 1 ? (
                // Se houver uma quebra de linha, renderiza dois spans separados
                <>
                    <span className="text-center font-medium text-card-foreground">
                        {textoDividido[0]}
                    </span>
                    <span className="text-center font-medium text-muted-foreground">
                        {textoDividido[1]}
                    </span>
                </>
            ) : (
                // Se não houver, renderiza um único span como antes
                <span className="text-center text-sm font-medium text-card-foreground">
                    {textoFormatado}
                </span>
            )}
        </div>
    );
};