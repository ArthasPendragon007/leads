import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import {Check, Copy, RotateCw} from "lucide-react"
import {Lead} from "@/data/lead";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useState} from "react";
import {CopyText} from "@/components/copyText";
import {putLeads} from "@/service/lead/lead_service";
import {Input} from "@/components/ui/input";

interface LeadTableRowProps {
    lead: Lead
    onConcluir: (status: string) => void
}
function limparTexto(texto: string): string {
    return texto
        .normalize("NFD") // separa caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // remove os acentos
        .replace(/ç/g, "c") // substitui 'ç'
        .replace(/Ç/g, "C") // substitui 'Ç'
        .replace(/[^a-zA-Z0-9 ]/g, ""); // remove todos os caracteres especiais restantes
}
const LeadTableRow: React.FC<LeadTableRowProps> = ({ lead: initialLead, onConcluir }) => {
    const [lead, setLead] = useState<Lead>(initialLead);
    const toggleStatus = async () => {
        const novoStatus = lead.status === "concluido" ? "pendente" : "concluido";

        const leadAtualizado = { ...lead, status: novoStatus };
        setLead(leadAtualizado);

        try {
            await putLeads(leadAtualizado);
            onConcluir(novoStatus);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            // opcional: reverter status em caso de erro
            setLead(lead);
        }
    };
    const handleInteresseChange = async (novoInteresse: string) => {
        const leadAtualizado = { ...lead, interesse: novoInteresse };
        setLead(leadAtualizado);

        try {
            await putLeads(leadAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar interesse:", error);
            // opcional: reverter interesse em caso de erro
            setLead(lead);
        }
    };

    const handleParceiroChange = async (novoParceiro: string) => {
        const leadAtualizado = { ...lead, parceiro: novoParceiro };
        setLead(leadAtualizado);

        try {
            await putLeads(leadAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar parceiro:", error);
            // opcional: reverter interesse em caso de erro
            setLead(lead);
        }
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
                <span className="text-gray-900">{lead.fonte}</span>
            </TableCell>

            <TableCell>
                <span className="text-blue-600 hover:underline cursor-pointer">{lead.anuncio}</span>
            </TableCell>
            <TableCell>
                <Input
                    defaultValue={lead.parceiro}
                    onBlur={(e) => handleParceiroChange(e.target.value)}
                    className="text-gray-900"
                />
            </TableCell>

            <TableCell>
                <Select
                    value={limparTexto(lead.interesse.toLowerCase())}
                    onValueChange={handleInteresseChange}
                >
                    <SelectTrigger
                        className={`
      px-2 py-1 text-sm rounded-full border
      ${lead.interesse.toLowerCase() === "revenda"
                            ? "border-blue-200 text-black bg-blue-50"
                            : "border-orange-200 text-black bg-orange-50"}
      hover:opacity-90 transition-all
    `}
                    >
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
                    onClick={toggleStatus}
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

export default LeadTableRow


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
