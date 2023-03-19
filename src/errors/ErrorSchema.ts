import { boolean, number, object, string } from "yup";

const errorSchema = object({
    isValid: boolean().required(),
    errorMessage: string(),
    successMessage: string(),
    statusCode: number().required(),
})

export {errorSchema}