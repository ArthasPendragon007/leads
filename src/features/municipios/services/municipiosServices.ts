// src/features/municipios/services/municipiosServices.ts
import { apiIBGE } from "@/api/api_municipio";
import { AxiosRequestConfig } from "axios";

async function apiRequest<TResponse>(
    method: "get",
    url: string,
    config?: AxiosRequestConfig
): Promise<TResponse> {
    const response = await apiIBGE.request<TResponse>({
        method,
        url,
        ...config,
    });
    return response.data;
}

/**
 * Busca municípios filtrados pelo nome ou UF.
 */
export function getMunicipios<T>(search?: string) {
    const query = search && search.trim().length > 0
        ? `?${encodeURIComponent(search)}&orderBy=nome`
        : "?orderBy=nome";

    return apiRequest<T>("get", `/municipios${query}`);
}
