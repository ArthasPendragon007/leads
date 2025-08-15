import React from "react";
import { LeadsDashboardCardSkeleton } from "./LeadsDashboardCardSkeleton";

interface LeadsDashboardCardListSkeletonProps {
    count?: number;
}

export const LeadsDashboardCardListSkeleton: React.FC<LeadsDashboardCardListSkeletonProps> = ({ count = 3 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {Array.from({ length: count }).map((_, index) => (
                <LeadsDashboardCardSkeleton key={index} />
            ))}
        </div>
    );
};