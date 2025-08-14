import { Card, CardContent } from "@/components/ui/card";
import { Lead } from "@/entities/lead";
import React from "react";
import LeadsTableContent from "@/components/leads/LeadsTableContent";
import { useLeadsColumns } from "@/features/leads/hooks/useLeadsColumns";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface LeadTableSectionProps {
    leads: Lead[];
    title?: string;
    subtitle?: string;
    total?: number;
    onConcluir: () => void;
    ocultarParceiro?: boolean;
    loading?: boolean;
    error?: boolean;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

export const LeadsTableSection: React.FC<LeadTableSectionProps> = ({
                                                                       leads,
                                                                       title = "- Leads",
                                                                       subtitle = "Todos os leads",
                                                                       onConcluir,
                                                                       total,
                                                                       ocultarParceiro,
                                                                       loading = false,
                                                                       error = false,
                                                                       totalPages = 0,
                                                                       currentPage = 1,
                                                                       onPageChange,
                                                                   }) => {

    const dynamicColumns = useLeadsColumns(ocultarParceiro); // Use o hook customizado

    return (
        <div className="pt-6">
            <Card className="rounded-lg shadow-md relative overflow-hidden">
                <CardContent className="p-6">
                    <SectionHeader total={total} title={title} subtitle={subtitle} /> {/* Use o novo componente */}

                    <LeadsTableContent
                        leads={leads}
                        dynamicColumns={dynamicColumns}
                        loading={loading}
                        error={error}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        onConcluir={onConcluir}
                    />
                </CardContent>
            </Card>
        </div>
    );
};