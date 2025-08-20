"use client";

import {Card, CardContent, CardDescription, CardHeader,} from "@/components/ui/card";
import React from "react";
import {AnimatedBlurNumber} from "@/components/shared/AnimatedBlurNumber";

interface LeadsDashboardCardProps {
    icon?: React.ReactNode;
    subtitle: string;
    value: string | number;
    background: string;
}

const LeadsDashboardCard: React.FC<LeadsDashboardCardProps> = ({
                                                                   icon,
                                                                   subtitle,
                                                                   value,
                                                                   background,
                                                               }) => {
    return (
        <Card className="rounded-lg border background-card shadow-sm hover:shadow-md transition-all duration-300">
            <div className="pr-6 pl-6">
                <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
                    <CardDescription className="tracking-tight text-sm font-medium">
                        {subtitle}
                    </CardDescription>
                    <div className={`p-2 ${background} rounded-lg`}>{icon}</div>
                </CardHeader>
            </div>
            <CardContent className="p-6 pt-0">
                <p className="text-3xl font-bold">
                    <AnimatedBlurNumber value={value} />
                </p>
            </CardContent>
        </Card>
    );
};

export default LeadsDashboardCard;