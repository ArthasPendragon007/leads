import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { LucideIcon, Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps<T = string> {
    value?: T;
    onChange: (value: T) => void;
    placeholder?: string;
    debounceDelay?: number;
    icon?: LucideIcon;
    className?: string;
}

export function SearchBar<T = string>({
                                          value,
                                          onChange,
                                          placeholder = "Buscar...",
                                          debounceDelay = 300,
                                          icon: Icon = Search,
                                          className = "",
                                      }: SearchBarProps<T>) {
    const [localValue, setLocalValue] = useState<T>(value as T ?? "" as any);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedValue = useDebounce(localValue, debounceDelay);

    // Sincroniza valor externo
    useEffect(() => {
        if (value !== undefined && value !== localValue) {
            setLocalValue(value as T);
        }
    }, [value]);

    // Chama onChange com debounce
    useEffect(() => {
        if (debouncedValue !== value) {
            onChange(debouncedValue);
        }
    }, [debouncedValue, onChange, value]);

    // Focar o input e inserir a primeira letra digitada
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const isLetterOrNumber = /^[a-zA-Z0-9]$/.test(e.key);
            const activeTag = document.activeElement?.tagName;

            if (!isLetterOrNumber || activeTag === "INPUT" || activeTag === "TEXTAREA") return;

            inputRef.current?.focus();
            // Não adicionamos e.key manualmente!
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => window.removeEventListener("keypress", handleKeyPress);
    }, []);
    return (
        <div className={`relative w-full max-w-sm ${className}`}>
            {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            )}
            <Input
                ref={inputRef}
                value={localValue as any}
                onChange={(e) => setLocalValue(e.target.value as any)}
                placeholder={placeholder}
                className="pl-10"
            />
        </div>
    );
}