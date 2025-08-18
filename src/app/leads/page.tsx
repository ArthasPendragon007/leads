// @/app/leads/page.tsx
"use client";

import { useState, useEffect } from "react";
import LeadsDashboardCard from "@/features/leads/components/LeadsDashboardCard";
import { LeadsFilters } from "@/features/leads/components/LeadsFilters";
import { LeadsTableSection } from "@/features/leads/components/LeadsTableSection";
import { TabType } from "@/entities/lead";
import { Filters } from "@/features/leads/types";
import { LeadContagem } from "@/entities/leadsContagem";
import { RefreshCcw, Store, UserCheck } from "lucide-react";
import { usePollinglLeads } from "@/features/leads/hooks/usePollinglLeads";
import { useDebounce } from "@/hooks/useDebounce";
import { LeadsPageSkeleton } from "@/features/leads/components/LeadsPageSkeleton";

const pageSize = 10;
const ICON_SIZE = 20;
const ICON_COLOR = "text-white";
const ICON_BACKGROUND_COLOR = "bg-orange-400";
const ICON_BACKGROUND_COLOR = "bg-orange-400 dark:bg-blue-400";

const Page: React.FC = () => {
    const [busca, setBusca] = useState("");
    const [otherFilters, setOtherFilters] = useState<Omit<Filters, "busca">>({
        origem: "todas-origens",
        interesse: "Revenda",
    });
    const [activeTab, setActiveTab] = useState<TabType>("pendentes");
    const [currentPage, setCurrentPage] = useState(1);

    // Novo estado para controlar se a busca inicial foi bem-sucedida
    const [hasSuccessfullyFetched, setHasSuccessfullyFetched] = useState(false);

    const debouncedBusca = useDebounce(busca, 500);

    const {
        leads,
        leadsContagem,
        totalPages,
        isFetching, // Usamos isFetching para detectar o fim de qualquer busca
        isFetching,
        errorBool,
    } = usePollinglLeads(
        { ...otherFilters, busca: debouncedBusca },
        activeTab,
        currentPage,
        pageSize
    );

    // ---------------------------------------------------------------------
    // Efeito para rastrear o estado de carregamento e remover o esqueleto inicial
    // ---------------------------------------------------------------------
    useEffect(() => {
        // Se uma busca não estiver em andamento e não houver erro,
        // significa que os dados foram carregados com sucesso.
        if (!isFetching && !errorBool) {
            setHasSuccessfullyFetched(true);
        }
    }, [isFetching, errorBool]);

    // ---------------------------------------------------------------------
    // Lógica de Carregamento:
    // O esqueleto da página só será renderizado se a busca inicial ainda não tiver sido concluída.
    // ---------------------------------------------------------------------
    if (!hasSuccessfullyFetched) {
        return <LeadsPageSkeleton />;
    }

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

    const interesseMap: Record<string, keyof LeadContagem> = {
        Revenda: "revenda",
        Utilização: "utilizacao",
        default: "ativo",
    };
    const totalAtual = leadsContagem?.[interesseMap[otherFilters.interesse] || interesseMap.default] ?? 0;

    return (
        <main className="min-h-screen min-w-[450px] p-8 bg-gray-100 ">
        <main className="min-h-screen min-w-[450px] p-8 bg-background">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">
                <h1 className="text-3xl font-bold text-card-foreground">Leads</h1>
                <p className="text-muted-foreground mt-1">
                    Gerencie e visualize todos os leads das suas campanhas
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <LeadsDashboardCard
                    subtitle={activeTab === "concluidos" ? "Leads Concluídos" : "Leads Ativos"}
                    value={leadsContagem?.ativo ?? 0}
                />
                <LeadsDashboardCard
                    subtitle="Leads Revenda"
                    value={leadsContagem?.revenda ?? 0}
                />
                <LeadsDashboardCard
                    subtitle="Leads Utilização"
                    value={leadsContagem?.utilizacao ?? 0}
                />
            </div>

            <LeadsFilters
                activeTab={activeTab}
                onChange={handleTabChange}
                filters={otherFilters}
                onFilterChange={handleFilterChange}
                busca={busca}
                onSearchChange={handleSearchChange}
            />

            <div className="mt-6">
                <LeadsTableSection
                    leads={leads}
                    total={totalAtual}
                    ocultarParceiro={otherFilters.interesse === "Revenda"}
                    loading={isFetching}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    error={errorBool}
                />
            </div>
        </main>
    );
};

