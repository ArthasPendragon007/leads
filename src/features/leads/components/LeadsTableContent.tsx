// components/leads/LeadsTableContent.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Table } from "@/components/ui/table";
import { StateMessage } from "@/components/shared/StateMessage";
import PaginationControls from "@/components/shared/PaginationControls";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Lead } from "@/entities/lead";
import React, { useEffect } from "react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

// Componentes recém-criados
import { LeadsTableHeader } from "./LeadsTableHeader";
import { LeadsTableBody } from "./LeadsTableBody";

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

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [currentPage]);

    // Lógica para determinar o conteúdo principal
    const renderMainContent = () => {
        if (error) {
            return (
                <motion.div key="error" {...fadeSlide}>
                    <StateMessage type="error" message="Aconteceu um erro. Tente novamente mais tarde." />
                </motion.div>
            );
        }

        if (!loading && leads.length === 0) {
            return (
                <motion.div key="empty" {...fadeSlide}>
                    <StateMessage type="empty" message="Não foi encontrado nada." />
                </motion.div>
            );
        }

        return (
            <motion.div key="table" {...fadeSlide}>
                <div className="overflow-x-auto">
                    <Table className="table-fixed w-full" style={{ minWidth: tableMinWidth }}>
                        <LeadsTableHeader dynamicColumns={dynamicColumns} />
                        <LeadsTableBody leads={leads} dynamicColumns={dynamicColumns} showLoading={showLoading} />
                    </Table>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="relative flex flex-col justify-center min-h-[300px]">
            <AnimatePresence>
                {renderMainContent()}
            </AnimatePresence>

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

            <LoadingOverlay loading={showLoading} />
        </div>
    );
};

export default LeadsTableContent;