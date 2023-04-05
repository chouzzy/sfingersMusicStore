import { ValidationError } from "yup";
import { validationResponse } from "../../../../../types";
import { Clients } from "../../../entities/Clients";
import { ListClientsQuery } from "./ListClientsController";
import { listClientsSchema } from "./ListClientsSchema";


async function checkQuery(clientsQuery: ListClientsQuery) {

    try {
        await listClientsSchema.validate(clientsQuery, {
            abortEarly: false
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return { errorMessage: error.errors, statusCode: 403, isValid: false }
        }
    }

    return { isValid: true, statusCode: 302 }

}

async function ErrorValidation(client: Clients[] | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(client: any): client is validationResponse {
        return 'isValid' in client;
    }

    if (checkIfIsAError(client)) {
        //É um erro
        return client
    } else {
        //Não é um erro
        if (client.length == 0) {
            return {
                isValid: false,
                statusCode: 404,
                errorMessage: '⚠️ Não foi encontrado nenhum cliente. ⚠️'
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