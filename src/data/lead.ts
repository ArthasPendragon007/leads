export interface Lead {
  id: number
  dataHora: string
  nome: string
  email: string
  cnpj: string
  telefone: string
  interesse: string
  origem: string
  fonte: string
  meio: string
  anuncio: string
  status: string
}

export type TabType = "pendentes" | "concluidos"

export type CopyType = "Nome" | "Email" | "Cnpj"
