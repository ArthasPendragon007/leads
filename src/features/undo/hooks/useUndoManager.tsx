"use client";

import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {putLeads} from "@/features/leads/service/leadsService";
import {Lead} from "@/entities/lead";

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
const UNDO_VISIBLE_MS = 4000;
const ERROR_FEEDBACK_MS = 2000;

export const UndoManagerProvider: React.FC<UndoManagerProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();

    const [lastAction, setLastAction] = useState<UndoableAction<any> | null>(null);
    const [isError, setIsError] = useState(false);

    // --- Executa o undo real com o React Query ---
    const { mutate: mutateUndo, isPending: isUndoing } = useMutation({
        mutationFn: (data: Partial<Lead> & { id: string }) => putLeads("/atualizar", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
            setLastAction(null); // Esconde a ação de undo imediatamente
            setIsError(false); // Limpa o estado de erro, se houver
        },
        onError: (error) => {
            setIsError(true);
        },
    });

    // --- Registra e exibe a nova ação de undo ---
    const registerUndoableAction = useCallback(<T,>(action: UndoableAction<T>) => {
        setLastAction(action);
        setIsError(false);
    }, []);

    // --- Executa o undo da última ação ---
    const undoLastAction = useCallback(() => {
        if (!lastAction || isUndoing) return;
        mutateUndo(lastAction.oldData);
    }, [lastAction, isUndoing, mutateUndo]);

    // --- Gerencia o timeout para ocultar a UI de undo ou erro ---
    useEffect(() => {
        let timerId: NodeJS.Timeout | undefined;

        if (lastAction && !isError) {
            timerId = setTimeout(() => setLastAction(null), UNDO_VISIBLE_MS);
        } else if (isError) {
            timerId = setTimeout(() => {
                setIsError(false);
                setLastAction(null);
            }, ERROR_FEEDBACK_MS);
        }

        // Cleanup para evitar vazamentos de memória e comportamentos indesejados
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [lastAction, isError]);

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