import { ValidationError } from "yup";
import { validationResponse } from "../../../../../types";
import { CreateAdminRequestProps } from "./CreateAdminController";
import { createAdminSchema } from "./CreateAdminSchema";
import { Admins } from "../../../entities/Admins";




async function checkBody(adminData: CreateAdminRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await createAdminSchema.validate(adminData, {
            abortEarly: false,
        })
        return { isValid: true, statusCode: 202 }
    }
    catch (error) {
        if (error instanceof ValidationError) {
            return { errorMessage: error.errors, statusCode: 403, isValid: false }
        }
    }
    return { isValid: true, statusCode: 202 }
}




async function ErrorValidation(createdAdmin: Admins | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(createdAdmin: any): createdAdmin is validationResponse {
        return 'isValid' in createdAdmin;
    }

    if (checkIfIsAError(createdAdmin)) {

        //É um erro
        return createdAdmin
    } else {

        //Não é um erro
        return {
            isValid: true,
            statusCode: 202,
            successMessage: 'Não foi encontrado nenhum tipo de erro.'
        }
    }

}
export { checkBody, ErrorValidation }



