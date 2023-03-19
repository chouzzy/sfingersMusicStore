import { validationResponse } from "../../../../types";
import { Donations } from "../../entities/Donations";

async function ErrorValidation(createdDonation: Donations | validationResponse): Promise<validationResponse> {
    
    function checkIfIsAError(createdDonation: any): createdDonation is validationResponse {
        return 'isValid' in createdDonation;
    }

    if (checkIfIsAError(createdDonation)) {
        //É um erro
        return createdDonation

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



