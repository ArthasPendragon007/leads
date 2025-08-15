// @/components/leads/LeadsParceiroField.tsx

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Pencil, X, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
// import { toast } from "@/components/ui/use-toast"; // Exemplo de import de toast

interface LeadParceiroFieldProps {
    ocultarParceiro?: boolean
    interesse?: string
    valorParceiro: string
    setValorParceiro: (value: string) => void
    editandoParceiro: boolean
    setEditandoParceiro: (value: boolean) => void
    salvarParceiro: () => void
    isPending: boolean;
    isError: boolean;
}

export function LeadsParceiroField({
                                       ocultarParceiro,
                                       interesse,
                                       valorParceiro,
                                       setValorParceiro,
                                       editandoParceiro,
                                       setEditandoParceiro,
                                       salvarParceiro,
                                       isPending,
                                       isError,
                                   }: LeadParceiroFieldProps) {
    const interesseLower = interesse?.toLowerCase()
    const alturaPadrao = "h-9"
    const larguraCampoTotal = "w-[200px]"

    const [valorOriginal, setValorOriginal] = useState(valorParceiro)

    const cancelarEdicao = () => {
        setValorParceiro(valorOriginal)
        setEditandoParceiro(false)
    }

    const iniciarEdicao = () => {
        setValorOriginal(valorParceiro)
        setEditandoParceiro(true)
    }

    useEffect(() => {
        if (isError) {
            // Exibe a mensagem de erro.
            // Ex: toast({ title: "Erro", description: "Falha ao salvar parceiro.", variant: "destructive" });
            console.error("Erro ao salvar parceiro.");
        }
    }, [isError]);

    // Estado "Revenda"
    if (!ocultarParceiro && interesseLower === "revenda") {
        return (
            <div
                className={`${larguraCampoTotal} ${alturaPadrao} flex items-center border border-dashed border-gray-300 rounded-md px-3 text-sm text-gray-400 italic bg-transparent`}
                title="Não se aplica para revenda"
            >
                Não se aplica para revenda
            </div>
        )
    }

    // Estado "Utilização"
    if (!ocultarParceiro && interesseLower === "utilizacao") {
        return (
            <div className="flex items-center gap-2">
                <div
                    className={`${larguraCampoTotal} flex items-center border border-input rounded-md bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-200 ease-in-out`}
                >
                    <Input
                        value={valorParceiro}
                        onChange={(e) => setValorParceiro(e.target.value)}
                        disabled={!editandoParceiro || isPending}
                        placeholder="Digite..."
                        className={`flex-1 ${alturaPadrao} text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent`}
                    />

                    <div
                        className={`flex items-center justify-end gap-1 px-1 transition-all duration-200 ease-in-out ${
                            editandoParceiro ? "w-[70px]" : "w-[35px]"
                        }`}
                    >
                        {!editandoParceiro ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className={`${alturaPadrao} w-8 text-gray-600 hover:text-gray-800`}
                                                            onClick={iniciarEdicao}
                                                            disabled={isPending}
                                                        >
                                                           <Pencil className="h-4 w-4" />
                                                        </Button>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`${alturaPadrao} w-8 text-red-600 hover:text-red-700`}
                                    onClick={cancelarEdicao}
                                    disabled={isPending}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`${alturaPadrao} w-8 text-green-600 hover:text-green-700`}
                                    onClick={salvarParceiro}
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Check className="h-4 w-4" />
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return null
}