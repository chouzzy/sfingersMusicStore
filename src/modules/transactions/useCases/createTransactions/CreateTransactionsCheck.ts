import { ValidationError } from "yup";
import { errorSchema } from "../../../../errors/ErrorSchema";
import { validationResponse } from "../../../../types";
import { Transactions } from "../../entities/Transactions";
import { CreateTransactionProps } from "./CreateTransactionsController";
import { transactionSchema } from "./CreateTransactionsSchema";

async function checkBody(transactionData:CreateTransactionProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await transactionSchema.validate(transactionData, {
            abortEarly:false,
        })
        return {isValid:true, statusCode:202}
    } 
    catch (error) {
        if (error instanceof ValidationError) {
            return {errorMessage: error.errors, statusCode: 403, isValid: false}
    }}
    return {isValid:true, statusCode:202}
}

async function ErrorValidation(createdTransaction: Transactions | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(createdTransaction: any): createdTransaction is validationResponse {
        return 'isValid' in createdTransaction;
    }

    if (checkIfIsAError(createdTransaction)) {
        //É um erro
        return createdTransaction
    } else {
        //Não é um erro
        return {            
            isValid: true,
            statusCode: 202,
            successMessage:'Não foi encontrado nenhum tipo de erro.'
        }
    }

}
export {checkBody, ErrorValidation}



