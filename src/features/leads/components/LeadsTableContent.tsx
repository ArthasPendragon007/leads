// components/leads/LeadsTableContent.tsx
import { AnimatePresence, motion } from "framer-motion";
import LeadsCard from "./LeadsCard";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StateMessage } from "@/components/shared/StateMessage";
import PaginationControls from "@/components/shared/PaginationControls";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Lead } from "@/entities/lead";
import React from "react";
import { useDelayedLoading } from "@/hooks/useDelayedLoading";

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

    // Define animação padrão

    const fadeSlide = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3}, // <-- seguro para TS
    };


    return (
        <div
            className={`relative flex flex-col justify-center ${
                showLoading || leads.length === 0 ? "min-h-[200px]" : ""
            }`}
        >
            <AnimatePresence mode="wait">
                {error ? (
                    <motion.div key="error" {...fadeSlide}>
                        <StateMessage type="error" message="Aconteceu um erro. Tente novamente mais tarde." />
                    </motion.div>
                ) : !loading && leads.length === 0 ? (
                    <motion.div key="empty" {...fadeSlide}>
                        <StateMessage type="empty" message="Não foi encontrado nada." />
                    </motion.div>
                ) : (
                    <motion.div key="list" {...fadeSlide}>
                        <div className="overflow-x-auto">
                            <Table
                                className="table-fixed"
                                style={{
                                    minWidth:
                                        dynamicColumns.reduce((acc, c) => acc + (c.minWidth || 0), 0) || undefined,
                                }}
                            >
                                <TableHeader>
                                    <TableRow className="border-b border-gray-200">
                                        {dynamicColumns.map(({ id, label, icon: colIcon, width, minWidth }) => (
                                            <TableHead
                                                key={id}
                                                className={`text-gray-600 font-medium py-4 ${
                                                    id === "contato" ? "text-left pl-6" : "text-center"
                                                } whitespace-nowrap`}
                                                style={{
                                                    width: `${width}%`,
                                                    minWidth: minWidth ? `${minWidth}px` : undefined,
                                                }}
                                            >
                                                <div
                                                    className={`flex items-center space-x-1 ${
                                                        id === "contato" ? "justify-start" : "justify-center"
                                                    }`}
                                                >
                                                    {colIcon}
                                                    <span>{label}</span>
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    <AnimatePresence mode="popLayout">
                                        {leads.map((lead) => (
                                            <motion.tr
                                                key={lead.id}
                                                layout
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1] }}
                                                className="border-b align-middle hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <LeadsCard
                                                    lead={lead}
                                                    dynamicColumns={dynamicColumns}
                                                />
                                            </motion.tr>
                                        ))}
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
                        <PaginationControls
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                        />
                    </motion.div>)}
            </AnimatePresence>

            <LoadingOverlay loading={showLoading} />

        </div>
    );
};


export default LeadsTableContent;
