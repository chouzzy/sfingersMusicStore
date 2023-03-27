import { Router } from "express"
import { CreateAdminsController } from "../modules/registrations/useCases/createAdmins/CreateAdminController"
import { DeleteAdminController } from "../modules/registrations/useCases/deleteAdmins/DeleteAdminController"
import { ListAdminsController } from "../modules/registrations/useCases/listAdmins/ListAdminsController"
import { UpdateAdminsController } from "../modules/registrations/useCases/updateAdmins/UpdateAdminsController"
import { UpdateAdminsPasswordController } from "../modules/registrations/useCases/updateAdminsPassword/UpdateAdminsPasswordController"

const adminsRoutes = Router()

const listAdminsController = new ListAdminsController()
adminsRoutes.get('/', listAdminsController.handle)

const createAdminsController = new CreateAdminsController()
adminsRoutes.post('/create', createAdminsController.handle)

const updateAdminsController = new UpdateAdminsController()
adminsRoutes.put('/:adminID/update', updateAdminsController.handle)

const updateAdminsPasswordController = new UpdateAdminsPasswordController()
adminsRoutes.put('/:adminID/updatePassword', updateAdminsPasswordController.handle)

const deleteAdminsController = new DeleteAdminController()
adminsRoutes.delete('/:adminID/delete', deleteAdminsController.handle)


export {adminsRoutes}