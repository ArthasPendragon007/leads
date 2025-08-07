"use client"


import PaginationControls from "@/components/shared/paginationControls";
import {useCallback, useEffect, useState} from "react";
import {Lead, TabType} from "@/entities/lead";
import {LeadContagem} from "@/entities/leadsContagem";
import {useOptimisticUpdate} from "@/hooks/useOptimisticUpdate";
import {getLeads} from "@/features/leads/service/lead_service";
import LeadsDashboardCard from "@/components/leads/dashboard";
import {LeadsTabs} from "@/components/leads/tabs";
import {LeadTableSection} from "@/components/leads/tablesection";

interface Filters {
    busca?: string
    origem?: string
    interesse?: string
}

const pageSize = 10

const Page: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("pendentes")
    const [filters, setFilters] = useState<Filters>({
        busca: "",
        origem: "todas-origens",
        interesse: "Revenda",
    })
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [leadsContagem, setLeadsContagem] = useState<LeadContagem>()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const optimisticUpdate = useOptimisticUpdate<any>({
        data: leads,
        setData: setLeads,
    })

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    const handleGenericChange = useCallback(<T,>(updater: React.Dispatch<React.SetStateAction<T>>, value: T) => {
        updater(value)
        setCurrentPage(1)
    }, [])

    const calcularContagem = (contagem: LeadContagem | undefined): number => {
        if (!contagem) return 1
        const interesse = filters.interesse
        const count =
            interesse === "Revenda"
                ? contagem.revenda
                : interesse === "Utilização"
                    ? contagem.utilizacao
                    : contagem.ativo
        return count ? Math.ceil(count / pageSize) : 1
    }

    const fetchLeads = async () => {
        setLoading(true)

        const params = {
            PageNumber: currentPage,
            PageSize: pageSize,
            FiltroBusca: filters.busca,
            FiltroFonte: filters.origem === "todas-origens" ? null : filters.origem,
            FiltroInteresse: filters.interesse === "todos-tipos" ? null : filters.interesse,
            FiltroStatus: activeTab === "concluidos" ? "concluido" : "pendente",
        }

        try {
            const [data, contagem] = await Promise.all([
                getLeads("/pegarTudoPaginado", params),
                getLeads("/pegarDados", params),
            ])

            setLeads(data as Lead[])
            setLeadsContagem(contagem as LeadContagem)
            setTotalPages(calcularContagem(contagem as LeadContagem))
        } catch (error) {
            console.error("Erro ao buscar leads:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads()
    }, [filters, activeTab, currentPage])

    const totalAtual =
        filters.interesse === "Revenda"
            ? leadsContagem?.revenda
            : filters.interesse === "Utilização"
                ? leadsContagem?.utilizacao
                : leadsContagem?.ativo

    return (
        <main className="min-h-screen p-6 bg-gray-100">
            <header className="p-2">
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">
                    Gerencie e visualize todos os leads das suas campanhas
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LeadsDashboardCard
                    subtitle={activeTab === "concluidos" ? "Leads Concluídos" : "Leads Ativos"}
                    value={leadsContagem?.ativo ?? 0}
                />
                <LeadsDashboardCard subtitle="Leads Revenda" value={leadsContagem?.revenda ?? 0} />
                <LeadsDashboardCard subtitle="Leads Utilização" value={leadsContagem?.utilizacao ?? 0} />
            </div>

            <LeadsTabs
                activeTab={activeTab}
                onChange={handleTabChange}
                filters={filters}
                onFilterChange={(newFilters) => handleGenericChange(setFilters, newFilters)}
            />

            <LeadTableSection
                leads={leads}
                onConcluir={(
                        async () => {
                            await fetchLeads()
                        }
                    )
                }
                total={totalAtual}
                ocultarParceiro={filters.interesse === "Revenda"}
            />

            {totalPages > 1 && (
                <div className="mt-6">
                    <PaginationControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </main>
    )
}

export default Page
