import { Companies } from "@prisma/client"

interface IUpdateCompanyDTO {
    id: Companies["id"]
    name: Companies["name"]
}

interface CompaniesProps extends Array<Companies> {}
interface CompaniesUseCaseProps extends Partial<CompaniesProps> {
    status?: number
    errorMessage?: string
    success?: boolean
    isEmpty?: boolean
}

interface ICompaniesRepository {
    listAll(): Promise<Companies[]>
    
    createCompany(name:Companies["name"]): Promise<Companies>
    
    findByName(name:Companies["name"]): Promise<Boolean>
    
    findByID(id:Companies["id"]): Promise<CompaniesUseCaseProps>

    updateCompany({id, name}:IUpdateCompanyDTO): Promise<Companies>
    
    deleteCompany(id:Companies["id"]): Promise<CompaniesUseCaseProps>
}

export {CompaniesUseCaseProps, ICompaniesRepository, IUpdateCompanyDTO}