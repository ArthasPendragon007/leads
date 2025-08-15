// @/components/leads/LeadsTableBody.tsx

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TableBody } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import LeadsTableRow from "@/features/leads/components/LeadsTableRow";
import { Lead } from "@/entities/lead";

interface LeadsTableBodyProps {
    leads: Lead[];
    dynamicColumns: { id: string; label: string; width: number; minWidth?: number }[];
    showLoading: boolean;
}

const skeletonRows = Array.from({ length: 5 });

export const LeadsTableBody: React.FC<LeadsTableBodyProps> = ({
                                                                  leads,
                                                                  dynamicColumns,
                                                                  showLoading,
                                                              }) => {
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

        if (leads.length === 0) {
            return (
                <motion.tr
                    key="empty-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <td colSpan={dynamicColumns.length} className="p-4 text-center text-gray-500">
                        Não foi encontrado nenhum lead.
                    </td>
                </motion.tr>
            );
        }

        return leads.map((lead) => (
            <LeadsTableRow key={lead.id} lead={lead} dynamicColumns={dynamicColumns} />
        ));
    };

    return (
        <TableBody className={`relative`} style={{ minHeight: `${Math.max(leads.length, 5) * 50}px` }}>
            <AnimatePresence mode="popLayout">
                {renderTableContent()}
            </AnimatePresence>
        </TableBody>
    );
};