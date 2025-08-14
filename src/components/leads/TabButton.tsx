// @/components/leads/TabButton.tsx
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface TabButtonProps {
    isActive: boolean;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    children: ReactNode;
}

const baseButton =
    "w-[188px] bg-white border rounded-md text-sm transition-colors duration-200 hover:bg-gray-10 focus:ring-2 focus:ring-gray-300";
const activeButton = "bg-black text-white hover:bg-gray-800";
const inactiveButton =
    "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100";

export const TabButton = ({ isActive, onClick, icon: Icon, children }: TabButtonProps) => (
    <Button
        onClick={onClick}
        className={`${baseButton} ${isActive ? activeButton : inactiveButton} `}
    >
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {children}
    </Button>
);