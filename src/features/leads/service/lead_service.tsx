// src/services/getLeads.ts
import { Lead } from "@/entities/lead";
import { apiLead } from "@/api/api_leads";
import {AxiosResponse} from "axios";
import * as url from "node:url";

export async function getLeads<T>(
    url: string,
    params?: Record<string, any>
): Promise<T> {
    const response = await apiLead.get<T>("/leads" + url, {
        params: params,
    });

    return response.data;
}




export async function putLeads(params: Lead): Promise<AxiosResponse<void>> {

    const response = await apiLead.put<void>("/leads/atualizar", params);

    return response;
}

