import { ValidationError } from "yup";
import { validationResponse } from "../../../../types";
import { UpdateAdminPasswordRequestProps } from "./UpdateAdminsPasswordController";
import { Admins } from "../../entities/Admins";
import { updateAdminPasswordSchema } from "./UpdateAdminsPasswordSchema";
//////

async function checkBody(adminData: UpdateAdminPasswordRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await updateAdminPasswordSchema.validate(adminData, {
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




async function ErrorValidation(upatedAdmin: Admins | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(upatedAdmin: any): upatedAdmin is validationResponse {
        return 'isValid' in upatedAdmin;
    }

    if (checkIfIsAError(upatedAdmin)) {

        //É um erro
        return upatedAdmin
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



