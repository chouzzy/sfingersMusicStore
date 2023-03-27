import { Request, Response } from "express"
import { checkBody, ErrorValidation } from "./UpdateAdminsCheck"
import { AdminsRepository } from "../../repositories/implementations/ClientsRepository"
import { Admins } from "../../entities/Clients"
import { UpdateAdminsUseCase } from "./UpdateAdminsUseCase"

interface UpdateAdminRequestProps {

    name: Admins["name"],
    email: Admins["email"],
    username: Admins["username"]
}

class UpdateAdminsController {

    async handle(req: Request, res: Response): Promise<Response> {

        const adminData: UpdateAdminRequestProps = req.body
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
        const updateAdminsUseCase = new UpdateAdminsUseCase(adminsRepository)
        const updatedAdmin = await updateAdminsUseCase.execute(adminData, adminID)

        ///
        const updatedAdminIsValid = await ErrorValidation(updatedAdmin)

        if (updatedAdminIsValid.isValid === false) {
            return res.status(updatedAdminIsValid.statusCode).json({
                errorMessage: updatedAdminIsValid.errorMessage
            })
        }

        return res.status(202).json({
            updatedAdmin
        })

    }
}

export { UpdateAdminsController, UpdateAdminRequestProps }