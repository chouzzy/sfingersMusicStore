import { Router } from "express"
import { CreateStudentController } from "../modules/registrations/useCases/createStudents/CreateStudentsController"
import { DeleteStudentController } from "../modules/registrations/useCases/deleteStudents/DeleteStudentController"
import { ListStudentsController } from "../modules/registrations/useCases/listStudents/ListStudentsController"
import { UpdateStudentController } from "../modules/registrations/useCases/updateStudents/UpdateStudentController"

const studentsRoutes = Router()

const listStudentsController = new ListStudentsController()
studentsRoutes.get('/', listStudentsController.handle)

const createStudentController = new CreateStudentController()
studentsRoutes.post('/create', createStudentController.handle)

const updateStudentController = new UpdateStudentController()
studentsRoutes.put('/:studentID/update', updateStudentController.handle)

const deleteStudentController = new DeleteStudentController()
studentsRoutes.delete('/:studentID/delete', deleteStudentController.handle)


export {studentsRoutes}