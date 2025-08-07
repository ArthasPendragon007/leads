"use client"

import { Users } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"

interface LeadsDashboardCardProps {
    icon?: React.ReactNode
    subtitle: string
    value: string | number
}

const LeadsDashboardCard: React.FC<LeadsDashboardCardProps> = ({
                                                                   icon = <Users className="w-5 h-5 text-purple-800" />,
                                                                   subtitle,
                                                                   value,
                                                               }) => {
    return (
        <Card className="rounded-lg text-card-foreground bg-white border shadow-sm hover:shadow-md transition-all duration-300">
            <div className="pr-6 pl-6">
            <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
                <CardDescription className="tracking-tight text-sm font-medium text-gray-600">{subtitle}</CardDescription>
                <div className="p-2 bg-purple-100 rounded-lg">{icon}</div>
            </CardHeader>
            </div>
            <CardContent className="p-6 pt-0">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </CardContent>
        </Card>
    )
}

export default LeadsDashboardCard
