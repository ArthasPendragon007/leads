import { AnimatePresence, motion } from "framer-motion";
import LeadsCard from "./LeadsCard";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StateMessage } from "@/components/leads/StateMessage";
import PaginationControls from "@/components/shared/PaginationControls";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Lead } from "@/entities/lead";
import React, { useMemo } from "react";

interface LeadsTableContentProps {
    leads: Lead[];
    dynamicColumns: { id: string; label: string; icon?: React.ReactNode; width: number; minWidth?: number }[];
    loading: boolean;
    error: boolean;
    totalPages: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
    onConcluir: () => void;
}

export const LeadsTableContent: React.FC<LeadsTableContentProps> = ({
                                                                        leads,
                                                                        dynamicColumns,
                                                                        loading,
                                                                        error,
                                                                        totalPages,
                                                                        currentPage,
                                                                        onPageChange,
                                                                        onConcluir,
                                                                    }) => {

    // Adicionado useMemo para calcular a largura mínima total da tabela
    const totalMinWidth = useMemo(() => {
        // Reduz o array de colunas para somar os valores de minWidth.
        // O valor padrão de 0 é para caso não exista minWidth na coluna.
        const sum = dynamicColumns.reduce((acc, column) => acc + (column.minWidth || 0), 0);
        return sum > 0 ? `${sum}px` : undefined;
    }, [dynamicColumns]);

    if (error) {
        return <StateMessage type="error" message="Aconteceu um erro. Tente novamente mais tarde." />;
    }

    if (!loading && leads.length === 0) {
        return <StateMessage type="empty" message="Não foi encontrado nada." />;
    }

    return (
        <div
            className={`relative flex flex-col justify-center ${
                loading || leads.length === 0 ? "min-h-[200px]" : ""
            }`}
        >
            <div className="overflow-x-auto">
                <Table
                    className="table-fixed"
                    style={{ minWidth: totalMinWidth }}
                >
                    <TableHeader>
                        <TableRow className="border-b border-gray-200">
                            {dynamicColumns.map(({ id, label, icon: colIcon, width, minWidth }) => (
                                <TableHead
                                    key={id}
                                    className={`text-gray-600 font-medium py-4 ${id === 'contato' ? 'text-left pl-6' : 'text-center'} whitespace-nowrap`}
                                    style={{
                                        width: `${width}%`,
                                        minWidth: minWidth ? `${minWidth}px` : undefined
                                    }}
                                >
                                    <div className={`flex items-center space-x-1 ${id === 'contato' ? 'justify-start' : 'justify-center'}`}>
                                        {colIcon}
                                        <span>{label}</span>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <AnimatePresence>
                        <TableBody>
                            {leads.map((lead) => (
                                <motion.tr
                                    key={lead.id}
                                    className="border-b align-middle hover:bg-gray-50 transition-colors duration-200"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <LeadsCard
                                        lead={lead}
                                        onConcluir={onConcluir}
                                        dynamicColumns={dynamicColumns}
                                    />
                                </motion.tr>
                            ))}
                        </TableBody>
                    </AnimatePresence>
                </Table>
            </div>

            {totalPages > 1 && onPageChange && (
                <div className="mt-6">
                    <PaginationControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
            <LoadingOverlay loading={loading} />
        </div>
    );
};

export default LeadsTableContent;