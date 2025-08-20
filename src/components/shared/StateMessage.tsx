// @/components/shared/StateMessage.tsx

import React from "react";
import {AlertTriangle, SearchX} from "lucide-react";
import clsx from "clsx";

interface StateMessageProps {
    type: "error" | "empty";
    message: string;
}

const iconStyles = {
    base: "w-12 h-12 p-3 rounded-lg mb-3",

    error: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]",

    empty: "bg-[var(--revenda)] text-[var(--revenda-foreground)]",
};

export const StateMessage: React.FC<StateMessageProps> = ({ type, message }) => {
    const Icon = type === "error" ? AlertTriangle : SearchX;

    return (
        <div className="flex flex-col items-center justify-center text-center py-10">
            <div className={clsx(iconStyles.base, iconStyles[type])}>
                <Icon className="w-full h-full" />
            </div>
            <p
                className={clsx(
                    "text-base font-medium",

                    type === "error"
                        ? "text-[var(--color-destructive-foreground)]"
                        : "text-[var(--revenda-foreground)]"
                )}
            >
                {message}
            </p>
        </div>
    );
};