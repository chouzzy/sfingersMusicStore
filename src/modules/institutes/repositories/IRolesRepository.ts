import { Roles } from "../entities/Roles"

interface RolesProps extends Array<Roles> {}
interface RolesUseCaseProps extends Partial<RolesProps> {
    status?: number
    errorMessage?: string
    isEmpty?: boolean
}

interface IUpdateRoleDTO {
    id: Roles["id"]
    title: Roles["title"]
}

interface IRolesRepository {
    listAll(): Promise<Roles[]>
    
    findByTitle(title: Roles['title']): Promise<Boolean>
    
    findByID(id: Roles["id"]): Promise<RolesUseCaseProps>

    createRole(title: Roles['title']): Promise<Roles>
    
    updateRole({id, title}:IUpdateRoleDTO): Promise<RolesUseCaseProps>
    
    deleteRole(id:Roles["id"]): Promise<RolesUseCaseProps>
}

export {RolesUseCaseProps, IRolesRepository, IUpdateRoleDTO}