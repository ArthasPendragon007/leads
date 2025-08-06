import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LucideCircleCheckBig, Search, Users } from "lucide-react";
import { TabType } from "@/data/lead";

interface Filters {
    nome?: string;
    origem?: string;
    interesse?: string;
}

interface LeadTabsProps {
    activeTab: TabType;
    onChange: (tab: TabType) => void;

    // Filtros controlados
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
}

export const TabsLead: React.FC<LeadTabsProps> = ({
                                                      activeTab = "concluidos",
                                                      onChange,
                                                      filters,
                                                      onFilterChange,
                                                  }) => {
    return (
        <>
            {/* Tabs */}
            <nav className="flex space-x-2 pt-8">
                <Button
                    variant={activeTab === "pendentes" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onChange("pendentes")}
                    className={`transition-colors duration-200 ${
                        activeTab === "pendentes"
                            ? "bg-black text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                    <Users className="h-4 w-4 mr-2" />
                    Leads Ativos
                </Button>

                <Button
                    variant={activeTab === "concluidos" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onChange("concluidos")}
                    className={`transition-colors duration-200 ${
                        activeTab === "concluidos"
                            ? "bg-black text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                    <LucideCircleCheckBig className="h-5 w-5 mr-1" />
                    Leads Concluídos
                </Button>
            </nav>

            {/* Filtros */}
            <div className="pt-4 flex flex-wrap gap-6">
                {/* Buscar por nome */}
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                        value={filters.nome ?? ""}
                        onChange={(e) => onFilterChange({ ...filters, nome: e.target.value })}
                        placeholder="Buscar por nome..."
                        className="pl-10"
                    />
                </div>

                {/* Origem */}
                <div>
                    <Select
                        value={filters.origem ?? "todas-origens"}
                        onValueChange={(value) => onFilterChange({ ...filters, origem: value })}
                    >
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Todas as Origens" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas-origens">Todas as Origens</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Google">Google</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Tipo de Interesse */}
                <div>
                    <Select
                        value={filters.interesse ?? "Revenda"}
                        onValueChange={(value) => onFilterChange({ ...filters, interesse: value })}
                    >
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Revenda" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos-tipos">Todos os Tipos</SelectItem>
                            <SelectItem value="Revenda">Revenda</SelectItem>
                            <SelectItem value="Utilização">Utilização</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
};
