// @/components/leads/LeadsInteresseCell.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead } from "@/entities/lead";
import { limparTexto } from "@/lib/formatters/stringFormatters";
import React from "react";

interface LeadsInterestCellProps {
    lead: Lead;
    onUpdate: (campo: keyof Lead, valor: any) => void;
}

export const LeadsInteresseCell: React.FC<LeadsInterestCellProps> = ({ lead, onUpdate }) => (
    <div className="flex items-center justify-center h-full">
        <Select
            value={limparTexto(lead.interesse?.toLowerCase() || "")}
            onValueChange={(value) => onUpdate("interesse", value)}
        >
            <SelectTrigger
                className={`px-4 py-1 text-sm rounded-full border transition-colors duration-200
            ${
                    lead.interesse === "revenda"
                        ? "border-blue-200 text-black bg-blue-50 hover:bg-blue-300"
                        : "border-orange-200 text-black bg-orange-50 hover:bg-orange-300"
                }`}
            >
                <SelectValue placeholder="Não informado" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="revenda">Revenda</SelectItem>
                <SelectItem value="utilizacao">Utilização</SelectItem>
            </SelectContent>
        </Select>
    </div>
);