import { validationResponse } from "../../../../types";
import { Students } from "../../entities/Students";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { UpdateStudentRequestProps } from "./UpdateStudentController";

class UpdateStudentUseCase {
    constructor(
        private studentsRepository: IStudentsRepository) {}

    async execute(studentData: UpdateStudentRequestProps, studentID: Students["id"]): Promise<Students | validationResponse> {
        
        const upatedStudent = await this.studentsRepository.updateStudent(studentData, studentID)
        
        return upatedStudent
    }
    
}

export {UpdateStudentUseCase}