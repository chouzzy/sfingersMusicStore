import { validationResponse } from "../../../types"
import { Students } from "../entities/Students"
import { CreateStudentRequestProps } from "../useCases/createStudents/CreateStudentsController"
import { UpdateStudentRequestProps } from "../useCases/updateStudents/UpdateStudentController"


interface IStudentsRepository {

    filterStudent(
        id: Students["id"] | undefined,
        email: Students["email"] | undefined,
        state: Students["state"] | undefined,
        paymentStatus: Students["paymentStatus"] | undefined,
        actualPage: number
    ): Promise<Students[] | validationResponse>

    createStudent(studentData: CreateStudentRequestProps): Promise<Students | validationResponse>

    updateStudent(studentData: UpdateStudentRequestProps, studentID: Students["id"]): Promise<Students | validationResponse>
    
    deleteStudent(studentID: Students["id"]): Promise<Students| validationResponse>
}

export {IStudentsRepository}