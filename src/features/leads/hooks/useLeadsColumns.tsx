import React, {useMemo} from "react";
import {BriefcaseIcon, Calendar, HandshakeIcon, LucideMegaphone, MoreVertical, Users, Zap,} from "lucide-react";

// Metadados das colunas
const columnMeta = {
    contato: { label: "Contato", icon: <Users className="w-4 h-4" />, width: 40, minWidth: 1 },
    origem: { label: "Origem", icon: <Zap className="w-4 h-4" />, width: 20, minWidth: 10 },
    anuncio: { label: "Anúncio", icon: <LucideMegaphone className="w-4 h-4" />, width: 12, minWidth: 10 },
    parceiro: { label: "Parceiro", icon: <HandshakeIcon className="w-4 h-4" />, width: 12, minWidth: 10 },
    interesse: { label: "Interesse", icon: <BriefcaseIcon className="w-4 h-4" />, width: 12, minWidth: 10 },
    data: { label: "Data", icon: <Calendar className="w-4 h-4" />, width: 10, minWidth: 10 },
    acoes: { label: "Ações", icon: <MoreVertical className="w-4 h-4" />, width: 10, minWidth: 10 },
} as const;

export type ColumnId = keyof typeof columnMeta;

export interface DynamicColumn {
    id: ColumnId;
    label: string;
    icon?: React.ReactNode;
    width: number;
    minWidth?: number;
    hide?: boolean;
}

type ColumnMode = "table" | "card";

export const useLeadsColumns = (ocultarParceiro?: boolean, mode: ColumnMode = "table") => {
    return useMemo<DynamicColumn[]>(() => {
        const allColumns: DynamicColumn[] = (Object.entries(columnMeta) as [ColumnId, typeof columnMeta[ColumnId]][])
            .map(([id, meta]) => ({
                id,
                label: meta.label,
                icon: meta.icon,
                width: meta.width,
                minWidth: meta.minWidth,
                hide: id === "parceiro" && ocultarParceiro,
            }));

        const visibleColumns = allColumns.filter((col) => !col.hide);

        const totalWeight = visibleColumns.reduce((sum, col) => sum + col.width, 0);

        return visibleColumns.map((col) => ({
            ...col,
            width: mode === "card" ? (col.width / totalWeight) * 100 : (col.width / totalWeight) * 100,
            minWidth: mode === "card" ? undefined : col.minWidth,
        }));
    }, [ocultarParceiro, mode]);
};
