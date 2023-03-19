import { Request, Response } from "express";
import { Students } from "../../entities/Students";
import { StudentsRepository} from "../../repositories/implementations/StudentsRepository";
import { checkQuery, ErrorValidation } from "./ListStudentsCheck";
import { ListStudentsUseCase } from "./ListStudentsUseCase";

interface ListStudentsQuery {
    id?: Students["id"],
    email?: Students["email"],
    state?: Students["state"],
    paymentStatus?: Students["paymentStatus"],
    page?: string
}

class ListStudentsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const query: ListStudentsQuery = req.query

        const queryValidation = await checkQuery(query)

        if (queryValidation.isValid === false) {
            return res.status(queryValidation.statusCode).json({
                errorMessage: queryValidation.errorMessage
            })
        }

        // Instanciando o useCase no repositório com as funções
        const studentsRepository = new StudentsRepository()

        const listStudentsUseCase = new ListStudentsUseCase(studentsRepository);

        const students = await listStudentsUseCase.execute(query)
        
        const studentsAreValid = await ErrorValidation(students)
        
        if (studentsAreValid.isValid === false) {
            return res.status(studentsAreValid.statusCode).json({
                errorMessage: studentsAreValid.errorMessage
            })
        }

        return res.status(202).json({
            students
        })

    }
}

export { ListStudentsController, ListStudentsQuery }