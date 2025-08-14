import React from "react";
import { LucideCircleCheckBig, Users } from "lucide-react";
import { TabType } from "@/entities/lead";
import { Filters } from "@/features/leads/types";
import { SearchBar } from "@/components/shared/SearchBar";
import { TabButton } from "./TabButton"; // Importa o novo componente
import { FilterSelect } from "./FilterSelect"; // Importa o novo componente


interface LeadsFiltersProps {
    activeTab: TabType;
    onChange: (tab: TabType) => void;
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
}

export const LeadsFilters: React.FC<LeadsFiltersProps> = ({
                                                              activeTab,
                                                              onChange,
                                                              filters,
                                                              onFilterChange,
                                                          }) => {
    return (
        <>
            {/* Tabs */}
            <nav className="flex space-x-2 pt-8">
                <TabButton
                    isActive={activeTab === "pendentes"}
                    onClick={() => onChange("pendentes")}
                    icon={Users}
                >
                    Leads Ativos
                </TabButton>
                <TabButton
                    isActive={activeTab === "concluidos"}
                    onClick={() => onChange("concluidos")}
                    icon={LucideCircleCheckBig}
                >
                    Leads Concluídos
                </TabButton>
            </nav>

            {/* Filtros */}
            <div className="pt-4 flex flex-wrap gap-6">
                <SearchBar
                    value={filters.busca}
                    onChange={(newBusca) => onFilterChange({ ...filters, busca: newBusca })}
                />
                <FilterSelect
                    value={filters.origem ?? "todas-origens"}
                    onChange={(value) => onFilterChange({ ...filters, origem: value })}
                    placeholder="Todas as Origens"
                    items={[
                        { value: "todas-origens", label: "Todas as Origens" },
                        { value: "Instagram", label: "Instagram" },
                        { value: "Facebook", label: "Facebook" },
                        { value: "Google", label: "Google" },
                    ]}
                />
                <FilterSelect
                    value={filters.interesse ?? "Revenda"}
                    onChange={(value) => onFilterChange({ ...filters, interesse: value })}
                    placeholder="Revenda"
                    items={[
                        { value: "todos-tipos", label: "Todos os Tipos" },
                        { value: "Revenda", label: "Revenda" },
                        { value: "Utilização", label: "Utilização" },
                    ]}
                />
            </div>
        </>
    );
};