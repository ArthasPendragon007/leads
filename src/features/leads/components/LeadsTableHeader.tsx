// @/components/leads/LeadsTableHeader.tsx

import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeadsTableHeaderProps {
    dynamicColumns: { id: string; label: string; icon?: React.ReactNode; minWidth?: number }[];
}

export const LeadsTableHeader: React.FC<LeadsTableHeaderProps> = ({ dynamicColumns }) => (
    <TableHeader>
        <TableRow className="border-b border-gray-200">
        {dynamicColumns.map(({ id, label, icon: colIcon, minWidth }) => (
                <TableHead
                    key={id}
            className={`text-gray-600 font-medium py-4 ${
                id === "contato" ? "text-left pl-10" : "text-center"
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
);