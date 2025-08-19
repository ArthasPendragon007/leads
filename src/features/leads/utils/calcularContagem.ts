import {LeadContagem} from "@/entities/leadsContagem";

export const calcularContagem = (
    contagem: LeadContagem | undefined,
    pageSize: number,

): number => {
    if (!contagem) return 1;

    const count = contagem.qntLeadsFiltrado;

    return count ? Math.ceil(count / pageSize) : 1;
};
