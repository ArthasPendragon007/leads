import { Card, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar, LucideMegaphone, Users, Zap } from "lucide-react"
import LeadCard from "./card"
import { Lead } from "@/entities/lead"

interface LeadTableSectionProps {
    leads: Lead[]
    title?: string
    subtitle?: string
    total?: number
    onConcluir: () => void
    ocultarParceiro?: boolean

}

export const LeadTableSection: React.FC<LeadTableSectionProps> = ({
                                                                      leads,
                                                                      title = "Leads ativos",
                                                                      subtitle = "Todos os leads ativos",
                                                                      onConcluir,
                                                                      total,
                                                                      ocultarParceiro,

}) => {
    return (
        <div className="pt-4">
            <Card className="border-0 shadow-sm">
                <CardContent>
                    <div className="pb-5 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">
                            {total} {title}
                        </h3>
                        <p className="text-sm text-gray-600">{subtitle}</p>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-200">
                                <TableHead className="text-gray-600 font-medium pl-18">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4" />
                                        <span>Contato</span>
                                    </div>
                                </TableHead>
                                <TableHead className="text-gray-600 font-medium">
                                    <div className="flex items-center space-x-2">
                    <span className="text-yellow-600">
                      <Zap className="w-4 h-4" />
                    </span>
                                        <span>Origem</span>
                                    </div>
                                </TableHead>
                                <TableHead className="text-gray-600 font-medium">
                                    <div className="flex items-center space-x-1">
                    <span className="text-blue-500">
                      <LucideMegaphone className="w-4 h-4" />
                    </span>
                                        <span>Anúncio</span>
                                    </div>
                                </TableHead>
                                {!ocultarParceiro
                                    && (
                                    <TableHead className="text-gray-600 font-medium pl-6">
                                        Parceiro
                                    </TableHead>
                                )}
                                <TableHead className="text-gray-600 font-medium pl-6">
                                    Interesse
                                </TableHead>
                                <TableHead className="text-gray-600 font-medium">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Data</span>
                                    </div>
                                </TableHead>
                                <TableHead className="text-gray-600 font-medium pl-10">
                                    Ações
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <LeadCard
                                    key={lead.id}
                                    lead={lead}
                                    onConcluir={onConcluir}
                                    ocultarParceiro={ocultarParceiro}

                                />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
