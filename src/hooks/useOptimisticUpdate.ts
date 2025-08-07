// hooks/useOptimisticUpdate.ts
import { useState } from "react"

export function useOptimisticUpdate<T>(initialValue: T) {
    const [data, setData] = useState<T>(initialValue)

    async function update<K extends keyof T>(
        field: K,
        value: T[K],
        updateFn: (updatedData: T) => Promise<any>
    ) {
        const prevData = data
        const updatedData = { ...data, [field]: value }

        setData(updatedData) // otimismo

        try {
            await updateFn(updatedData)
        } catch (e) {
            console.error("Erro na atualização otimista:", e)
            setData(prevData) // rollback
        }
    }

    return {
        data,
        setData, // caso queira usar para carregar outro lead
        update,
    }
}
