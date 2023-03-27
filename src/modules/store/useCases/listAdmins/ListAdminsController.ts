import { Request, Response } from "express";
import { Admins } from "../../entities/Clients";
import { AdminsRepository} from "../../repositories/implementations/ClientsRepository";
import { checkQuery, ErrorValidation } from "./ListAdminsCheck";
import { ListAdminsUseCase } from "./ListAdminsUseCase";

interface ListAdminsQuery {
    id?: Admins["id"],
    name?: Admins["name"],
    email?: Admins["email"],
    username?: Admins["username"],
    password?: Admins["password"],
    page?: string
}

class ListAdminsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const query: ListAdminsQuery = req.query

        const queryValidation = await checkQuery(query)

        if (queryValidation.isValid === false) {
            return res.status(queryValidation.statusCode).json({
                errorMessage: queryValidation.errorMessage
            })
        }

        // Instanciando o useCase no repositório com as funções
        const adminsRepository = new AdminsRepository()

        const listAdminsUseCase = new ListAdminsUseCase(adminsRepository);

        const admins = await listAdminsUseCase.execute(query)
        
        const adminsAreValid = await ErrorValidation(admins)
        
        if (adminsAreValid.isValid === false) {
            return res.status(adminsAreValid.statusCode).json({
                errorMessage: adminsAreValid.errorMessage
            })
        }

        return res.status(202).json({
            admins
        })

    }
}

export { ListAdminsController, ListAdminsQuery }