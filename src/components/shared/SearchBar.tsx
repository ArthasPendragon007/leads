import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {LucideIcon, Search} from "lucide-react";
import {useDebounce} from "@/hooks/useDebounce";

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

    const debouncedValue = useDebounce(localValue, debounceDelay);

    useEffect(() => {
        if (value !== undefined && value !== localValue) {
            setLocalValue(value as T);
        }
    }, [value]);

    useEffect(() => {

        if (debouncedValue !== value) {
            onChange(debouncedValue);
        }

        }, [debouncedValue, onChange, value]);


    return (
        <div className={`relative w-full max-w-sm ${className}`}>
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                )}
            <Input
                value={localValue as any}
                onChange={(e) => {
                    setLocalValue(e.target.value as any);
                }}
                placeholder={placeholder}
                className={`pl-10`}
            />
        </div>
    );
}