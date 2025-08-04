"use client"

import React, {useState} from "react"
import LeadsDashboard from "@/components/dashboard-lead"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { TabType } from "@/data/lead";
import {LucideCircleCheckBig, Search, Users} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


const Page: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("pendentes")
    const [searchName, setSearchName] = useState<string>("")
    const [searchPartner, setSearchPartner] = useState<string>("")

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab)
    }
    const handleSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchName(event.target.value)
    }

    const handleSearchPartnerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchPartner(event.target.value)
    }
    return (
        <main className="min-h-screen p-6 bg-gray-100">
            <header className="p-2">
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">Gerencie e visualize todos os leads das suas campanhas</p>
            </header>
            <body>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LeadsDashboard subtitle="Leads Ativos" value={123} />
                <LeadsDashboard subtitle="Leads Revenda" value={45} />
                <LeadsDashboard subtitle="Leads Utilização" value={78} />
            </div>

            {/* Tabs */}
            <nav className="flex space-x-2 pt-8">
                <Button
                    variant={activeTab === "concluidos" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleTabChange("concluidos")}
                    className={`${
                        activeTab === "concluidos"
                            ? "bg-black text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    } transition-colors duration-200`}
                >
                    <Users className="h-4 w-4 mr-2" />
                    Leads Ativos
                </Button>
                <Button
                    variant={activeTab === "pendentes" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleTabChange("pendentes")}
                    className={`${
                        activeTab === "pendentes"
                            ? "bg-black text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    } transition-colors duration-200`}
                >
                    <LucideCircleCheckBig className="h-5 w-5 mr-1" />
                    Leads Concluídos
                </Button>
            </nav>
            {/* Filters */}
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <Input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                            placeholder="Buscar por nome..."
                        />
                    </div>
                    <div>
                        <Select defaultValue="todas-origens">
                        <SelectTrigger className="flex h-1 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[160px]">
                            <SelectValue placeholder="Todas as Origens" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas-origens">Todas as Origens</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div>
                        <Select defaultValue="revenda">
                            <SelectTrigger className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[160px]">
                                <SelectValue placeholder="Revenda"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos-tipos">Todos os Tipos</SelectItem>
                                <SelectItem value="revenda">Revenda</SelectItem>
                                <SelectItem value="utilizacao">Utilização</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
            </div>

            </body>
        </main>
    )
}

export default Page
