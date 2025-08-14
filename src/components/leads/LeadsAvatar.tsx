import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    const bgColor = interesse === "revenda" ? "bg-blue-400" : "bg-orange-400";

    return (
        <Avatar className="w-10 h-10">
            <AvatarFallback className={`${bgColor} text-white font-medium`}>
                {getInitials(nome)}
            </AvatarFallback>
        </Avatar>
    );
}