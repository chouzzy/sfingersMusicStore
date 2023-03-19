import { validationResponse } from "../../../../types"
import { Students } from "../../entities/Students"
import { IStudentsRepository } from "../../repositories/IStudentsRepository"
import { checkQuery } from "./ListStudentsCheck"
import { ListStudentsQuery } from "./ListStudentsController"
//////

class ListStudentsUseCase {
    constructor(
        private studentsRepository: IStudentsRepository) { }

    async execute(query: ListStudentsQuery): Promise<Students[] | validationResponse> {

        let {
            id,
            email,
            state,
            paymentStatus,
            page
        } = query

        let actualPage = Number(page)

        if (page == undefined) { actualPage = 0}


        const students = await this.studentsRepository.filterStudent(
            id,
            email,
            state,
            paymentStatus,
            actualPage
        )
        
        return students
    }
}

export { ListStudentsUseCase }
