// @/features/leads/hooks/usePollingLeads.ts
"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { Lead } from "@/entities/lead";
import { LeadContagem } from "@/entities/leadsContagem";
import { getLeads } from "@/features/leads/service/leadsService";
import { calcularContagem } from "@/features/leads/utils/calcularContagem";

export interface Filters {
    busca: string;
    origem: string;
    interesse: string;
}

export interface LeadsResponse {
    leads: Lead[];
    leadsContagem: LeadContagem;
    totalPages: number;
}

// ----- funções puras ----- //
function buildParams(
    filters: Filters,
    activeTab: string,
    currentPage: number,
    pageSize: number
) {
    return {
        PageNumber: currentPage,
        PageSize: pageSize,
        FiltroBusca: filters.busca || null,
        FiltroFonte: filters.origem !== "todas-origens" ? filters.origem : null,
        FiltroInteresse:
            filters.interesse !== "todos-tipos" ? filters.interesse : null,
        FiltroStatus: activeTab === "concluidos" ? "concluido" : "pendente",
    };
}

async function fetchLeadsData(
    filters: Filters,
    activeTab: string,
    currentPage: number,
    pageSize: number
): Promise<LeadsResponse> {
    const params = buildParams(filters, activeTab, currentPage, pageSize);

    const [leadsData, contagemData] = await Promise.all([
        getLeads<Lead[]>("/pegarTudoPaginado", params),
        getLeads<LeadContagem>("/pegarDados", params),
    ]);

    return {
        leads: leadsData,
        leadsContagem: contagemData,
        totalPages: calcularContagem(contagemData, pageSize),
    };
}

// ----- hook principal ----- //
export function usePollingLeads(
    filters: Filters,
    activeTab: string,
    currentPage: number,
    pageSize: number
) {
    // Opcional: use o estado de erro para controlar o polling, se necessário
    const [isPolling, setIsPolling] = useState(true);

    const queryKey = useMemo(
        () => ["leads", filters, activeTab, currentPage] as const,
        [filters, activeTab, currentPage]
    );

    const query: UseQueryResult<LeadsResponse, Error> = useQuery({
        queryKey,
        queryFn: () => fetchLeadsData(filters, activeTab, currentPage, pageSize),
        // O refetchInterval pode ser uma função para maior controle.
        // Ele pode, por exemplo, aumentar o intervalo em caso de erro.
        refetchInterval: isPolling ? 15000 : false,
        refetchOnWindowFocus: true,
        enabled: pageSize > 0 && isPolling,
    });

    useEffect(() => {
        if (query.isError) {
            setIsPolling(false); // Para o polling em caso de erro
        } else if (query.isSuccess) {
            setIsPolling(true); // Restaura o polling se a busca for bem-sucedida
        }
    }, [query.isError, query.isSuccess, query.error]);

    return {
        leads: query.data?.leads ?? [],
        leadsContagem: query.data?.leadsContagem,
        totalPages: query.data?.totalPages ?? 0,
        isFetching: query.isFetching,
        isError: query.isError,
        refetch: query.refetch,
    };
}