"use client"

import { EditableField } from "@/components/shared/EditableField";
import React from "react";

interface LeadsParceiroFieldProps {
    interesse?: string;
    valorParceiro: string;
    onSave: (newValue: string) => Promise<void>; // Prop onSave é agora uma Promise
    isPending: boolean;
}

export function LeadsParceiroField({
                                       interesse,
                                       valorParceiro,
                                       onSave,
                                        isPending,
                                   }: LeadsParceiroFieldProps) {
    const interesseLower = interesse?.toLowerCase();

    if (interesseLower === "revenda") {
        return (
            <div
                className="w-[210px] h-9 flex items-center border border-dashed border-muted-foreground rounded-md px-2 text-sm text-muted-foreground italic"
                title="Não se aplica para revenda"
            >
                Não se aplica para revenda
            </div>
        );
    }

    return (
        <EditableField
            value={valorParceiro}
            onSave={onSave}
            placeholder="Digite aqui..."
            inputType="textarea"
            className="max-w-70"
            isPending={isPending}
        />
    );
}