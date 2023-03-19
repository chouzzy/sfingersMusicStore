import { number, object, string } from "yup";

const updateAdminSchema = object({
    name: string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
    email: string().required("O email é obrigatório").min(3, "O email precisa ter no mínimo três caracteres"),
    username: string().required("O username é obrigatório").min(3, "O username precisa conter no mínimo 3 caracteres"),
})

export { updateAdminSchema }