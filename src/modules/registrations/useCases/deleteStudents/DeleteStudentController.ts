import { Request, Response } from "express"
import { Students } from "../../entities/Students"
import { StudentsRepository } from "../../repositories/implementations/StudentsRepository"
import { ErrorValidation } from "./DeleteStudentCheck"
import { DeleteStudentUseCase } from "./DeleteStudentUseCase"

class DeleteStudentController {
    async handle(req: Request, res: Response): Promise<Response> {

        const studentID:Students["id"] = req.params.studentID

        const studentsRepository = new StudentsRepository()
        const deleteStudentUseCase = new DeleteStudentUseCase(studentsRepository)
        const deletedStudent = await deleteStudentUseCase.execute(studentID)

        const deletedStudentIsValid = await ErrorValidation(deletedStudent)

        if (deletedStudentIsValid.isValid === false) {
            return res.status(deletedStudentIsValid.statusCode).json({
                errorMessage: deletedStudentIsValid.errorMessage
            })
        }

        return res.status(202).json({
            deletedStudent
        })

    }
}

export {DeleteStudentController}