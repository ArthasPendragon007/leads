// src/app/leads/page.tsx
"use client";

import { useState } from "react";
import PaginationControls from "@/components/shared/PaginationControls";
import LeadsDashboardCard from "@/components/leads/LeadsDashboardCard";
import { LeadsFilters } from "@/components/leads/LeadsFilters";
import { LeadsTableSection } from "@/components/leads/LeadsTableSection";
import { TabType } from "@/entities/lead";
import { Filters } from "@/features/leads/types";
import { LeadContagem } from "@/entities/leadsContagem";
import { Store, RefreshCcw, UserCheck } from "lucide-react";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { handleGenericChange } from "@/lib/stateHelper";

const pageSize = 10;
const ICON_SIZE = 20;
const ICON_COLOR = "text-white";
const ICON_BACKGROUND_COLOR = "bg-orange-400";

const Page: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("pendentes");
    const [filters, setFilters] = useState<Filters>({
        busca: "",
        origem: "todas-origens",
        interesse: "Revenda",
    });
    const [currentPage, setCurrentPage] = useState(1);

    // Usa o hook correto
    const { leads, leadsContagem, totalPages, loading, errorBool, refetch } = useLeads(
        filters,
        activeTab,
        currentPage,
        pageSize
    );

    const handleChangeWithResetPage = <T,>(updater: React.Dispatch<React.SetStateAction<T>>, value: T) => {
        handleGenericChange(updater, value);
        setCurrentPage(1);
    };

    const interesseMap: Record<string, keyof LeadContagem> = {
        Revenda: "revenda",
        Utilização: "utilizacao",
        default: "ativo",
    };

    const totalAtual =
        leadsContagem?.[interesseMap[filters.interesse] || interesseMap.default] ?? 0;

    return (
        <main className="min-h-screen min-w-[450px] p-8 bg-gray-100 ">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">
                    Gerencie e visualize todos os leads das suas campanhas
                </p>
            </header>

            {/* Cards de contagem */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <LeadsDashboardCard
                    icon={<Store size={ICON_SIZE} className={ICON_COLOR} />}
                    subtitle={activeTab === "concluidos" ? "Leads Concluídos" : "Leads Ativos"}
                    value={leadsContagem?.ativo ?? 0}
                    background={ICON_BACKGROUND_COLOR}
                />

                <LeadsDashboardCard
                    icon={<RefreshCcw size={ICON_SIZE} className={ICON_COLOR} />}
                    subtitle="Leads Revenda"
                    value={leadsContagem?.revenda ?? 0}
                    background={ICON_BACKGROUND_COLOR}
                />
                <LeadsDashboardCard
                    icon={<UserCheck size={ICON_SIZE} className={ICON_COLOR} />}
                    subtitle="Leads Utilização"
                    value={leadsContagem?.utilizacao ?? 0}
                    background={ICON_BACKGROUND_COLOR}
                />
            </div>

            {/* Tabs e filtros */}
            <LeadsFilters
                activeTab={activeTab}
                onChange={(newTab) => handleChangeWithResetPage<TabType>(setActiveTab, newTab)}
                filters={filters}
                onFilterChange={(newFilters) =>
                    handleChangeWithResetPage<Filters>(setFilters, newFilters)
                }
            />

            {/* Tabela */}
            <div className="mt-6">
                <LeadsTableSection
                    leads={leads}
                    onConcluir={refetch}
                    total={totalAtual}
                    ocultarParceiro={filters.interesse === "Revenda"}
                    loading={loading}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    error={errorBool}
                />
            </div>
        </main>
    );
};

export default Page;
