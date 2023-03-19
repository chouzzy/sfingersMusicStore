import { Request, Response } from "express"
import { Students } from "../../entities/Students"
import { checkBody, ErrorValidation } from "./CreateStudentCheck"
import { CreateStudentUseCase } from "./CreateStudentUseCase"
import { StudentsRepository } from "../../repositories/implementations/StudentsRepository"

interface CreateStudentRequestProps {

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
}

class CreateStudentController {
    async handle(req: Request, res: Response): Promise<Response> {

        const studentData: CreateStudentRequestProps = req.body

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(studentData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const studentsRepository = new StudentsRepository()
        const createStudentUseCase = new CreateStudentUseCase(studentsRepository)
        const createdStudent = await createStudentUseCase.execute(studentData)

        ///
        const createdStudentIsValid = await ErrorValidation(createdStudent)

        if (createdStudentIsValid.isValid === false) {
            return res.status(createdStudentIsValid.statusCode).json({
                errorMessage: createdStudentIsValid.errorMessage
            })
        }

        return res.status(202).json({
            createdStudent
        })

    }
}

export { CreateStudentController, CreateStudentRequestProps }