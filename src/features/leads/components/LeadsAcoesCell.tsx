// @/components/leads/LeadsAcoesCell.tsx
import { Button } from "@/components/ui/button";
import { Check, RotateCw, Loader2 } from "lucide-react";
import { Lead } from "@/entities/lead";
import React from "react";

interface LeadsActionsCellProps {
    lead: Lead;
    // O botão será desabilitado se esta prop for verdadeira
    disabled: boolean;
    // A função para alternar o status, passada do componente pai
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
                ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                : "text-green-600 hover:text-green-700 hover:bg-green-50"
        }
        onClick={() =>
            onToggleStatus(lead.status === "concluido" ? "pendente" : "concluido")
        }
        // O botão é desabilitado durante o estado de 'loading'
        disabled={disabled}
    >
        {/* Renderização condicional para o spinner de loading */}
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