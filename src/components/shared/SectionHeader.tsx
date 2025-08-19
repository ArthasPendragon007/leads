import React from "react";
import {AnimatedTypingNumber} from "@/components/shared/AnimatedTypingNumber";

interface SectionHeaderProps {
    total?: number;
    title: string;
    subtitle?: string;
    number?: number|string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({title, subtitle, number}) => {
    return (
        <div className="pb-5">
            <h3 className="text-lg font-semibold">
                <AnimatedTypingNumber value={number ?? 0}/> - {title}
            </h3>
            <p className="text-sm text-muted-foreground pb-2">{subtitle}</p>
        </div>
    );
};