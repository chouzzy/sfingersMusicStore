import { Request, Response } from "express"
import { Students } from "../../entities/Students"
import { checkBody, ErrorValidation } from "./UpdateStudentCheck"
import { StudentsRepository } from "../../repositories/implementations/StudentsRepository"
import { UpdateStudentUseCase } from "./UpdateStudentUseCase"

interface UpdateStudentRequestProps {

    name: Students["name"],
    email: Students["email"],
    gender: Students["gender"],
    birth: Students["birth"],
    phoneNumber: Students["phoneNumber"],
    country: Students["country"],
    state: Students["state"],
    city: Students["city"],

    address: Students["address"],
    cpf: Students["cpf"],
    rg: Students["rg"],
    selfDeclaration: Students["selfDeclaration"],
    oldSchool: Students["oldSchool"],
    oldSchoolAdress: Students["oldSchoolAdress"],
    highSchoolGraduationDate: Students["highSchoolGraduationDate"],
    highSchoolPeriod: Students["highSchoolPeriod"],
    metUsMethod: Students["metUsMethod"],
    exStudent: Students["exStudent"],

    valuePaid: Students["valuePaid"],
    paymentMethod?: Students["paymentMethod"],
    paymentStatus?: Students["paymentStatus"],
    paymentDate?: Students["paymentDate"]
}

class UpdateStudentController {

    async handle(req: Request, res: Response): Promise<Response> {

        const studentData: UpdateStudentRequestProps = req.body
        const {studentID} = req.params

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(studentData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const studentsRepository = new StudentsRepository()
        const updateStudentUseCase = new UpdateStudentUseCase(studentsRepository)
        const updatedStudent = await updateStudentUseCase.execute(studentData, studentID)

        ///
        const updatedStudentIsValid = await ErrorValidation(updatedStudent)

        if (updatedStudentIsValid.isValid === false) {
            return res.status(updatedStudentIsValid.statusCode).json({
                errorMessage: updatedStudentIsValid.errorMessage
            })
        }

        return res.status(202).json({
            updatedStudent
        })

    }
}

export { UpdateStudentController, UpdateStudentRequestProps }