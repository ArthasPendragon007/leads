import { useEffect, useRef } from "react";

export function useFocusSearchOnKeypress(searchInputRef: React.RefObject<HTMLInputElement>) {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const isLetterOrNumber = /^[a-zA-Z0-9]$/.test(e.key);
            const activeTag = document.activeElement?.tagName;

            // Só dispara se a tecla for letra ou número e o foco não estiver em outro input/textarea
            if (isLetterOrNumber && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => window.removeEventListener("keypress", handleKeyPress);
    }, [searchInputRef]);
}
