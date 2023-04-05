import { object, string } from "yup";

const listClientsSchema = object({

    id: string(),
    name: string(),
    email: string(),
    username: string(),
    password: string(),
    page: string()
})

export {listClientsSchema}