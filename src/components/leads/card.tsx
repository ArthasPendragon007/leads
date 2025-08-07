import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import {Check, RotateCw} from "lucide-react"
import {Lead} from "@/entities/lead";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useState} from "react";
import {CopyText} from "@/components/shared/copyText";
import {Input} from "@/components/ui/input";
import {putLeads} from "@/features/leads/service/lead_service";
import {limparTexto} from "@/features/leads/utils/formatters";

interface LeadTableRowProps {
    lead: Lead
    onConcluir: () => void
    ocultarParceiro: boolean|undefined
}

const LeadCard: React.FC<LeadTableRowProps> = ({ lead: initialLead, onConcluir, ocultarParceiro }) => {
    const [lead, setLead] = useState<Lead>(initialLead);

    const handleChange = async (campo: keyof Lead, valor: any) => {
        const leadAtualizado = { ...lead, [campo]: valor };

        setLead(leadAtualizado); // Otimismo

        try {
            await putLeads(leadAtualizado);
            onConcluir();
        } catch (error) {
            console.error("Erro ao atualizar lead:", error);
            setLead(lead); // Reverte em caso de erro
        }
    };


    const formatFonteMeio = (fonte?: string, meio?: string): string => {
        if (!fonte && !meio) return "";

        const clean = (text: string) =>
            text.trim().toLowerCase().replace(/\s+/g, "");

        if (fonte && meio && clean(fonte) === clean(meio)) {
            return `${fonte}`;
        }

        if (fonte && meio) {
            return `${fonte} (${meio})`;
        }

        return fonte || meio || "";
    };
    return (
        <TableRow key={lead.id} className="border-gray-200">
            <TableCell>
                <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback
                            className={`${lead.interesse === "revenda" ? "bg-blue-400" : "bg-orange-300"} text-white font-medium`}
                        >
                            {typeof lead.nome === 'string' && lead.nome.length > 0
                                ? lead.nome[0].toUpperCase()
                                : "?"}                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        {lead.nome?.trim() && <CopyText text={lead.nome} className="font-bold" />}
                        {lead.email?.trim() && <CopyText text={lead.email} />}
                        {lead.cnpj?.trim() && <CopyText text={formatarDocumento(lead.cnpj)} />}
                    </div>
                </div>
            </TableCell>

            <TableCell>
<span className="text-gray-900">
  {formatFonteMeio(lead.fonte, lead.meio)}
</span>
            </TableCell>

            <TableCell>
                <span className="text-blue-600">{lead.anuncio}</span>
            </TableCell>
            {!ocultarParceiro && (
                <TableCell className="align-middle">
                <Input
                defaultValue={lead.parceiro}
            onBlur={(e) => handleChange("parceiro", e.target.value)}
            className="flex w-40 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-8 text-sm"
            disabled={lead.interesse === 'revenda'}
        />
</TableCell>
)}



            <TableCell>
                <Select
                    value={limparTexto(lead.interesse.toLowerCase())}
                    onValueChange={(value) => handleChange("interesse", value)}
                >
                    <SelectTrigger className={
                        `
  px-2 py-1 text-sm rounded-full border
  ${lead.interesse === "revenda"
                            ? "border-blue-200 text-black bg-blue-50"
                            : "border-orange-200 text-black bg-orange-50"}
  hover:opacity-90 transition-all
`}>
                        <SelectValue placeholder="Selecione o interesse" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="revenda">Revenda</SelectItem>
                        <SelectItem value="utilizacao">Utilização</SelectItem>
                    </SelectContent>
                </Select>


            </TableCell>

            <TableCell>
        <span className="text-gray-600">
{new Date(lead.dataHora).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
})}
        </span>
            </TableCell>
            <TableCell>
                <Button
                    size="sm"
                    variant="ghost"
                    className={
                        lead.status === "concluido"
                            ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                    }
                    onClick={ () =>   handleChange("status", lead.status === "concluido" ? "pendente" : "concluido")}
                >
                    {lead.status === "concluido" ? (
                        <>
                            <RotateCw className="w-4 h-4 mr-1" />
                            Voltar para Ativo
                        </>
                    ) : (
                        <>
                            <Check className="w-4 h-4 mr-1" />
                            Concluir
                        </>
                    )}
                </Button>

            </TableCell>
        </TableRow>
    )
}

export default LeadCard


export function formatarDocumento(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
        // CPF: 000.000.000-00
        return apenasNumeros.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
        );
    }

    if (apenasNumeros.length === 14) {
        // CNPJ: 00.000.000/0000-00
        return apenasNumeros.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
        );
    }

    return valor; // Se não for válido, retorna original
}
