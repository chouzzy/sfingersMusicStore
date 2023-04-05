import { number, object, string } from "yup";

const updateClientSchema = object({
    name: string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
    email: string().required("O email é obrigatório").min(3, "O email precisa ter no mínimo três caracteres"),
    address: string().required("O endereço é obrigatório").min(3, "O endereço precisa conter no mínimo 3 caracteres"),
})

export { updateClientSchema }