import { Card, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar, LucideMegaphone, Users, Zap } from "lucide-react"
import LeadTableRow from "./card-lead"
import { Lead } from "@/data/lead"

interface LeadTableSectionProps {
    leads: Lead[]
    title?: string
    subtitle?: string
    onConcluir: () => void
}

export const LeadTableSection: React.FC<LeadTableSectionProps> = ({
                                                                      leads,
                                                                      title = "Leads ativos",
                                                                      subtitle = "Todos os leads ativos",
                                                                      onConcluir,
                                                                  }) => {
    return (
        <div className="pt-4">
            <Card className="border-0 shadow-sm">
                <CardContent>
                    <div className="pb-5 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">
                            {leads.length} {title}
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
                                <TableHead className="text-gray-600 font-medium pl-6">
                                    Parceiro
                                </TableHead>
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
                                <LeadTableRow
                                    key={lead.id}
                                    lead={lead}
                                    onConcluir={onConcluir}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
