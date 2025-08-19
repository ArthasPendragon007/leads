import { Button } from "@/components/ui/button";
import { Check, RotateCw, Loader2 } from "lucide-react";
import { Lead } from "@/entities/lead";
import React from "react";

interface LeadsActionsCellProps {
    lead: Lead;
    disabled: boolean;
    onToggleStatus: (newStatus: "concluido" | "pendente") => void;
}

export const LeadsAcoesCell: React.FC<LeadsActionsCellProps> = ({
                                                                    lead,
                                                                    disabled,
                                                                    onToggleStatus,
                                                                }) => (
    <Button
        size="sm"
        variant="ghost"
        className={
            lead.status === "concluido"
                ? "text-active-pendente hover:bg-active-hover-pendente hover:text-active-pendente dark:hover:bg-active-hover-pendente"
                : "text-active-concluido hover:bg-active-hover-concluido hover:text-active-concluido dark:hover:bg-active-hover-concluido"
        }
        onClick={() =>
            onToggleStatus(lead.status === "concluido" ? "pendente" : "concluido")
        }
        disabled={disabled}
    >
        {disabled ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        ) : lead.status === "concluido" ? (
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