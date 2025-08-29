export interface Municipio {
    id: number;
    nome: string;
    microrregiao: Microrregiao;
    label: string; // nome - UF
}

interface UF {
    sigla: string;
}

interface Microrregiao {
    mesorregiao: { UF: UF };
}