import { validationResponse } from "../../../../types";
import { Students } from "../../entities/Students";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { CreateStudentRequestProps } from "./CreateStudentsController";


class CreateStudentUseCase {
    constructor(
        private studentsRepository: IStudentsRepository) {}

    async execute(studentData: CreateStudentRequestProps): Promise<Students | validationResponse> {
        
        const createdStudent = await this.studentsRepository.createStudent(studentData)
        
        return createdStudent
    }
    
}

export {CreateStudentUseCase}