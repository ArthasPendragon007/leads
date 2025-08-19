import {Card, CardContent} from "@/components/ui/card";
import {Lead} from "@/entities/lead";
import React from "react";
import LeadsTableContent from "@/features/leads/components/LeadsTableContent";
import {useLeadsColumns} from "@/features/leads/hooks/useLeadsColumns";
import {SectionHeader} from "@/components/shared/SectionHeader";

interface LeadTableSectionProps {
    leads: Lead[];
    title?: string;
    subtitle?: string;
    ocultarParceiro?: boolean;
    loading?: boolean;
    error?: boolean;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    qntLeads?: number|string;
    onRefetch?: () => void;

}

export const LeadsTableSection: React.FC<LeadTableSectionProps> = ({
                                                                       leads,
                                                                       title = "Leads",
                                                                       subtitle = "Todos os leads",
                                                                       ocultarParceiro,
                                                                       loading = false,
                                                                       error = false,
                                                                       totalPages = 0,
                                                                       currentPage = 1,
                                                                       onPageChange,
                                                                       qntLeads,
                                                                       onRefetch,
                                                                   }) => {

    const dynamicColumns = useLeadsColumns(ocultarParceiro);

    return (
        <div className="pt-6">
            <Card className="rounded-lg shadow-md relative overflow-hidden">
                <CardContent className="p-6">
                    <SectionHeader title={title} subtitle={subtitle} number={qntLeads ?? 0} />

                    <LeadsTableContent
                        leads={leads}
                        dynamicColumns={dynamicColumns}
                        loading={loading}
                        error={error}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        onRefetch={onRefetch}
                    />
                </CardContent>
            </Card>
        </div>
    );
};