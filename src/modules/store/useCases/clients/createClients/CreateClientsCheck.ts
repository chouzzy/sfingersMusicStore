import { ValidationError } from "yup";
import { validationResponse } from "../../../../../types";
import { CreateClientRequestProps } from "./CreateClientsController";
import { createClientsSchema } from "./CreateClientsSchema";
import { Clients } from "../../../entities/Clients";




async function checkBody(clientData: CreateClientRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await createClientsSchema.validate(clientData, {
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




async function ErrorValidation(createdClient: Clients | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(createdClient: any): createdClient is validationResponse {
        return 'isValid' in createdClient;
    }

    if (checkIfIsAError(createdClient)) {

        //É um erro
        return createdClient
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



