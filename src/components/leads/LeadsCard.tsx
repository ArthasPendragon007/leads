import { TableCell } from "@/components/ui/table";
import { Lead } from "@/entities/lead";
import React, { useState } from "react";
import { putLeads } from "@/features/leads/service/leadsService";
import { LeadsFonteMeioTag } from "@/components/leads/LeadsFonteMeioTag";
import { LeadsParceiroField } from "@/components/leads/LeadsParceiroField";
import { LeadsContactCell } from "./LeadsContactCell";
import { LeadsInteresseCell } from "./LeadsInteresseCell";
import { LeadsAcoesCell } from "./LeadsAcoesCell";

interface DynamicColumn {
    id: string;
    label: string;
    width: number;
    minWidth?: number; // largura mínima opcional
    alignment?: string;
}

interface LeadsTableRowProps {
    lead: Lead;
    onConcluir: () => void;
    dynamicColumns: DynamicColumn[];
}

const LeadsCard: React.FC<LeadsTableRowProps> = ({
                                                     lead: initialLead,
                                                     onConcluir,
                                                     dynamicColumns,
                                                 }) => {
    const [lead, setLead] = useState<Lead>(initialLead);
    const [editandoParceiro, setEditandoParceiro] = useState(false);
    const [valorParceiro, setValorParceiro] = useState(initialLead.parceiro || "");

    const handleChange = async (campo: keyof Lead, valor: any) => {
        const leadAtualizado = { ...lead, [campo]: valor };
        setLead(leadAtualizado);
        try {
            await putLeads("/atualizar", leadAtualizado);
            onConcluir();
        } catch (error) {
            console.error("Erro ao atualizar lead:", error);
            setLead(lead);
        }
    };

    const salvarParceiro = async () => {
        await handleChange("parceiro", valorParceiro);
        setEditandoParceiro(false);
    };

    const renderCampo = (valor?: string) => {
        if (!valor?.trim()) {
            return <span className="italic text-gray-400">Não informado</span>;
        }
        return <span>{valor}</span>;
    };

    const columnContent = {
        contato: <LeadsContactCell lead={lead} />,
        origem: <LeadsFonteMeioTag fonte={lead.fonte} meio={lead.meio} />,
        anuncio: <span className="text-blue-600">{renderCampo(lead.anuncio)}</span>,
        parceiro: (
            <div className="flex justify-center items-center">
                <LeadsParceiroField
                    interesse={lead.interesse}
                    valorParceiro={valorParceiro}
                    setValorParceiro={setValorParceiro}
                    editandoParceiro={editandoParceiro}
                    setEditandoParceiro={setEditandoParceiro}
                    salvarParceiro={salvarParceiro}
                />
            </div>
        ),
        interesse: <LeadsInteresseCell lead={lead} onUpdate={handleChange} />,
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
        acoes: <LeadsAcoesCell lead={lead} onUpdate={handleChange} />,
    };

    return (
        <>
            {dynamicColumns.map(col => (
                <TableCell
                    key={col.id}
                    className={`py-4 ${col.id === 'contato' ? 'pl-6' : 'text-center'} whitespace-nowrap`}
                    style={{
                        width: `${col.width}%`,
                        minWidth: col.minWidth || 120 // evita colapso
                    }}
                >
                    {columnContent[col.id as keyof typeof columnContent]}
                </TableCell>
            ))}
        </>
    );
};

export default LeadsCard;
