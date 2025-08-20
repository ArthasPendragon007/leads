"use client"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Check, Loader2, Pencil, X} from "lucide-react"
import {useEffect, useState} from "react"

interface LeadsParceiroFieldProps {
    ocultarParceiro?: boolean
    interesse?: string
    valorParceiro: string
    setValorParceiro: (v: string) => void
    editandoParceiro: boolean
    setEditandoParceiro: (v: boolean) => void
    salvarParceiro: () => void
    isPending: boolean
    isError: boolean
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
                                   }: LeadsParceiroFieldProps) {
    const [valorOriginal, setValorOriginal] = useState(valorParceiro)
    const interesseLower = interesse?.toLowerCase()

    useEffect(() => {
        if (isError) console.error("Erro ao salvar parceiro.")
    }, [isError])

    const iniciarEdicao = () => {
        setValorOriginal(valorParceiro)
        setEditandoParceiro(true)
    }

    const cancelarEdicao = () => {
        setValorParceiro(valorOriginal)
        setEditandoParceiro(false)
    }

    const botoesEdicao = () =>
        !editandoParceiro ? (
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-8 text-gray-600 hover:text-gray-800"
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
                    className="h-9 w-8 text-red-600 hover:text-red-700"
                    onClick={cancelarEdicao}
                    disabled={isPending}
                >
                    <X className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-8 text-green-600 hover:text-green-700"
                    onClick={salvarParceiro}
                    disabled={isPending}
                >
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
            </>
        )

    if (!ocultarParceiro && interesseLower === "revenda") {
        return (
            <div
                className="w-[200px] h-9 flex items-center border border-dashed border-gray-300 rounded-md px-3 text-sm text-gray-400 italic"
                title="Não se aplica para revenda"
            >
                Não se aplica para revenda
            </div>
        )
    }

    if (!ocultarParceiro && interesseLower === "utilizacao") {
        return (
            <div className="w-[200px] flex items-center border border-input rounded-md bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-200">
                <Input
                    value={valorParceiro}
                    onChange={(e) => setValorParceiro(e.target.value)}
                    disabled={!editandoParceiro || isPending}
                    placeholder="Digite..."
                    className="flex-1 h-9 text-sm border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                />
                <div
                    className={`flex items-center justify-end gap-1 px-1 transition-all duration-200 ${
                        editandoParceiro ? "w-[70px]" : "w-[35px]"
                    }`}
                >
                    {botoesEdicao()}
                </div>
            </div>
        )
    }

    return null
}
