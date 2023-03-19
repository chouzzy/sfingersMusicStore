import * as yup from "yup" ;
import YupPassword from 'yup-password'
YupPassword(yup)

const updateAdminPasswordSchema = yup.object({
    password: yup.string().required("Password é obrigatório").password().matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})

export { updateAdminPasswordSchema }