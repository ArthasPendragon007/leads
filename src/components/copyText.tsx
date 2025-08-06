import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CopyTextProps {
    text: string
    className?: string
    position?: "left" | "right"
}

export const CopyText: React.FC<CopyTextProps> = ({ text, className, position = "right" }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    const icon = copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            {position === "left" && (
                <span onClick={handleCopy} className="cursor-pointer">{icon}</span>
            )}
            <span className="text-gray-700 text-sm">{text}</span>
            {position === "right" && (
                <span onClick={handleCopy} className="cursor-pointer">{icon}</span>
            )}
        </div>
    )
}
