import { Request, Response } from "express"
import { Admins } from "../../entities/Clients"
import { AdminsRepository } from "../../repositories/implementations/ClientsRepository"
import { ErrorValidation } from "./DeleteAdminCheck"
import { DeleteAdminUseCase } from "./DeleteAdminUseCase"

class DeleteAdminController {
    async handle(req: Request, res: Response): Promise<Response> {

        const adminID:Admins["id"] = req.params.adminID

        const adminsRepository = new AdminsRepository()
        const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository)
        const deletedAdmin = await deleteAdminUseCase.execute(adminID)

        const deletedAdminIsValid = await ErrorValidation(deletedAdmin)

        if (deletedAdminIsValid.isValid === false) {
            return res.status(deletedAdminIsValid.statusCode).json({
                errorMessage: deletedAdminIsValid.errorMessage
            })
        }

        return res.status(202).json({
            deletedAdmin
        })

    }
}

export {DeleteAdminController}