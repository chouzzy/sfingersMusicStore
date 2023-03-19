import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Admins";

async function ErrorValidation(createdAdmin: Admins | validationResponse): Promise<validationResponse> {
    
    function checkIfIsAError(createdAdmin: any): createdAdmin is validationResponse {
        return 'isValid' in createdAdmin;
    }

    if (checkIfIsAError(createdAdmin)) {
        //É um erro
        return createdAdmin

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



