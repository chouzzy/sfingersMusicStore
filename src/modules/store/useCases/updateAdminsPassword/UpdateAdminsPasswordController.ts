import { Request, Response } from "express"
import { AdminsRepository } from "../../repositories/implementations/ClientsRepository"
import { Admins } from "../../entities/Clients"
import { UpdateAdminsPasswordUseCase } from "./UpdateAdminsPasswordUseCase"
import { checkBody, ErrorValidation } from "./UpdateAdminsPasswordCheck"

interface UpdateAdminPasswordRequestProps {
    password: Admins["password"],
}

class UpdateAdminsPasswordController {

    async handle(req: Request, res: Response): Promise<Response> {

        const adminData: UpdateAdminPasswordRequestProps = req.body
        const {adminID} = req.params

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(adminData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const adminsRepository = new AdminsRepository()
        const updateAdminsPasswordUseCase = new UpdateAdminsPasswordUseCase(adminsRepository)
        const updatedAdminPassword = await updateAdminsPasswordUseCase.execute(adminData, adminID)

        ///
        const updatedAdminPasswordIsValid = await ErrorValidation(updatedAdminPassword)

        if (updatedAdminPasswordIsValid.isValid === false) {
            return res.status(updatedAdminPasswordIsValid.statusCode).json({
                errorMessage: updatedAdminPasswordIsValid.errorMessage
            })
        }

        return res.status(202).json({
            updatedAdminPassword
        })

    }
}

export { UpdateAdminsPasswordController, UpdateAdminPasswordRequestProps }