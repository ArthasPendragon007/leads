import { useState, useDeferredValue, useEffect } from "react";

/**
 * Hook para atrasar a exibição de um estado de carregamento.
 * Ideal para evitar o "flicker" quando o carregamento é muito rápido.
 * Usa useDeferredValue para uma transição mais suave.
 *
 * @param loading O estado de carregamento original (true/false).
 * @returns O estado de exibição atrasado.
 */
export function useDelayedLoading(loading: boolean) {
    const deferredLoading = useDeferredValue(loading);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (deferredLoading) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [deferredLoading]);

    return show;
}