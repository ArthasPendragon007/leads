// @/features/undo/hooks/useUndoManager.ts

"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putLeads } from "@/features/leads/service/leadsService";
import { Lead } from "@/entities/lead";

// --- Tipos ---
interface UndoableAction<T> {
    type: string;
    oldData: T;
    newData: T;
}

interface UndoManagerContextType {
    lastAction: UndoableAction<any> | null;
    registerUndoableAction: <T>(action: UndoableAction<T>) => void;
    undoLastAction: () => void;
    isUndoing: boolean;
    isError: boolean;
}

const UndoManagerContext = createContext<UndoManagerContextType | undefined>(undefined);

export const useUndoManager = () => {
    const context = useContext(UndoManagerContext);
    if (!context) throw new Error("useUndoManager must be used within an UndoManagerProvider");
    return context;
};

interface UndoManagerProviderProps {
    children: ReactNode;
}

// --- Configuração de tempo ---
const UNDO_VISIBLE_MS = 4000; // botão visível por 4s se não for clicado
const ERROR_FEEDBACK_MS = 1500; // tempo para mostrar erro visual

export const UndoManagerProvider: React.FC<UndoManagerProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();

    const [lastAction, setLastAction] = useState<UndoableAction<any> | null>(null);
    const [isError, setIsError] = useState(false);

    // --- Executa o undo real ---
    const { mutate: mutateUndo, isPending: isUndoing } = useMutation({
        mutationFn: (data: Partial<Lead> & { id: string }) => putLeads("/atualizar", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
            // Some imediatamente após sucesso, sem feedback visual desnecessário
            setLastAction(null);
        },
        onError: (error) => {
            console.error("Falha ao desfazer a operação:", error);
            setIsError(true);
        },
    });

    // --- Registra uma nova ação ---
    const registerUndoableAction = useCallback(<T,>(action: UndoableAction<T>) => {
        setLastAction(action);
        setIsError(false); // limpa estado anterior
    }, []);

    // --- Executa o undo ---
    const undoLastAction = useCallback(() => {
        if (!lastAction || isUndoing) return;
        mutateUndo(lastAction.oldData);
    }, [lastAction, isUndoing, mutateUndo]);

    // --- Remove botão após timeout se não for usado ---
    useEffect(() => {
        if (!lastAction) return;
        const timerId = setTimeout(() => setLastAction(null), UNDO_VISIBLE_MS);
        return () => clearTimeout(timerId);
    }, [lastAction]);

    // --- Feedback de erro temporário ---
    useEffect(() => {
        if (!isError) return;
        const timerId = setTimeout(() => {
            setIsError(false);
            setLastAction(null); // esconde botão ao falhar
        }, ERROR_FEEDBACK_MS);
        return () => clearTimeout(timerId);
    }, [isError]);

    return (
        <UndoManagerContext.Provider
            value={{
                lastAction,
                registerUndoableAction,
                undoLastAction,
                isUndoing,
                isError,
            }}
        >
            {children}
        </UndoManagerContext.Provider>
    );
};
