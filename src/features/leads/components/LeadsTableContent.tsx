// @/components/leads/LeadsTableContent.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Table, TableBody } from "@/components/ui/table";
import { StateMessage } from "@/components/shared/StateMessage";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/shared/PaginationControls";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Lead } from "@/entities/lead";
import React, { useEffect } from "react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";
import { LeadsTableHeader } from "./LeadsTableHeader";
import LeadsTableRow from "./LeadsTableRow";

interface LeadsTableContentProps {
    leads: Lead[];
    dynamicColumns: { id: string; label: string; icon?: React.ReactNode; width: number; minWidth?: number }[];
    loading: boolean;
    error: boolean;
    totalPages: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
    onRefetch?: () => void;
}

export const LeadsTableContent: React.FC<LeadsTableContentProps> = ({
                                                                        leads,
                                                                        dynamicColumns,
                                                                        loading,
                                                                        error,
                                                                        totalPages,
                                                                        currentPage,
                                                                        onPageChange,
                                                                        onRefetch,
                                                                    }) => {
    const showLoading = useDelayedLoading(loading);
    const tableMinWidth = dynamicColumns.reduce((acc, c) => acc + (c.minWidth || 0), 0) || undefined;

    const fadeSlide = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3 },
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [currentPage]);

    // Lógica para determinar qual componente renderizar (tabela ou mensagem de estado)
    const renderMainContent = () => {
        if (error) {
            return (
                <motion.div
                    key="error-message"
                    {...fadeSlide}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                >
                    <StateMessage type="error" message="Aconteceu um erro. Tente novamente mais tarde." />
                    {onRefetch && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                            <Button
                                onClick={onRefetch}
                                className="cursor-pointer bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]/90 hover:bg-[var(--color-destructive)]/60"
                            >
                                Tentar Novamente
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            );
        }

        if (leads.length === 0 && !showLoading) {
            return (
                <motion.div key="empty-message" {...fadeSlide} className="flex-1 flex flex-col items-center justify-center">
                    <StateMessage type="empty" message="Não foi encontrado nada." />
                </motion.div>
            );
        }

        return (
            <motion.div key="table-content" {...fadeSlide} className="relative flex flex-col h-full">
                <LoadingOverlay loading={showLoading} />
                <div className="overflow-x-auto h-full">
                    <Table className="table-fixed w-full" style={{ minWidth: tableMinWidth }}>
                        <LeadsTableHeader dynamicColumns={dynamicColumns} />
                        <TableBody>
                            {leads.map((lead) => (
                                <LeadsTableRow key={lead.id} lead={lead} dynamicColumns={dynamicColumns} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="relative flex flex-col justify-center">
            <AnimatePresence mode="wait">{renderMainContent()}</AnimatePresence>

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
        </div>
    );
};

export default LeadsTableContent;