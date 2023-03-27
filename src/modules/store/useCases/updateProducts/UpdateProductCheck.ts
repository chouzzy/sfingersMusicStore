import { ValidationError } from "yup";
import { validationResponse } from "../../../../types";
import { updateProductSchema } from "./UpdateProductSchema";
import { Products } from "../../entities/Products";
import { UpdateProductRequestProps } from "./UpdateProductController";




async function checkBody(productData: UpdateProductRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await updateProductSchema.validate(productData, {
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




async function ErrorValidation(upatedProduct: Products | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(upatedProduct: any): upatedProduct is validationResponse {
        return 'isValid' in upatedProduct;
    }

    if (checkIfIsAError(upatedProduct)) {

        //É um erro
        return upatedProduct
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



