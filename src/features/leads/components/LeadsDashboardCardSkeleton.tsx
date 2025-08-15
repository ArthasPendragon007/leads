import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LeadsDashboardCardSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-lg shadow-sm w-full h-[150px] animate-pulse">
            <div className="flex items-center gap-4 w-full">
                {/* Esqueleto para o ícone */}
                <Skeleton className="h-10 w-10 rounded-full" />
                {/* Esqueleto para os textos */}
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
            {/* Esqueleto para o valor (opcional, pode ser substituído por um único retângulo maior) */}
            <Skeleton className="h-8 w-1/4 mt-auto" />
        </div>
    );
};