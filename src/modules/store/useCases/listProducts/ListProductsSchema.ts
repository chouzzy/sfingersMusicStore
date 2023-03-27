import { object, string } from "yup";

const listProductsSchema = object({

    id: string(),
    name: string().min(3, "O nome precisa ter no mínimo três caracteres"),
    color: string().min(3, "A cor precisa ter no mínimo três caracteres"),
})

export {listProductsSchema}