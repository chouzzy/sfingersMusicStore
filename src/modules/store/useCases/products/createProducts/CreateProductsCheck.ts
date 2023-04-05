import { ValidationError } from "yup";
import { validationResponse } from "../../../../../types";
import { CreateProductRequestProps } from "./CreateProductsController";
import { createProductSchema } from "./CreateProductsSchema";
import { Products } from "../../../entities/Products";




async function checkBody(productData: CreateProductRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await createProductSchema.validate(productData, {
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




async function ErrorValidation(createdProduct: Products | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(createdProduct: any): createdProduct is validationResponse {
        return 'isValid' in createdProduct;
    }

    if (checkIfIsAError(createdProduct)) {

        //É um erro
        return createdProduct
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



