import { validationResponse } from "../../../../../types";
import { Clients } from "../../../entities/Clients";

async function ErrorValidation(createdClient: Clients | validationResponse): Promise<validationResponse> {
    
    function checkIfIsAError(createdClient: any): createdClient is validationResponse {
        return 'isValid' in createdClient;
    }

    if (checkIfIsAError(createdClient)) {
        //É um erro
        return createdClient

    } else {
        // não é um erro
        return {            
            isValid: true,
            statusCode: 202,
            successMessage:'Não foi encontrado nenhum tipo de erro.'
        }
    }

}
export {ErrorValidation}



