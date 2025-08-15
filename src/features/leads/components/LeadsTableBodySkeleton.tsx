// @/components/leads/LeadsTableBodySkeleton.tsx
import React from "react";
import { TableBody } from "@/components/ui/table";
import { LeadsTableRowSkeleton } from "./LeadsTableRowSkeleton";

interface LeadsTableBodySkeletonProps {
    rowCount?: number;
    columnCount: number;
}

export const LeadsTableBodySkeleton: React.FC<LeadsTableBodySkeletonProps> = ({ rowCount = 10, columnCount }) => {
    const skeletons = Array.from({ length: rowCount }).map((_, index) => (
        <LeadsTableRowSkeleton key={index} columnCount={columnCount} />
    ));

    return (
        <TableBody>
            {skeletons}
        </TableBody>
    );
};