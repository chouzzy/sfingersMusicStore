import { Router } from "express"
import { CreateRolesController } from "../modules/institutes/useCases/createRoles/CreateRolesController"
import { DeleteRolesController } from "../modules/institutes/useCases/deleteRoles/DeleteRolesController"
import { ListRolesController } from "../modules/institutes/useCases/listRoles/ListRolesController"
import { UpdateRolesController } from "../modules/institutes/useCases/updateRoles/UpdateRolesController"


const rolesRoutes = Router()


const listRolesController = new ListRolesController()
rolesRoutes.get('/', listRolesController.handle)

const createRolesController = new CreateRolesController()
rolesRoutes.post('/create', createRolesController.handle)

const updateRolesController = new UpdateRolesController()
rolesRoutes.put('/:id/update', updateRolesController.handle)

const deleteRolesController = new DeleteRolesController()
rolesRoutes.delete('/:id/delete', deleteRolesController.handle)

// routes.use(auth)
// routes.use(validateAdmin)

// const listRolesController = new ListRolesController()
// rolesRoutes.get('/', listRolesController.handle)
// routes.post('/create', createValidator, RoleController.store)
// routes.put('/:id/update', updateValidator, RoleController.update)
// routes.delete('/:id/delete', RoleController.delete)

export {rolesRoutes}