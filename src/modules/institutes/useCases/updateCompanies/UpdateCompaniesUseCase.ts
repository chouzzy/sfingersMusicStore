import { Companies } from "../../entities/Companies";
import { CompaniesUseCaseProps, ICompaniesRepository } from "../../repositories/ICompaniesRepository";

interface IRequest {
    name: Companies["name"]
    id: Companies["id"]
}

class UpdateCompaniesUseCase {
    constructor(
        private companiesRepository: ICompaniesRepository ) {}

    async execute({id, name}: IRequest): Promise<CompaniesUseCaseProps> {

        if (name.length < 3) {
            return {
                errorMessage:`⛔ Company name must be at least 3 letters⛔`,
                status:403
            }
        }
        
        const companyResponse = await this.companiesRepository.findByID(id);
        // Testa se o ID fornecido está nos padrões do Prisma (vai retornar um erro do prisma caso contrário)
        if (companyResponse.errorMessage) {
            return {errorMessage: companyResponse.errorMessage, status:500}
        }

        // Testa se o existe o ID da Company no banco de dados
        if (companyResponse.isEmpty===true)  {
            return {errorMessage: `⛔ This company doesn't exist ⛔`, status:403}
        }

        // Testa se o existe o Name da Company no banco de dados
        const companyNameAlreadyExists = await this.companiesRepository.findByName(name)
        if (companyNameAlreadyExists===true) {
            return {errorMessage:`⛔ This company name already exists ⛔`, status:403}
        }

        const companies = await this.companiesRepository.updateCompany({id, name})
        return companies
    }
}

export {UpdateCompaniesUseCase}