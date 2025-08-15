// @/components/leads/LeadsTableRowSkeleton.tsx
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface LeadsTableRowSkeletonProps {
    columnCount: number;
}

export const LeadsTableRowSkeleton: React.FC<LeadsTableRowSkeletonProps> = ({ columnCount }) => {
    const skeletons = Array.from({ length: columnCount }).map((_, index) => (
        <TableCell key={index}>
            <Skeleton className="h-4 w-full" />
        </TableCell>
    ));

    return (
        <TableRow className="animate-pulse">
            {skeletons}
        </TableRow>
    );
};