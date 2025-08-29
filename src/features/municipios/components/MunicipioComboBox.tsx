"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useMunicipios } from "../hooks/useMunicipios";
import { useDebounce } from "@/hooks/useDebounce";

interface MunicipioComboBoxProps {
    initialValue: string | null;
    onSave: (cityName: string) => void;
    placeholder?: string;
    className?: string;
    isPending: boolean;
}

export function MunicipioComboBox({
                                      initialValue,
                                      onSave,
                                      placeholder = "Buscar cidade...",
                                      className,
                                      isPending
                                  }: MunicipioComboBoxProps) {
    const [open, setOpen] = useState(false);
    const [selectedCityName, setSelectedCityName] = useState(initialValue || "");
    const [searchTerm, setSearchTerm] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { municipios, isLoading } = useMunicipios(debouncedSearchTerm);

    useEffect(() => {
        setSelectedCityName(initialValue || "");
    }, [initialValue]);

    const handleSelect = (cityName: string) => {
        setSelectedCityName(cityName);
        onSave(cityName);
        setOpen(false);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "flex items-center justify-between rounded-md border px-2 py-2 text-md transition-all duration-200 hover:w-auto",
                        "min-w-[200px]", // Tamanho padrão da caixa
                        !selectedCityName && "text-muted-foreground",
                        className
                    )}
                    disabled={isPending}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className={cn(
                        "text-center",
                        !isHovering && selectedCityName && "truncate",
                        !selectedCityName && "italic",
                    )}>
                        {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            selectedCityName || "Não informado"
                        )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput
                        placeholder={placeholder}
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        {isLoading && (
                            <div className="p-2 flex justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        )}
                        {!isLoading && municipios.length === 0 && searchTerm.length > 1 && (
                            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                        )}
                        <CommandGroup>
                            {municipios.map((city) => (
                                <CommandItem
                                    key={city.id}
                                    value={city.label}
                                    onSelect={() => handleSelect(city.label)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedCityName === city.label ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {city.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}