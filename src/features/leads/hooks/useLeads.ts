// src/hooks/useLeads.ts
import { useQuery } from "@tanstack/react-query";
import { Lead } from "@/entities/lead";
import { LeadContagem } from "@/entities/leadsContagem";
import { getLeads } from "@/features/leads/service/leadsService";
import { calcularContagem } from "@/features/leads/utils/calcularContagem";

interface Filters {
    busca: string;
    origem: string;
    interesse: string;
}

interface LeadsResponse {
    leads: Lead[];
    leadsContagem: LeadContagem;
    totalPages: number;
}

export function useLeads(
    filters: Filters,
    activeTab: string,
    currentPage: number,
    pageSize: number
) {
    // Define as query keys para invalidar e refazer fetch quando filtros mudarem
    const queryKey = ["leads", filters, activeTab, currentPage];

    const query = useQuery<LeadsResponse>({
        queryKey,
        queryFn: async () => {
            const params = {
                PageNumber: currentPage,
                PageSize: pageSize,
                FiltroBusca: filters.busca || null,
                FiltroFonte: filters.origem !== "todas-origens" ? filters.origem : null,
                FiltroInteresse: filters.interesse !== "todos-tipos" ? filters.interesse : null,
                FiltroStatus: activeTab === "concluidos" ? "concluido" : "pendente",
            };

            const [leadsData, contagemData] = await Promise.all([
                getLeads<Lead[]>("/pegarTudoPaginado", params),
                getLeads<LeadContagem>("/pegarDados", params),
            ]);

            return {
                leads: leadsData,
                leadsContagem: contagemData,
                totalPages: calcularContagem(contagemData, filters.interesse, pageSize),
            };
        },
        refetchInterval: 15000, // 🔄 Polling a cada 15 segundos
        refetchOnWindowFocus: true, // ✅ Revalida quando volta para a aba
        retry: 2, // Tenta 2 vezes se der erro
    });

    return {
        leads: query.data?.leads ?? [],
        leadsContagem: query.data?.leadsContagem,
        totalPages: query.data?.totalPages ?? 0,
        loading: query.isLoading,
        errorBool: query.isError,
        refetch: query.refetch, // pode usar manualmente se precisar
    };
}
