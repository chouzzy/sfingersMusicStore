import { inject, injectable } from "tsyringe";
import { Companies } from "../../entities/Companies";
import { Customers } from "../../entities/Customers";
import { CompaniesUseCaseProps, ICompaniesRepository } from "../../repositories/ICompaniesRepository";

interface IRequest {
    name: Customers["name"]
    teams?:Array<string>
}

class CreateCompaniesUseCase {
    constructor(
        private companiesRepository: ICompaniesRepository ) {}

    async execute({name}: IRequest): Promise<CompaniesUseCaseProps> {

        // Checa se os atributos obrigatórios foram enviados
        if (name.length < 3) {
            return {
                errorMessage:`⛔ Company name must be at least 3 letters⛔`,
                status:403
            }
        }

        // Testa se o existe o Title da Company no banco de dados
        const roleTitleAlreadyExists = await this.companiesRepository.findByName(name)
        if (roleTitleAlreadyExists===true) {
            return {errorMessage:`⛔ This role title already exists ⛔`, status:403}
        }

        const companies = await this.companiesRepository.createCompany(name)

        return companies
    }
}

export {CreateCompaniesUseCase}