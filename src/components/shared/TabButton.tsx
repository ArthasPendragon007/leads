// @/components/leads/TabButton.tsx
import React, {ReactNode} from "react";
import {Button} from "@/components/ui/button";

interface TabButtonProps {
    isActive: boolean;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    children: ReactNode;
}

const baseButton =
    "w-[188px] border rounded-md text-sm transition-colors duration-200 focus:ring-2 focus:ring-ring";
const activeButton = "bg-[var(--active)] text-[var(--active-foreground)]";
const inactiveButton = "bg-[var(--inactive)] text-[var(--inactive-foreground)]";

export const TabButton = ({ isActive, onClick, icon: Icon, children }: TabButtonProps) => (
    <Button
        onClick={onClick}
        className={`${baseButton} ${isActive ? activeButton : inactiveButton} cursor-pointer `}
    >
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {children}
    </Button>
);