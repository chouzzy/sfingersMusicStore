import { number, object, string } from "yup";

const createProductSchema = object({
    name: string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
    description: string().required("A descrição é obrigatória").min(8, "O a descrição deve conter no mínimo oito caracteres"),
    color: string().required("A cor é obrigatória").min(2, "A cor precisa ter no mínimo dois caracteres"),
    details: string().required("Os detalhes do produto são obrigatórios"),
    price: string().required("Preço obrigatório"),
    quantity: string().required("Quantidade obrigatória"),
})

export { createProductSchema }