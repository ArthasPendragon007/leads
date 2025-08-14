// @/components/leads/LeadsContactCell.tsx
import { LeadsAvatar } from "@/components/leads/LeadsAvatar";
import { CopyText } from "@/components/shared/CopyText";
import { Lead } from "@/entities/lead";
import { formatarCpfCnpj } from "@/lib/formatters/documentFormatters";
import React from "react";

interface LeadsContactCellProps {
    lead: Lead;
}

export const LeadsContactCell: React.FC<LeadsContactCellProps> = ({ lead }) => (
    <div className="flex items-center space-x-3 text-left pl-6">
        <LeadsAvatar nome={lead.nome} interesse={lead.interesse} />
        <div className="space-y-2">
            {lead.nome?.trim() && <CopyText text={lead.nome} className="font-semibold" />}
            {lead.email?.trim() && <CopyText text={lead.email} />}
            {lead.cnpj?.trim() && <CopyText text={formatarCpfCnpj(lead.cnpj)} />}
        </div>
    </div>
);