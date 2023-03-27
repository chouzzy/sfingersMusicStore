import { ValidationError } from "yup";
import { validationResponse } from "../../../../types";
import { Products } from "../../entities/Products";
import { ListProductsQuery } from "./ListProductsController";
import { listProductsSchema } from "./ListProductsSchema";


async function checkQuery(productsQuery: ListProductsQuery) {

    try {
        await listProductsSchema.validate(productsQuery, {
            abortEarly: false
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return { errorMessage: error.errors, statusCode: 403, isValid: false }
        }
    }

    return { isValid: true, statusCode: 302 }

}

async function ErrorValidation(product: Products[] | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(product: any): product is validationResponse {
        return 'isValid' in product;
    }

    if (checkIfIsAError(product)) {
        //É um erro
        return product
    } else {
        //Não é um erro
        if (product.length == 0) {
            return {
                isValid: false,
                statusCode: 404,
                errorMessage: '⚠️ Não foi encontrado nenhum produto. ⚠️'
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