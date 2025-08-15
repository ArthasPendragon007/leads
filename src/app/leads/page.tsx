"use client";

import { useState } from "react";
import LeadsDashboardCard from "@/features/leads/components/LeadsDashboardCard";
import { LeadsFilters } from "@/features/leads/components/LeadsFilters";
import { LeadsTableSection } from "@/features/leads/components/LeadsTableSection";
import { TabType } from "@/entities/lead";
import { Filters } from "@/features/leads/types";
import { LeadContagem } from "@/entities/leadsContagem";
import { RefreshCcw, Store, UserCheck } from "lucide-react";
import { usePollinglLeads } from "@/features/leads/hooks/usePollinglLeads";
import { useDebounce } from "@/hooks/useDebounce";

const pageSize = 10;
const ICON_SIZE = 20;
const ICON_COLOR = "text-white";
const ICON_BACKGROUND_COLOR = "bg-orange-400";

const Page: React.FC = () => {
    const [busca, setBusca] = useState("");

    const [otherFilters, setOtherFilters] = useState<Omit<Filters, "busca">>({
        origem: "todas-origens",
        interesse: "Revenda",
    });

    const [activeTab, setActiveTab] = useState<TabType>("pendentes");

    const [currentPage, setCurrentPage] = useState(1);

    const debouncedBusca = useDebounce(busca, 500);

    const { leads, leadsContagem, totalPages, loading, errorBool} = usePollinglLeads(
        { ...otherFilters, busca: debouncedBusca },
        activeTab,
        currentPage,
        pageSize
    );

    const handleTabChange = (newTab: TabType) => {
        setActiveTab(newTab);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilters: Omit<Filters, "busca">) => {
        setOtherFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearchChange = (newBusca: string) => {
        setBusca(newBusca);
    };

    // Lógica para o total atual
    const interesseMap: Record<string, keyof LeadContagem> = {
        Revenda: "revenda",
        Utilização: "utilizacao",
        default: "ativo",
    };
    const totalAtual = leadsContagem?.[interesseMap[otherFilters.interesse] || interesseMap.default] ?? 0;

    return (
        <main className="p-8 bg-gray-100 ">
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
                onChange={handleTabChange}
                filters={otherFilters}
                onFilterChange={handleFilterChange}
                busca={busca} // Novo prop
                onSearchChange={handleSearchChange} // Novo prop
            />

            {/* Tabela */}
            <div className="mt-6">
                <LeadsTableSection
                    leads={leads}
                    total={totalAtual}
                    ocultarParceiro={otherFilters.interesse === "Revenda"}
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