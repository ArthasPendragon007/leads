// @/features/leads/hooks/useUpdateLead.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putLeads } from "@/features/leads/service/leadsService";
import { Lead } from "@/entities/lead";
import { useUndoManager } from "@/features/undo/hooks/useUndoManager";

// O payload da mutação agora inclui oldData e newData
interface LeadMutationPayload {
    oldData: Lead
    newData: Lead;
}

export const useUpdateLead = ({ onSuccess }: { onSuccess?: () => void }) => {
    const queryClient = useQueryClient();
    const { registerUndoableAction } = useUndoManager();

    return useMutation({
        mutationFn: ({ newData }: LeadMutationPayload) => putLeads("/atualizar", newData),
        onMutate: async ({ oldData, newData }) => {
            const undoableAction = {
                type: 'updateLead',
                oldData: oldData,
                newData: newData,
            };
            registerUndoableAction(undoableAction);

            return { oldData, newData };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
            onSuccess?.();
        },
        onError: () => {
            // Em caso de erro, você pode querer reverter o estado
            // e mostrar um toast de erro.
        },
    });
};