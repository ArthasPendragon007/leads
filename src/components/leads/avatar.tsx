// src/components/leads/LeadAvatar.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function LeadAvatar({ nome, interesse }: { nome?: string, interesse?: string }) {
    const inicial = nome?.trim()[0]?.toUpperCase() || "?";
    const bg = interesse === "revenda" ? "bg-blue-400" : "bg-orange-300";

    return (
        <Avatar className="w-10 h-10">
            <AvatarFallback className={`${bg} text-white font-medium`}>
                {inicial}
            </AvatarFallback>
        </Avatar>
    );
}