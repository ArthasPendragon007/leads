import {Dispatch, SetStateAction} from "react";

/**
 * Atualiza um estado, reseta a página para 1 e executa um código extra opcional.
 */
export function handleGenericChange<T>(
    updater: Dispatch<SetStateAction<T>>,
    value: T,
    extra?: () => void
) {
    updater(value);
    if (extra) extra();
}
