// src/features/municipios/hooks/useMunicipios.ts
"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getMunicipios } from "@/features/municipios/services/municipiosServices";
import { Municipio } from "@/entities/municipio";


async function fetchMunicipios(search: string): Promise<Municipio[]> {
    if (!search || search.trim().length < 2) return [];

    const data = await getMunicipios<any[]>(search);

    const searchTermLower = search.trim().toLowerCase();

    const mappedData = data.map((m) => {
        const uf = m?.microrregiao?.mesorregiao?.UF?.sigla ?? "";
        return {
            id: m.id,
            nome: m.nome,
            microrregiao: m.microrregiao,
            label: uf ? `${m.nome} - ${uf}` : m.nome,
        };
    });

    const filteredData = mappedData.filter(m =>
        m.label.toLowerCase().includes(searchTermLower)
    );

    return filteredData.slice(0, 200);
}

export function useMunicipios(search: string) {
    const queryKey = ["municipios", search];

    const query: UseQueryResult<Municipio[], Error> = useQuery({
        queryKey,
        queryFn: () => fetchMunicipios(search),
        staleTime: 5 * 60 * 1000, // 5 minutos
        refetchOnWindowFocus: false,
        enabled: search.trim().length >= 2,
    });

    return {
        municipios: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    };
}