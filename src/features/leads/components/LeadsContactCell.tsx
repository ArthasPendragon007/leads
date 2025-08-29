"use client";

import { LeadsAvatar } from "@/features/leads/components/LeadsAvatar";
import { Lead } from "@/entities/lead";
import { formatarCpfCnpj, formatarTelefone } from "@/lib/formatters/stringFormatters";
import React from "react";
import { EditableField } from "@/components/shared/EditableField";

interface LeadsContactCellProps {
    lead: Lead;
    onUpdate: (campo: keyof Lead, valor: string) => Promise<void>;
    isPending: boolean;
}

export const LeadsContactCell: React.FC<LeadsContactCellProps> = ({ lead, onUpdate, isPending}) => {
    const salvarCampo = (campo: keyof Lead) => async (newValue: string) => {
        await onUpdate(campo, newValue);
    };

    return (
        <div className="flex items-center space-x-2 text-left pl-2">
            <LeadsAvatar nome={lead.nome} interesse={lead.interesse} />
            <div className="space-y-0">
                {lead.nome?.trim() && (
                    <EditableField
                        value={lead.nome}
                        onSave={salvarCampo("nome")}
                        placeholder="Não informado"
                        variant="minimal"
                        isPending={isPending}
                        className="font-semibold"
                    />
                )}
                {lead.cnpj?.trim() && (
                    <EditableField
                        value={formatarCpfCnpj(lead.cnpj)}
                        onSave={salvarCampo("cnpj")}
                        placeholder="Não informado"
                        variant="minimal"
                        isPending={isPending}
                    />
                )}
                {lead.telefone?.trim() && (
                    <EditableField
                        value={formatarTelefone(lead.telefone)}
                        onSave={salvarCampo("telefone")}
                        placeholder="Não informado"
                        variant="minimal"
                        isPending={isPending}
                    />
                )}
                {lead.email?.trim() && (
                    <EditableField
                        value={lead.email}
                        onSave={salvarCampo("email")}
                        placeholder="Não informado"
                        variant="minimal"
                        isPending={isPending}
                    />
                )}
            </div>
        </div>
    );
};