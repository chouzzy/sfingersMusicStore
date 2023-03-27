import { ValidationError } from "yup";
import { errorSchema } from "../../../../errors/ErrorSchema";
import { validationResponse } from "../../../../types";
import { Donations } from "../../entities/Donations";
import { CreateDonationProps } from "./CreateDonationController";
import { donationSchema } from "./CreateDonationSchema";

async function checkBody(donationData:CreateDonationProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await donationSchema.validate(donationData, {
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

async function ErrorValidation(createdDonation: Donations | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(createdDonation: any): createdDonation is validationResponse {
        return 'isValid' in createdDonation;
    }

    if (checkIfIsAError(createdDonation)) {
        //É um erro
        return createdDonation
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



