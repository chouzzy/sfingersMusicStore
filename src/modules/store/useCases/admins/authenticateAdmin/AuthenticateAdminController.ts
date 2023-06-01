import { Request, Response } from "express"
import { Admins } from "../../../entities/Admins"
import { ErrorValidation } from "./AuthenticateAdminCheck"
import { AuthenticateAdminUseCase } from "./AuthenticateAdminUseCase"
import { AdminsRepository } from "../../../repositories/implementations/AdminsRepository"

interface AuthenticateAdminRequestProps {
    username: Admins["username"],
    password: Admins["password"],
}

class AuthenticateAdminController {
    async handle(req: Request, res: Response): Promise<Response> {

        const adminData: AuthenticateAdminRequestProps = req.body


        /// instanciação da classe do caso de uso
        const adminsRepository = new AdminsRepository()
        const createAdminUseCase = new AuthenticateAdminUseCase(adminsRepository)
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

export { AuthenticateAdminController, AuthenticateAdminRequestProps }