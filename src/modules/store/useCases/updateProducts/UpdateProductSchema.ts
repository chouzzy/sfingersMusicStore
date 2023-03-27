import { number, object, string } from "yup";

const updateProductSchema = object({
    name: string().min(2, "O nome precisa ter no mínimo dois caracteres"),
    description: string().min(8, "O a descrição deve conter no mínimo oito caracteres"),
    color: string().min(2, "A cor precisa ter no mínimo dois caracteres"),
    details: string(),
    price: string(),
    quantity: string()
})

export { updateProductSchema }