import { number, object, string } from "yup";

const createAdminSchema = object({
    username: string().required("O username é obrigatório").min(3, "O username precisa conter no mínimo 3 caracteres"),
    password: string().required("Password é obrigatório").password().matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})

export { createAdminSchema }