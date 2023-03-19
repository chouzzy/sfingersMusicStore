import { ValidationError } from "yup";
import { validationResponse } from "../../../../types";
import { UpdateStudentRequestProps } from "./UpdateStudentController";
import { studentSchema } from "./UpdateStudentSchema";
import { Students } from "../../entities/Students";




async function checkBody(studentData: UpdateStudentRequestProps): Promise<validationResponse> {
    // check body properties
    try {
        const yupValidation = await studentSchema.validate(studentData, {
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




async function ErrorValidation(upatedStudent: Students | validationResponse): Promise<validationResponse> {

    function checkIfIsAError(upatedStudent: any): upatedStudent is validationResponse {
        return 'isValid' in upatedStudent;
    }

    if (checkIfIsAError(upatedStudent)) {

        //É um erro
        return upatedStudent
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



