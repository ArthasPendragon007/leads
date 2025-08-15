// @/components/leads/LeadsTableBody.tsx
"use client";

import React from "react";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Lead } from "@/entities/lead";
import LeadsTableRow from "@/features/leads/components/LeadsTableRow";

interface LeadsTableBodyProps {
    leads: Lead[];
    dynamicColumns: any[]; // ajuste a tipagem se necessário
    showLoading: boolean;
}

export const LeadsTableBody: React.FC<LeadsTableBodyProps> = ({
                                                                  leads,
                                                                  dynamicColumns,
                                                                  showLoading,
                                                              }) => {
    // Exibe skeleton apenas no carregamento inicial
    const placeholderRowsCount = leads.length > 0 ? 0 : 10;

    return (
        <TableBody>
            {/* Linhas com dados reais */}
            {leads.map((lead) => (
                <LeadsTableRow
                    key={lead.id}
                    lead={lead}
                    dynamicColumns={dynamicColumns}
                />
            ))}

            {/* Skeletons pulsantes no carregamento inicial */}
            {showLoading &&
                placeholderRowsCount > 0 &&
                Array.from({ length: placeholderRowsCount }).map((_, rowIndex) => (
                    <TableRow
                        key={`skeleton-${rowIndex}`}
                        className="animate-pulse"
                    >
                        {dynamicColumns.map((col, colIndex) => (
                            <TableCell
                                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                                style={{
                                    minWidth: col.minWidth ? `${col.minWidth}px` : undefined,
                                }}
                            >
                                <div className="h-4 w-full bg-gray-200 rounded" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
        </TableBody>
    );
};
