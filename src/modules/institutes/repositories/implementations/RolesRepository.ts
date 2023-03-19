import { prisma } from "../../../../prisma";
import { Roles } from "../../entities/Roles";

import {IRolesRepository,
        IUpdateRoleDTO,
        RolesUseCaseProps 
} from "../IRolesRepository";




class RolesRepository implements IRolesRepository {
    
    private roles: Roles[]
    constructor() {
        this.roles = []
    }

    // Lista todas as Roles sem filtragem
    async listAll(): Promise<Roles[]> {
        // Função do prisma para buscar todos os registros
        const roles = await prisma.roles.findMany()
        return roles
    }


    // Procura uma role com o mesmo título informado, retorna verdadeiro (se existe) ou falso (se não existe)
    async findByTitle(title: Roles['title']): Promise<Boolean> {

        const filteredRole = await prisma.roles.findMany({
            where: {
                title:title
            }
        })

        if (filteredRole.length > 0) {
            return true
        } else {
            return false
        }
    }


    // Cria uma role a partir de um título
    async createRole(title: Roles['title']): Promise<Roles> {
        const user = await prisma.roles.create({data:{title}})
        return user
    }


    // Procura uma role com o mesmo ID informado, retorna verdadeiro (se existe) ou falso (se não existe)
    async findByID(id: string): Promise<RolesUseCaseProps> {

        try {

            const filteredRole = await prisma.roles.findUnique({
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

    // Atualiza uma role de acordo com o título e o ID fornecido
    async updateRole({id, title}:IUpdateRoleDTO): Promise<RolesUseCaseProps> {
        const user = await prisma.roles.update({
            data:{
                title
            },
            where: {
                id: id
            }
        })
        return user
    }

    // Atualiza uma role de acordo com o título e o ID fornecido
    async deleteRole(id:Roles["id"]) {
        try {
            await prisma.roles.delete({
                where: {
                    id: id
                }
            })
            return {successMessage: true}
        } catch (err:any) {
            return {errorMessage: err.meta.message}
        }
    }
    
}

export {RolesRepository}