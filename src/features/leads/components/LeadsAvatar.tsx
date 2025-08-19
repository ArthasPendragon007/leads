// @/features/leads/components/LeadsAvatar.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

interface LeadsAvatarProps {
    nome?: string;
    interesse?: string;
}

function getInitials(nome?: string): string {
    if (!nome?.trim()) return "?";

    const palavras = nome.trim().split(/\s+/);
    const primeiraLetra = palavras[0][0];
    const ultimaLetra = palavras.length > 1 ? palavras[palavras.length - 1][0] : "";

    return (primeiraLetra + ultimaLetra).toUpperCase();
}

export function LeadsAvatar({ nome, interesse }: LeadsAvatarProps) {
    const bgColor =
        interesse === "revenda"
            ? "bg-[var(--revenda)] text-[var(--revenda-foreground)]"
            : "bg-[var(--utilizacao)] text-[var(--utilizacao-foreground)]";

    return (
        <Avatar className="w-10 h-10">
            <AvatarFallback className={`${bgColor} font-medium`}>
                {getInitials(nome)}
            </AvatarFallback>
        </Avatar>
    );
}