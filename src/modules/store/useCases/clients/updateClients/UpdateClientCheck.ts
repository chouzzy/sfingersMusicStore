import { ValidationError } from "yup";
import { validationResponse } from "../../../../../types";
import { UpdateClientRequestProps } from "./UpdateClientController";
import { Clients } from "../../../entities/Clients";
import { updateClientSchema } from "./UpdateClientSchema";




async function checkBody(clientData: UpdateClientRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await updateClientSchema.validate(clientData, {
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




async function ErrorValidation(upatedClient: Clients | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(upatedClient: any): upatedClient is validationResponse {
        return 'isValid' in upatedClient;
    }

    if (checkIfIsAError(upatedClient)) {

        //É um erro
        return upatedClient
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



