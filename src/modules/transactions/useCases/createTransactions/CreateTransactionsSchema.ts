import { number, object, string } from "yup";

const transactionSchema = object({
    productID: string().required("O ID do produto é obrigatório"),
    clientID: string().required("O ID do cliente é obrigatório"),
    quantity: string().required("A quantidade de produtos é obrigatória").min(1, "Selecione ao menos 1 (um) produto"),
})

export {transactionSchema}