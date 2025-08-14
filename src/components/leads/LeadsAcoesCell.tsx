// @/components/leads/LeadsAcoesCell.tsx
import { Button } from "@/components/ui/button";
import { Check, RotateCw } from "lucide-react";
import { Lead } from "@/entities/lead";
import React from "react";

interface LeadsActionsCellProps {
    lead: Lead;
    onUpdate: (campo: keyof Lead, valor: any) => void;
}

export const LeadsAcoesCell: React.FC<LeadsActionsCellProps> = ({ lead, onUpdate }) => (
    <Button
        size="sm"
        variant="ghost"
        className={
            lead.status === "concluido"
                ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                : "text-green-600 hover:text-green-700 hover:bg-green-50"
        }
        onClick={() =>
            onUpdate(
                "status",
                lead.status === "concluido" ? "pendente" : "concluido"
            )
        }
    >
        {lead.status === "concluido" ? (
            <>
                <RotateCw className="w-4 h-4 mr-1" />
                Voltar para Ativo
            </>
        ) : (
            <>
                <Check className="w-4 h-4 mr-1" />
                Concluir
            </>
        )}
    </Button>
);