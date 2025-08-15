import React, {useMemo} from "react";
import {BriefcaseIcon, Calendar, HandshakeIcon, LucideMegaphone, MoreVertical, Users, Zap,} from "lucide-react";

// Interface para definir cada coluna
export interface DynamicColumn {
    id: string;
    label: string;
    icon?: React.ReactNode;
    width: number;       // proporção inicial
    minWidth?: number;   // largura mínima
    hide?: boolean;      // usado para ocultar dinamicamente
}

const columnLayouts = {
    contato: { width: 30, minWidth: 600 },
    origem: { width: 15, minWidth: 225 },
    anuncio: { width: 12, minWidth: 240 },
    parceiro: { width: 15, minWidth: 200 },
    interesse: { width: 15, minWidth: 150 },
    data: { width: 12, minWidth: 140 },
    acoes: { width: 15, minWidth: 150 },
};

const iconSize = "w-4 h-4";
const getIcon = (Icon: React.ElementType, color?: string) => (
    <Icon className={`${iconSize} ${color || ""}`} />
);

export const useLeadsColumns = (ocultarParceiro?: boolean) => {
    return useMemo<DynamicColumn[]>(() => {
        const baseColumns: DynamicColumn[] = [
            {
                id: "contato",
                label: "Contato",
                icon: getIcon(Users),
                width: columnLayouts.contato.width,
                minWidth: columnLayouts.contato.minWidth,
            },
            {
                id: "origem",
                label: "Origem",
                icon: getIcon(Zap, ),
                width: columnLayouts.origem.width,
                minWidth: columnLayouts.origem.minWidth,
            },
            {
                id: "anuncio",
                label: "Anúncio",
                icon: getIcon(LucideMegaphone, ),
                width: columnLayouts.anuncio.width,
                minWidth: columnLayouts.anuncio.minWidth,
            },
            {
                id: "parceiro",
                label: "Parceiro",
                icon: getIcon(HandshakeIcon, ),
                width: columnLayouts.parceiro.width,
                minWidth: columnLayouts.parceiro.minWidth,
                hide: ocultarParceiro,
            },
            {
                id: "interesse",
                label: "Interesse",
                icon: getIcon(BriefcaseIcon, ),
                width: columnLayouts.interesse.width,
                minWidth: columnLayouts.interesse.minWidth,
            },
            {
                id: "data",
                label: "Data",
                icon: getIcon(Calendar),
                width: columnLayouts.data.width,
                minWidth: columnLayouts.data.minWidth,
            },
            {
                id: "acoes",
                label: "Ações",
                icon: getIcon(MoreVertical),
                width: columnLayouts.acoes.width,
                minWidth: columnLayouts.acoes.minWidth,
            },
        ];

        // Oculta colunas com hide=true
        const visibleColumns = baseColumns.filter(col => !col.hide);

        // Calcula a largura proporcional baseada apenas nas colunas visíveis
        const totalVisibleWidth = visibleColumns.reduce(
            (sum, col) => sum + col.width,
            0
        );

        return visibleColumns.map(col => ({
            ...col,
            width: (col.width / totalVisibleWidth) * 100, // converte para %
        }));
    }, [ocultarParceiro]);
};
