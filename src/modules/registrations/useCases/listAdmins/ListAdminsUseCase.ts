import { IAdminsRepository } from "../../repositories/IAdminsRepository"
import { ListAdminsQuery } from "./ListAdminsController"
import { validationResponse } from "../../../../types"
import { Admins } from "../../entities/Admins"
//////

class ListAdminsUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) { }

    async execute(query: ListAdminsQuery): Promise<Admins[] | validationResponse> {

        let {
            id,
            name,
            email,
            username,
            page
        } = query

        let actualPage = Number(page)

        if (page == undefined) { actualPage = 0}


        const admins = await this.adminsRepository.filterAdmins(
            id,
            name,
            email,
            username,
            actualPage
        )
        
        return admins
    }
}

export { ListAdminsUseCase }
