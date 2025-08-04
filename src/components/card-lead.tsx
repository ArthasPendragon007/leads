// components/CardLead.tsx

import { Lead } from "@/data/lead"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface CardLeadProps {
    lead: Lead
}

export const CardLead: React.FC<CardLeadProps> = ({ lead }) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{lead.nome}</CardTitle>
                <CardDescription>{lead.email}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-gray-700">
                <p><strong>CNPJ:</strong> {lead.cnpj}</p>
                <p><strong>Telefone:</strong> {lead.telefone}</p>
                <p><strong>Interesse:</strong> {lead.interesse}</p>
                <p><strong>Origem:</strong> {lead.origem}</p>
                <p><strong>Fonte:</strong> {lead.fonte}</p>
                <p><strong>Meio:</strong> {lead.meio}</p>
                <p><strong>Anúncio:</strong> {lead.anuncio}</p>
                <p><strong>Status:</strong> {lead.status}</p>
                <p><strong>Data:</strong> {new Date(lead.dataHora).toLocaleString()}</p>
            </CardContent>

            <CardFooter className="flex justify-end">
                <CardAction>
                    <button className="inline-flex items-center gap-2 text-green-600 hover:underline">
                        <CheckCircle className="w-4 h-4" />
                        Marcar como concluído
                    </button>
                </CardAction>
            </CardFooter>
        </Card>
    )
}
