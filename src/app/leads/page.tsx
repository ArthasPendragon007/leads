// @/app/leads/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import LeadsDashboardCard from "@/features/leads/components/LeadsDashboardCard";
import { LeadsFilters } from "@/features/leads/components/LeadsFilters";
import { LeadsTableSection } from "@/features/leads/components/LeadsTableSection";
import { TabType } from "@/entities/lead";
import { Filters } from "@/features/leads/types";
import { RefreshCcw, Store, UserCheck } from "lucide-react";
import { usePollingLeads } from "@/features/leads/hooks/usePollingLeads";
import { useDebounce } from "@/hooks/useDebounce";
import { LeadsPageSkeleton } from "@/features/leads/components/LeadsPageSkeleton";

const pageSize = 10;
const ICON_SIZE = 20;

const Page: React.FC = () => {
    const [busca, setBusca] = useState("");
    const [otherFilters, setOtherFilters] = useState<Omit<Filters, "busca">>({
        origem: "todas-origens",
        interesse: "Revenda",
    });
    const [activeTab, setActiveTab] = useState<TabType>("pendentes");
    const [currentPage, setCurrentPage] = useState(1);

    const [hasSuccessfullyFetched, setHasSuccessfullyFetched] = useState(false);
    const [timeoutError, setTimeoutError] = useState(false);

    const debouncedBusca = useDebounce(busca, 500);

    const { leads, leadsContagem, totalPages, isFetching, isError, refetch } =
        usePollingLeads(
            { ...otherFilters, busca: debouncedBusca },
            activeTab,
            currentPage,
            pageSize
        );

    // Marca sucesso no primeiro fetch
    useEffect(() => {
        if (!isFetching && !isError && !hasSuccessfullyFetched) {
            setHasSuccessfullyFetched(true);
        }
    }, [isFetching, isError, hasSuccessfullyFetched]);

    // Timeout inicial para exibir erro de conexão
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (!hasSuccessfullyFetched) {
            timeoutId = setTimeout(() => {
                if (!hasSuccessfullyFetched && isFetching) {
                    setTimeoutError(true);
                }
            }, 8000);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [hasSuccessfullyFetched, isFetching]);

    if (timeoutError) {
    throw Error("Timeout erro na requisição da API")
    }

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
        setCurrentPage(1);
    };

    return (
        <main className="min-h-screen min-w-[450px] p-8 bg-background">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-card-foreground">Leads</h1>
                <p className="text-muted-foreground mt-1">
                    Gerencie e visualize todos os leads das suas campanhas
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                <LeadsDashboardCard

                    icon={<Store size={ICON_SIZE} className="text-[var(--revenda-foreground)]" />}

                    subtitle={activeTab === "concluidos" ? "Leads Concluídos" : "Leads Ativos"}

                    value={leadsContagem?.totalStatus ?? 0}

                    background="bg-[var(--revenda)]"

                />

                <LeadsDashboardCard

                    icon={<RefreshCcw size={ICON_SIZE} className="text-[var(--revenda-foreground)]" />}

                    subtitle="Leads Revenda"

                    value={leadsContagem?.revenda ?? 0}

                    background="bg-[var(--revenda)]"

                />

                <LeadsDashboardCard

                    icon={<UserCheck size={ICON_SIZE} className="text-[var(--revenda-foreground)]" />}

                    subtitle="Leads Utilização"

                    value={leadsContagem?.utilizacao ?? 0}

                    background="bg-[var(--revenda)]"

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
                    ocultarParceiro={otherFilters.interesse === "Revenda"}
                    loading={isFetching}
                    totalPages={totalPages}
                    qntLeads={leadsContagem?.qntLeadsFiltrado}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    error={isError}
                    onRefetch={refetch}
                />
            </div>
        </main>
    );
};

export default Page;
