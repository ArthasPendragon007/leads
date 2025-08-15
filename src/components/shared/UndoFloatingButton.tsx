"use client";

import { useEffect, useCallback } from "react";
import { useUndoManager } from "@/features/undo/hooks/useUndoManager";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, CornerUpLeft } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.9, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: 32, scale: 0.9, transition: { duration: 0.2 } },
    error: {
        scale: [1, 1.05, 1],
        rotate: [0, 4, -4, 0],
        transition: { duration: 0.6, times: [0, 0.25, 0.75, 1] },
    },
};

export const UndoFloatingButton: React.FC = () => {
    const { lastAction, undoLastAction, isUndoing, isError } = useUndoManager();

    const handleKeyboardUndo = useCallback(
        (e: KeyboardEvent) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            if (isCtrlOrCmd && e.key.toLowerCase() === "z") {
                e.preventDefault();
                if (lastAction && !isUndoing) {
                    undoLastAction();
                }
            }
        },
        [lastAction, isUndoing, undoLastAction]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyboardUndo);
        return () => window.removeEventListener("keydown", handleKeyboardUndo);
    }, [handleKeyboardUndo]);

    return (
        <AnimatePresence>
            {lastAction && (
                <motion.div
                    key="undo-button"
                    initial="hidden"
                    animate={isError ? "error" : "visible"}
                    exit="exit"
                    variants={containerVariants}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <Button
                        onClick={undoLastAction}
                        disabled={isUndoing}
                        className={`flex items-center gap-2 rounded-full border shadow-md px-4 py-2 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                        ${
                            isError
                                ? "bg-red-600 hover:bg-red-500 text-white border-transparent"
                                : "bg-white hover:bg-gray-100 text-gray-800 border-gray-300"
                        }`}
                    >
                        {isUndoing ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : isError ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <CornerUpLeft className="h-5 w-5" />
                        )}
                        <span className="whitespace-nowrap text-sm font-medium">
              Desfazer
            </span>
                        <span className="text-xs text-gray-400 ml-2">(CTRL+Z)</span>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
