// components/leads/LeadsTableContent.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StateMessage } from "@/components/shared/StateMessage";
import PaginationControls from "@/components/shared/PaginationControls";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Lead } from "@/entities/lead";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import LeadsTableRow from "@/features/leads/components/LeadsTableRow";

interface LeadsTableContentProps {
    leads: Lead[];
    dynamicColumns: { id: string; label: string; icon?: React.ReactNode; width: number; minWidth?: number }[];
    loading: boolean;
    error: boolean;
    totalPages: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
}

export const LeadsTableContent: React.FC<LeadsTableContentProps> = ({
                                                                        leads,
                                                                        dynamicColumns,
                                                                        loading,
                                                                        error,
                                                                        totalPages,
                                                                        currentPage,
                                                                        onPageChange,
                                                                    }) => {
    const showLoading = useDelayedLoading(loading);
    const tableMinWidth = dynamicColumns.reduce((acc, c) => acc + (c.minWidth || 0), 0) || undefined;

    const fadeSlide = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3 },
    };

    const skeletonRows = Array.from({ length: 5 });

    const renderTableContent = () => {
        if (showLoading) {
            return skeletonRows.map((_, i) => (
                <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b"
                >
                    <td colSpan={dynamicColumns.length} className="p-4">
                        <Skeleton className="h-6 w-full rounded-md" />
                    </td>
                </motion.tr>
            ));
        }
        return leads.map((lead) => (
            // A animação de `motion.tr` será gerenciada aqui
            <LeadsTableRow key={lead.id} lead={lead} dynamicColumns={dynamicColumns} />
        ));
    };

    return (
        <div className="relative flex flex-col justify-center">
            <AnimatePresence>
                {error ? (
                    <motion.div key="error" {...fadeSlide}>
                        <StateMessage type="error" message="Aconteceu um erro. Tente novamente mais tarde." />
                    </motion.div>
                ) : !loading && leads.length === 0 ? (
                    <motion.div key="empty" {...fadeSlide}>
                        <StateMessage type="empty" message="Não foi encontrado nada." />
                    </motion.div>
                ) : (
                    <motion.div key="table" {...fadeSlide}>
                        <div className="overflow-x-auto">
                            <Table className="table-fixed w-full" style={{ minWidth: tableMinWidth }}>
                                <TableHeader>
                                    <TableRow className="border-b border-gray-200">
                                        {dynamicColumns.map(({ id, label, icon: colIcon, minWidth }) => (
                                            <TableHead
                                                key={id}
                                                className={`text-gray-600 font-medium py-2 ${
                                                    id === "contato" ? "text-left pl-30" : "text-center" // <-- CLASSE CORRIGIDA AQUI
                                                } whitespace-nowrap`}
                                                style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}
                                            >
                                                <div className={`flex items-center ${id === "contato" ? "justify-start" : "justify-center"} flex-1`}>
                                                    {colIcon && <span className="mr-1">{colIcon}</span>}
                                                    <span>{label}</span>
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody className={`relative`} style={{ minHeight: `${Math.max(leads.length, 5) * 50}px` }}>
                                    <AnimatePresence mode="popLayout">
                                        {renderTableContent()}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                )}

                {totalPages > 1 && onPageChange && !error && !showLoading && (
                    <motion.div
                        key="pagination"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6"
                    >
                        <PaginationControls totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
                    </motion.div>
                )}
            </AnimatePresence>

            <LoadingOverlay loading={showLoading} />
        </div>
    );
};

export default LeadsTableContent;