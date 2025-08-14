import React from "react";
import {AlertTriangle, SearchX} from "lucide-react";
import clsx from "clsx";

interface StateMessageProps {
    type: "error" | "empty";
    message: string;
}

const iconStyles = {
    base: "w-12 h-12 p-3 rounded-lg mb-3",
    error: "bg-red-100 text-red-600",
    empty: "bg-blue-100 text-blue-600",
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
                    type === "error" ? "text-red-600" : "text-blue-600"
                )}
            >
                {message}
            </p>
        </div>
    );
};
