import { ValidationError } from "yup";
import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Admins";
import { ListAdminsQuery } from "./ListAdminsController";
import { listAdminsSchema } from "./ListAdminsSchema";


async function checkQuery(adminsQuery: ListAdminsQuery) {

    try {
        await listAdminsSchema.validate(adminsQuery, {
            abortEarly: false
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return { errorMessage: error.errors, statusCode: 403, isValid: false }
        }
    }

    return { isValid: true, statusCode: 302 }

}

async function ErrorValidation(admin: Admins[] | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(admin: any): admin is validationResponse {
        return 'isValid' in admin;
    }

    if (checkIfIsAError(admin)) {
        //É um erro
        return admin
    } else {
        //Não é um erro
        if (admin.length == 0) {
            return {
                isValid: false,
                statusCode: 404,
                errorMessage: '⚠️ Não foi encontrado nenhum admnistrador. ⚠️'
            }
        }
        return {
            isValid: true,
            statusCode: 202,
            successMessage: 'Não foi encontrado nenhum tipo de erro.'
        }
    }

}

export { checkQuery, ErrorValidation }