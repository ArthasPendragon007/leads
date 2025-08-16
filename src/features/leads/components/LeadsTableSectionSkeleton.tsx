// @/features/leads/components/LeadsTableSectionSkeleton.tsx
"use client";

import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { LeadsTableBodySkeleton } from "./LeadsTableBodySkeleton";
import React from "react";

export const LeadsTableSectionSkeleton: React.FC = () => {
    const columnCount = 10;

    return (
        <div className="relative mt-6">
            <div className="overflow-x-auto">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: columnCount }).map((_, index) => (
                                <TableCell key={index}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <LeadsTableBodySkeleton columnCount={columnCount} />
                </Table>
            </div>
        </div>
    );
};