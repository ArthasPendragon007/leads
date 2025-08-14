import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterSelectItem {
    value: string;
    label: string;
}

interface FilterSelectProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    items: FilterSelectItem[];
}

const baseSelectTrigger =
    "w-[160px] bg-white border rounded-md text-sm transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-primary/50";

export const FilterSelect = ({
                                 value,
                                 onChange,
                                 placeholder,
                                 items,
                             }: FilterSelectProps) => (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={baseSelectTrigger}>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="animate-in fade-in-0 zoom-in-95 duration-150 ease-out">
            {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                    {item.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);