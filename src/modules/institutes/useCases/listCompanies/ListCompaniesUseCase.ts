import { inject, injectable } from "tsyringe";
import { Companies } from "../../entities/Companies";
import { CompaniesUseCaseProps, 
         ICompaniesRepository 
} from "../../repositories/ICompaniesRepository";

class ListCompaniesUseCase {
    constructor(
        private companiesRepository: ICompaniesRepository ) {}

    async execute(): Promise<CompaniesUseCaseProps> {
        const companies = await this.companiesRepository.listAll()

        return companies
    }
}

export {ListCompaniesUseCase}