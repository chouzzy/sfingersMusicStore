import { validationResponse } from "../../../../types";
import { Products } from "../../entities/Products";

async function ErrorValidation(createdProduct: Products | validationResponse): Promise<validationResponse> {
    
    function checkIfIsAError(createdProduct: any): createdProduct is validationResponse {
        return 'isValid' in createdProduct;
    }

    if (checkIfIsAError(createdProduct)) {
        //É um erro
        return createdProduct

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



