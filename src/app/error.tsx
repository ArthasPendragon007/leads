"use client";

import Link from "next/link";
import { TriangleAlert, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const isTimeout = error.message.includes("Timeout");
    const isGenericApiError = error.message === "Erro na requisição da API.";

    const userMessage = isTimeout
        ? "A requisição demorou demais para ser concluída. Por favor, verifique sua conexão com a internet e tente novamente."
        : isGenericApiError
            ? "Não foi possível conectar ao servidor. Tente novamente em alguns instantes."
            : "Um erro inesperado aconteceu. Por favor, tente novamente.";

    const userTitle =
        isTimeout || isGenericApiError ? "Erro de conexão" : "Algo deu errado!";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 text-center">
            <div className="flex flex-col items-center justify-center max-w-lg mx-auto p-12 rounded-lg bg-card shadow-lg">
                <div className="flex flex-col items-center space-y-4 mb-6">
                    {isTimeout || isGenericApiError ? (
                        <WifiOff className="h-16 w-16 text-destructive-foreground/80 mb-4" />
                    ) : (
                        <TriangleAlert className="h-16 w-16 text-destructive-foreground/80 mb-4" />
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-card-foreground">
                        {userTitle}
                    </h1>
                </div>

                <p className="text-lg text-muted-foreground mb-8">{userMessage}</p>

                <details
                    className="w-full text-left p-4 rounded-md border-border bg-input text-foreground text-sm cursor-pointer mb-6"
                    open={isOpen}
                    onToggle={(e) => setIsOpen(e.currentTarget.open)}
                >
                    <summary className="font-semibold text-card-foreground">
                        Detalhes Técnicos
                    </summary>
                    <pre className="mt-4 p-2 rounded-md bg-muted text-xs break-words whitespace-pre-wrap max-h-60 overflow-y-auto">
            <code>{error.stack}</code>
          </pre>
                </details>

                <div className="flex flex-col md:flex-row gap-4">
                    <Button
                        onClick={() => reset()}
                        variant="default"
                        className="bg-foreground text-background"
                    >
                        Tentar Novamente
                    </Button>
                    <Link href="/leads" passHref>
                        <Button variant="outline">Ir para a página inicial</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
