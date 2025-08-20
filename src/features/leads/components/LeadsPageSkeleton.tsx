// @/features/leads/components/LeadsPageSkeleton.tsx
"use client";

import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export const LeadsPageSkeleton: React.FC = () => {
    return (
        <main className="min-h-screen min-w-[450px] p-8 bg-background animate-pulse">
            {/* Título da Página */}
            <div className="mb-6">
                <Skeleton className="h-8 w-48 mb-2 bg-muted" />
                <Skeleton className="h-4 w-64 bg-muted" />
            </div>

            {/* Cards do topo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg shadow-sm p-6 flex flex-col justify-between">
                        {/* Contêiner para o cabeçalho do card */}
                        <div className="flex items-start justify-between w-full mb-10 mt-2">
                            {/* Contêiner para o texto */}
                            <div>
                                <Skeleton className="h-4 w-24 mb-2 bg-muted pt-2 mt-4" />
                                <Skeleton className="h-8 w-32 bg-muted mt-8" />
                            </div>
                            {/* Esqueleto do ícone (círculo) */}
                            <Skeleton className="h-10 w-10 rounded-md bg-muted" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-9 w-32 rounded-md bg-muted" />
                ))}
            </div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Skeleton className="h-10 w-48 rounded-md bg-muted" />
                <Skeleton className="h-10 w-48 rounded-md bg-muted" />
                <Skeleton className="h-10 w-32 rounded-md bg-muted" />
            </div>

            {/* Card da tabela */}
            <div className="mt-6">
                <div className="bg-card border border-border rounded-lg shadow-sm">
                    {/* Título e subtítulo */}
                    <div className="p-6">
                        <Skeleton className="h-5 w-40 mb-2 bg-muted" />
                        <Skeleton className="h-4 w-32 bg-muted" />
                    </div>
                    {/* Header da tabela */}
                    <div className="flex px-6 py-3 gap-9 border-t border-b border-border">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex-1">
                                <Skeleton className="h-4 w-full bg-muted" />
                            </div>
                        ))}
                    </div>
                    {[...Array(10)].map((_, idx) => (
                        <div key={idx} className="flex border-b border-border align-middle hover:bg-muted transition-colors duration-200 last:border-b-0">
                            {/* Célula de Contato */}
                            <div className="flex-1 py-4 pl-6 pr-2 whitespace-nowrap flex items-center gap-2">
                                <Skeleton className="h-10 w-10 rounded-full bg-muted" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-32 mb-1 bg-muted" />
                                    <Skeleton className="h-4 w-40 bg-muted" />
                                </div>
                            </div>

                            {/* Célula de Origem */}
                            <div className="flex-1 py-4 px-2 text-center whitespace-nowrap">
                                <Skeleton className="h-6 w-20 rounded-full mx-auto bg-muted" />
                            </div>

                            {/* Célula de Anúncio */}
                            <div className="flex-1 py-4 px-2 text-center whitespace-nowrap">
                                <Skeleton className="h-4 w-24 mx-auto bg-muted" />
                            </div>

                            {/* Célula de Parceiro */}
                            <div className="flex-1 py-4 px-2 text-center whitespace-nowrap">
                                <Skeleton className="h-10 w-32 rounded-md mx-auto bg-muted" />
                            </div>

                            {/* Célula de Interesse */}
                            <div className="flex-1 py-4 px-2 text-center whitespace-nowrap">
                                <Skeleton className="h-10 w-24 rounded-md mx-auto bg-muted" />
                            </div>

                            {/* Célula de Ações */}
                            <div className="flex-1 py-4 px-2 text-center whitespace-nowrap">
                                <Skeleton className="h-10 w-24 rounded-md mx-auto bg-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};