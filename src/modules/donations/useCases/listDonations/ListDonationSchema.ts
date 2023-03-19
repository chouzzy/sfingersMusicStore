import { number, object, string } from "yup";

const listDonationSchema = object({

    initValue: number().min(0, "O nome precisa ter no mínimo duas letras"),
    endValue: number().min(0, "O email precisa ter no mínimo três letras"),
    email: string().min(3, "O email precisa ter no mínimo três letras"),
    date: string().min(3, "A data precisa estar no formato correto"),
    page: string()
})

export {listDonationSchema}