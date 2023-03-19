import { Request, Response } from "express"
import { Admins } from "../../entities/Admins"
import { checkBody, ErrorValidation } from "./CreateAdminCheck"
import { CreateAdminUseCase } from "./CreateAdminUseCase"
import { AdminsRepository } from "../../repositories/implementations/AdminsRepository"

interface CreateAdminRequestProps {

    name: Admins["name"],
    email: Admins["email"],
    username: Admins["username"],
    password: Admins["password"],
}

class CreateAdminsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const adminData: CreateAdminRequestProps = req.body

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(adminData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const adminsRepository = new AdminsRepository()
        const createAdminUseCase = new CreateAdminUseCase(adminsRepository)
        const createdAdmin = await createAdminUseCase.execute(adminData)

        ///
        const createdAdminIsValid = await ErrorValidation(createdAdmin)

        if (createdAdminIsValid.isValid === false) {
            return res.status(createdAdminIsValid.statusCode).json({
                errorMessage: createdAdminIsValid.errorMessage
            })
        }

        return res.status(202).json({
            createdAdmin
        })

    }
}

export { CreateAdminsController, CreateAdminRequestProps }