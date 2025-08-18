// @/features/leads/hooks/usePollinglLeads.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

export function usePollinglLeads(
    filters: Filters,
    activeTab: string,
    currentPage: number,
    pageSize: number
) {
    const [errorCount, setErrorCount] = useState(0);
    const [refetchEnabled, setRefetchEnabled] = useState(true);

    // Mude a definição da queryKey para usar as propriedades individuais dos filtros
    const queryKey = [
        "leads",
        filters.busca,
        filters.origem,
        filters.interesse,
        activeTab,
        currentPage,
    ] as const;

    const query: UseQueryResult<LeadsResponse, Error> = useQuery<
        LeadsResponse,
        Error,
        LeadsResponse,
        typeof queryKey
    >({
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

        refetchInterval: refetchEnabled ? 100000 : false,
        retry: 2,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if (query.isError) {
            setErrorCount(prev => prev + 1);
        } else if (query.isSuccess) {
            setErrorCount(0);
        }
    }, [query.isError, query.isSuccess]);

    useEffect(() => {
        if (errorCount >= 2) {
            setRefetchEnabled(false);
        } else {
            setRefetchEnabled(true);
        }
    }, [errorCount, filters, activeTab, currentPage]);


    return {
        leads: query.data?.leads ?? [],
        leadsContagem: query.data?.leadsContagem,
        totalPages: query.data?.totalPages ?? 0,
        isInitialLoading: query.isInitialLoading,
        isFetching: query.isFetching,
        errorBool: query.isError,
        refetch: query.refetch,
    };
}