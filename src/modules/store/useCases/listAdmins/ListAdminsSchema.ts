import { object, string } from "yup";

const listAdminsSchema = object({

    id: string(),
    name: string(),
    email: string(),
    username: string(),
    password: string(),
    page: string()
})

export {listAdminsSchema}