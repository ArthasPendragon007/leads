// src/services/leadsService.ts
import {apiLead} from "@/api/api_leads";
import {AxiosRequestConfig} from "axios";

/**
 * Função genérica para requisições à API de leads.
 * @param method - Método HTTP
 * @param url - Caminho da rota
 * @param body - Corpo da requisição (opcional)
 * @param config - Configuração extra do Axios (opcional)
 */
export async function apiRequest<TResponse, TBody = unknown>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig
): Promise<TResponse> {
    const response = await apiLead.request<TResponse>({
        method,
        url,
        ...(body && { data: body }), // só envia "data" se existir body
        ...config,
    });

    return response.data;
}

/**
 * Busca lista de leads
 */
export function getLeads<T>(url?: string, params?: Record<string, unknown>) {
    return apiRequest<T>("get", `/leads${url}`, undefined, { params });
}

/**
 * Atualiza dados de um lead
 */
export function putLeads<TResponse, TBody = unknown>(
    url: string,
    body: TBody
) {
    return apiRequest<TResponse, TBody>("put", `/leads${url}`, body);
}
