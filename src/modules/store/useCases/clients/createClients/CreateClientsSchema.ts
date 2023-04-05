import * as yup from "yup" ;
import YupPassword from 'yup-password'
YupPassword(yup)

const createClientsSchema = yup.object({
    name: yup.string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
    email: yup.string().required("O email é obrigatório").min(3, "O email precisa ter no mínimo três caracteres"),
    address: yup.string().required("O endereço é obrigatório").min(3, "O endereço precisa conter no mínimo 3 caracteres"),
    //   'password must be at least 8 characters',
    //   'password must contain at least 1 uppercase letter',
    //   'password must contain at least 1 number',
    //   'password must contain at least 1 symbol',
})

export { createClientsSchema }