import { validationResponse } from "../../../../types";
import { Students } from "../../entities/Students";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";

class DeleteStudentUseCase {
    constructor(
        private studentsRepository: IStudentsRepository) {}

    async execute(studentID:Students["id"]): Promise<Students | validationResponse> {
        
        const deletedStudent = await this.studentsRepository.deleteStudent(studentID)
        
        return deletedStudent
    }
    
}

export {DeleteStudentUseCase}