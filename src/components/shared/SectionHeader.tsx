import React from "react";

interface SectionHeaderProps {
    total?: number;
    title: string;
    subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ total, title, subtitle }) => {
    return (
        <div className="pb-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold">
                {total} {title}
            </h3>
            <p className="text-sm text-gray-600 pb-2">{subtitle}</p>
        </div>
    );
};