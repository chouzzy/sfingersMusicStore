import { object, string } from "yup";

const listStudentsSchema = object({

    id: string(),
    email: string().min(3, "O email precisa ter no mínimo três letras"),
    state: string().min(3, "O estado precisa ter no mínimo três letras"),
    paymentStatus: string(),
    page: string()
})

export {listStudentsSchema}