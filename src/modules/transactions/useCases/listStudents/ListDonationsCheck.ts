import { ValidationError } from "yup";
import { listDonationSchema } from "./ListDonationSchema";
import { ListDonationsQuery } from "./ListDonationsController";


async function checkQuery( donationQuery:ListDonationsQuery
    ) {
    
    try {
        await listDonationSchema.validate(donationQuery,{
            abortEarly: false
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return {errorMessage: error.errors, statusCode: 403, isValid: false}
        }
    }

    return {isValid: true, statusCode: 302}

}   

export {checkQuery}