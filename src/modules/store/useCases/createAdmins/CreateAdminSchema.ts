import * as yup from "yup" ;
import YupPassword from 'yup-password'
YupPassword(yup)

const createAdminsSchema = yup.object({
    name: yup.string().required("O nome é obrigatório").min(2, "O nome precisa ter no mínimo dois caracteres"),
    email: yup.string().required("O email é obrigatório").min(3, "O email precisa ter no mínimo três caracteres"),
    username: yup.string().required("O username é obrigatório").min(3, "O username precisa conter no mínimo 3 caracteres"),
    password: yup.string().required("Password é obrigatório").password().matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    //   'password must be at least 8 characters',
    //   'password must contain at least 1 uppercase letter',
    //   'password must contain at least 1 number',
    //   'password must contain at least 1 symbol',
})

export { createAdminsSchema }