import { prisma } from "../../../../prisma";
import { Companies } from "../../entities/Companies";

import { CompaniesUseCaseProps,
         ICompaniesRepository,
         IUpdateCompanyDTO 
} from "../ICompaniesRepository";

class CompaniesRepository implements ICompaniesRepository {
    
    private companies: Companies[]
    constructor() {
        this.companies = []
    }

    // Lista todas as Companies sem filtragem
    async listAll(): Promise<Companies[]> {
        // Função do prisma para buscar todos os registros
        const companies = await prisma.companies.findMany()
        return companies
    }

    // Cria uma company a partir de um título
    async createCompany(name:Companies["name"]): Promise<Companies> {
        const user = await prisma.companies.create({data:{name}})
        return user
    }

    // Procura uma company com o mesmo título informado, retorna verdadeiro (se existe) ou falso (se não existe)
    async findByName(name:Companies["name"]): Promise<Boolean> {

        const filteredRole = await prisma.companies.findMany({
            where: {
                name:name
            }
        })
        if (filteredRole.length > 0) {
            return true
        } else {
            return false
        }
    }

    // Procura uma company com o mesmo ID informado, retorna verdadeiro (se existe) ou falso (se não existe)
    async findByID(id: Companies['id']): Promise<CompaniesUseCaseProps> {

        try {

            const filteredRole = await prisma.companies.findUnique({
                where: {
                    id:id
                }
            })
            
            if (filteredRole != null) {
                return {...filteredRole, isEmpty: false}
            } else {
                return {isEmpty: true}
            }
        } catch (err:any) {
            return {errorMessage: err.meta.message}
        }
    }

    // Atualiza uma company de acordo com o título e o ID fornecido
    async updateCompany({id, name}:IUpdateCompanyDTO): Promise<Companies> {
        const user = await prisma.companies.update({
            data:{
                name
            },
            where: {
                id: id
            }
        })
        return user
    }

    // Atualiza uma company de acordo com o título e o ID fornecido
    async deleteCompany(id:Companies["id"]): Promise<CompaniesUseCaseProps> {
        try {
            await prisma.companies.delete({
                where: {
                    id: id
                }
            })
            return {success: true}
        } catch (err:any) {
            return {errorMessage: err.meta.message}
        }
    }
    
}

export {CompaniesRepository}