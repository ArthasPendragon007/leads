import axios from "axios";

export const apiIBGE = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/",
    withCredentials: false,
});
