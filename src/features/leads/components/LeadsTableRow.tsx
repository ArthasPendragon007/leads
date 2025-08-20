"use client";

import React, {ReactNode, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {TableCell} from "@/components/ui/table";
import {Lead} from "@/entities/lead";
import {useUpdateLead} from "@/features/leads/hooks/useUpdateLead";
import {LeadsFonteMeioTag} from "@/features/leads/components/LeadsFonteMeioTag";
import {LeadsParceiroField} from "@/features/leads/components/LeadsParceiroField";
import {LeadsContactCell} from "./LeadsContactCell";
import {LeadsInteresseCell} from "./LeadsInteresseCell";
import {LeadsAcoesCell} from "./LeadsAcoesCell";
import {ColumnId, DynamicColumn} from "@/features/leads/hooks/useLeadsColumns";

interface LeadsTableRowProps {
    lead: Lead;
    dynamicColumns: DynamicColumn[];
}

const LeadsTableRow: React.FC<LeadsTableRowProps> = ({ lead, dynamicColumns }) => {
    const [editandoParceiro, setEditandoParceiro] = useState(false);
    const [valorParceiro, setValorParceiro] = useState(lead.parceiro || "");

    const { mutate, isPending, isError } = useUpdateLead({
        onSuccess: () => setEditandoParceiro(false),
    });

    useEffect(() => {
        setValorParceiro(lead.parceiro || "");
    }, [lead.parceiro]);

    const updateLeadField = (campo: keyof Lead, valor: any) =>
        mutate({ oldData: lead, newData: { ...lead, [campo]: valor } });

    const salvarParceiro = () => updateLeadField("parceiro", valorParceiro);

    const renderCampo = (valor?: string): ReactNode =>
        valor?.trim() ? <span className="text-card-foreground">{valor}</span> : <span className="italic text-muted-foreground">Não informado</span>;

    const formatarData = (data?: string) =>
        data
            ? new Date(data).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })
            : "";

    const columnContent: Record<ColumnId, ReactNode> = {
        contato: <LeadsContactCell lead={lead} />,
        origem: <LeadsFonteMeioTag fonte={lead.fonte} meio={lead.meio} />,
        anuncio: renderCampo(lead.anuncio),
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
        interesse: <LeadsInteresseCell lead={lead} onUpdate={updateLeadField} disabled={isPending} />,
        data: renderCampo(formatarData(lead.dataHora)),
        acoes: <LeadsAcoesCell lead={lead} onToggleStatus={(status) => updateLeadField("status", status)} disabled={isPending} />,
    };

    return (
        <motion.tr layout initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.3 }} className="border-b border-border align-middle hover:bg-muted transition-colors duration-200">
            {dynamicColumns.map((col) => (
                <TableCell key={col.id} style={{ minWidth: col.minWidth || 120 }} className={`py-4 whitespace-nowrap text-ellipsis ${col.id === "contato" ? "pl-0 text-left" : "text-center"}`}>
                    {columnContent[col.id]}
                </TableCell>
            ))}
        </motion.tr>
    );
};

export default LeadsTableRow;
