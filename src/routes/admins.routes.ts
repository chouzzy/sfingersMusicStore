import { Router } from "express"
import { AuthenticateAdminController } from "../modules/store/useCases/admins/authenticateAdmin/AuthenticateAdminController"
import { CreateAdminController } from "../modules/store/useCases/admins/createAdmin/CreateAdminController"

const adminsRoutes = Router()

const authenticateAdminController = new AuthenticateAdminController()
adminsRoutes.post('/login', authenticateAdminController.handle)

const createAdminController = new CreateAdminController()
adminsRoutes.post('/create', createAdminController.handle)

export {adminsRoutes}