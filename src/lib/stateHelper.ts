import {Dispatch, SetStateAction} from "react";

export function handleGenericChange<T>(
    updater: Dispatch<SetStateAction<T>>,
    value: T,
    extra?: () => void
) {
    updater(value);
    if (extra) extra();
}
