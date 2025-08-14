import {LeadContagem} from "@/entities/leadsContagem";

export const calcularContagem = (
    contagem: LeadContagem | undefined,
    interesse: string,
    pageSize: number
): number => {
    if (!contagem) return 1;

    const count =
        interesse === "Revenda"
            ? contagem.revenda
            : interesse === "Utilização"
                ? contagem.utilizacao
                : contagem.ativo;

    return count ? Math.ceil(count / pageSize) : 1;
};
