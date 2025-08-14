// @/features/leads/hooks/useUpdateLead.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putLeads } from "@/features/leads/service/leadsService";
import { Lead } from "@/entities/lead";



export const useUpdateLead = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Lead) => putLeads("/atualizar", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
            onSuccessCallback?.();
        },
    });
};