"use client"

import React, { useEffect, useState } from "react"
import LeadsDashboard from "@/components/dashboard-lead"
import { TabsLead } from "@/components/tabs-lead"
import { Lead, TabType } from "@/data/lead"
import { LeadTableSection } from "@/components/tablesection-lead"
import { getLeads } from "@/service/lead/lead_service"
import { LeadContagem } from "@/data/leads-contagem"

interface Filters {
    nome?: string
    origem?: string
    interesse?: string
}

const Page: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("pendentes")
    const [filters, setFilters] = useState<Filters>({
        nome: "",
        origem: "todas-origens",
        interesse: "Revenda",
    })
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [leadsContagem, setLeadsContagem] = useState<LeadContagem>()

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 10

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    const handleFilterChange = (newFilters: Filters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true)
            try {
                const params = {
                    PageNumber: currentPage,
                    PageSize: pageSize,
                    FiltroNome: filters.nome || null,
                    FiltroFonte: filters.origem === "todas-origens" ? null : filters.origem,
                    FiltroInteresse: filters.interesse === "todos-tipos" ? null : filters.interesse,
                    FiltroStatus: activeTab === "concluidos" ? "concluido" : "pendente",
                }

                const data:Lead[] = await getLeads("/pegarTudoPaginado", params)

                setLeads(data)
            } catch (error) {
                console.error("Erro ao buscar leads:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeads()
    }, [filters, activeTab, currentPage])

    useEffect(() => {
        const fetchLeadsContagem = async () => {
            setLoading(true)
            try {
                const data: LeadContagem = await getLeads("/pegarDados")
                setLeadsContagem(data)
            } catch (error) {
                console.error("Erro ao buscar leads:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLeadsContagem()
    }, [])

    return (
        <main className="min-h-screen p-6 bg-gray-100">
            <header className="p-2">
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">
                    Gerencie e visualize todos os leads das suas campanhas
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LeadsDashboard subtitle="Leads Ativos" value={leadsContagem?.ativo ?? 0} />
                <LeadsDashboard subtitle="Leads Revenda" value={leadsContagem?.revenda ?? 0} />
                <LeadsDashboard subtitle="Leads Utilização" value={leadsContagem?.utilizacao ?? 0} />
            </div>

            <TabsLead
                activeTab={activeTab}
                onChange={handleTabChange}
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            <LeadTableSection leads={leads} onConcluir={() => ""} />

            {/* Pagination aparece apenas se houver mais de 1 página */}
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
