import { Companies } from "../../entities/Companies";

import { ICompaniesRepository, 
         CompaniesUseCaseProps 
} from "../../repositories/ICompaniesRepository";


class DeleteCompaniesUseCase {
    constructor(
        private companiesRepository: ICompaniesRepository ) {}

    async execute(id:Companies["id"]): Promise<CompaniesUseCaseProps> {

        
        const companyResponse = await this.companiesRepository.findByID(id);

        // Testa se o ID fornecido está nos padrões do Prisma (vai retornar um erro do prisma caso contrário)
        if (companyResponse.errorMessage) {
            return {errorMessage: companyResponse.errorMessage}
        }

        // Testa se o existe o ID da Company no banco de dados
        if (companyResponse.isEmpty===true)  {
            return {errorMessage: `⛔ This company doesn't exist ⛔`}
        }

        // Testa se o existe o nome da Company no banco de dados

        const companies = await this.companiesRepository.deleteCompany(id)
        return companies
    }
}

export {DeleteCompaniesUseCase}