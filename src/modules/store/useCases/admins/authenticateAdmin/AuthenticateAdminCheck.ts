import { ValidationError } from "yup";
import { validationResponse } from "../../../../../types";
import { Admins } from "../../../entities/Admins";



async function ErrorValidation(authenticatedAdmin: Admins | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(authenticatedAdmin: any): authenticatedAdmin is validationResponse {
        return 'isValid' in authenticatedAdmin;
    }

    if (checkIfIsAError(authenticatedAdmin)) {

        //É um erro
        return authenticatedAdmin
    } else {

        //Não é um erro
        return {
            isValid: true,
            statusCode: 202,
            successMessage: 'Não foi encontrado nenhum tipo de erro.'
        }
    }

}
export { ErrorValidation }



