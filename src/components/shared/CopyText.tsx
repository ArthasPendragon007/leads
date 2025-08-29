'use client';

import {Check, Copy} from "lucide-react";
import React, {useState} from "react";
import {cn} from "@/lib/utils";

interface CopyTextProps {
    text: string;
    className?: string;
    position?: "left" | "right" | "none";
}

// Função de fallback que usa um metodo mais antigo para copiar texto,
// pois quando ta em https o navigator.clipboard pode não funcionar,
// já que navigator.clipboard é uma funcao de AP    I que requer um contexto seguro (https).
const copyFallback = (text: string): boolean => {
    let textArea;
    try {
        textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const success = document.execCommand('copy');
        return success;
    } catch (err) {
        console.error("Erro ao tentar usar a cópia de fallback:", err);
        return false;
    } finally {
        if (textArea && document.body.contains(textArea)) {
            document.body.removeChild(textArea);
        }
    }
};

export const CopyText: React.FC<CopyTextProps> = ({ text, className, position = "right" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                setCopied(true);
            } else {
                const success = copyFallback(text);
                if (success) {
                    setCopied(true);
                }
            }
        } catch (err) {
            const success = copyFallback(text);
            if (success) {
                setCopied(true);
            }
        } finally {
            setTimeout(() => setCopied(false), 1000);
        }
    };

    const icon = copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />;

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {position === "left" && (
                <span onClick={handleCopy} className="cursor-pointer">
                    {icon}
                </span>
            )}
            {position !== "none" && <span className="truncate max-w-[200] text-card-foreground text-sm">{text}</span>}
            {position === "right" && (
                <span onClick={handleCopy} className="cursor-pointer">
                    {icon}
                </span>
            )}
            {position === "none" && (
                <span onClick={handleCopy} className="cursor-pointer">
                    {icon}
                </span>
            )}

        </div>
    );
};