// @/features/leads/components/LeadsPageSkeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { LeadsDashboardCardListSkeleton } from "./LeadsDashboardCardListSkeleton";
import { LeadsTableSectionSkeleton } from "./LeadsTableSectionSkeleton"; // Vamos criar este componente

export const LeadsPageSkeleton: React.FC = () => {
    return (
        <main className="min-h-screen min-w-[450px] p-8 bg-gray-100 animate-pulse">
            {/* Cabeçalho */}
            <header className="mb-6">
                <Skeleton className="h-8 w-1/3 mb-1" />
                <Skeleton className="h-4 w-1/4" />
            </header>

            {/* Cards */}
            <LeadsDashboardCardListSkeleton />

            {/* Filtros e Tabela */}
            <div className="pt-4 flex flex-wrap gap-6 mb-6">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
            </div>
            <LeadsTableSectionSkeleton />
        </main>
    );
};