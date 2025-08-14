import { useState, useEffect } from "react";

/**
 * Hook de debounce para atrasar a atualização de um valor.
 * @param value Valor que será controlado pelo debounce
 * @param delay Tempo de espera em ms (padrão: 1000ms = 1 segundo)
 * @returns Valor atualizado após o delay
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
