// @/components/leads/LeadsTableRow.tsx
"use client";

import { TableCell } from "@/components/ui/table";
import { Lead } from "@/entities/lead";
import React, { useState, useEffect } from "react";
import { useUpdateLead } from "@/features/leads/hooks/useUpdateLead";
import { LeadsFonteMeioTag } from "@/features/leads/components/LeadsFonteMeioTag";
import { LeadsParceiroField } from "@/features/leads/components/LeadsParceiroField";
import { LeadsContactCell } from "./LeadsContactCell";
import { LeadsInteresseCell } from "./LeadsInteresseCell";
import { LeadsAcoesCell } from "./LeadsAcoesCell";
import { motion } from "framer-motion";

interface DynamicColumn {
    id: string;
    label: string;
    width: number;
    minWidth?: number;
    alignment?: string;
}

interface LeadsTableRowProps {
    lead: Lead;
    dynamicColumns: DynamicColumn[];
}

const LeadsTableRow: React.FC<LeadsTableRowProps> = ({
                                                         lead,
                                                         dynamicColumns,
                                                     }) => {
    // Definimos um callback para fechar a edição
    const fecharEdicaoParceiro = () => setEditandoParceiro(false);

    const { mutate, isPending, isError } = useUpdateLead({
        onSuccess: fecharEdicaoParceiro,
    });

    const [editandoParceiro, setEditandoParceiro] = useState(false);
    const [valorParceiro, setValorParceiro] = useState(lead.parceiro || "");

    useEffect(() => {
        setValorParceiro(lead.parceiro || "");
    }, [lead.parceiro]);

    const handleChange = (campo: keyof Lead, valor: any) => {
        const leadAtualizado = { ...lead, [campo]: valor };
        mutate({ oldData: lead, newData: leadAtualizado });
    };

    const salvarParceiro = () => {
        handleChange("parceiro", valorParceiro);
    };

    const handleToggleStatus = (newStatus: "concluido" | "pendente") => {
        const leadAtualizado = { ...lead, status: newStatus };
        mutate({ oldData: lead, newData: leadAtualizado });
    };

    const renderCampo = (valor?: string) => {
        if (!valor?.trim()) {
            return <span className="italic text-muted-foreground">Não informado</span>;
        }
        return <span className="text-card-foreground">{valor}</span>;
    };

    const columnContent = {
        contato: <LeadsContactCell lead={lead} />,
        origem: <LeadsFonteMeioTag fonte={lead.fonte} meio={lead.meio} />,
        anuncio: <span>{renderCampo(lead.anuncio)}</span>,
        parceiro: (
            <div className="flex justify-center items-center">
                <LeadsParceiroField
                    interesse={lead.interesse}
                    valorParceiro={valorParceiro}
                    setValorParceiro={setValorParceiro}
                    editandoParceiro={editandoParceiro}
                    setEditandoParceiro={setEditandoParceiro}
                    salvarParceiro={salvarParceiro}
                    isPending={isPending}
                    isError={isError}
                />
            </div>
        ),
        interesse: <LeadsInteresseCell lead={lead} onUpdate={handleChange} disabled={isPending} />,
        data: renderCampo(
            lead.dataHora
                ? new Date(lead.dataHora).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })
                : ""
        ),
        acoes: (
            <LeadsAcoesCell
                lead={lead}
                onToggleStatus={handleToggleStatus}
                disabled={isPending}
            />
        ),
    };

    return (
        <motion.tr
            key={lead.id}
            layout
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="border-b border-border align-middle hover:bg-muted transition-colors duration-200"
        >
            {dynamicColumns.map(col => (
                <TableCell
                    key={col.id}
                    className={`py-4 ${col.id === 'contato' ? 'pl-6' : 'text-center'} whitespace-nowrap`}
                    style={{
                        width: `${col.width}%`,
                        minWidth: col.minWidth || 120
                    }}
                >
                    {columnContent[col.id as keyof typeof columnContent]}
                </TableCell>
            ))}
        </motion.tr>
    );
};

export default LeadsTableRow;