import { Router } from "express"
import { CreateCompaniesController } from "../modules/institutes/useCases/createCompanies/CreateCompaniesController"
import { DeleteCompaniesController } from "../modules/institutes/useCases/deleteCompanies/DeleteCompaniesController"
import { ListCompaniesController } from "../modules/institutes/useCases/listCompanies/ListCompaniesController"
import { UpdateCompaniesController } from "../modules/institutes/useCases/updateCompanies/UpdateCompaniesController"


const companiesRoutes = Router()


const listCompaniesController = new ListCompaniesController()
companiesRoutes.get('/', listCompaniesController.handle)

const createCompaniesController = new CreateCompaniesController()
companiesRoutes.post('/create', createCompaniesController.handle)

const updateCompaniesController = new UpdateCompaniesController()
companiesRoutes.put('/:id/update', updateCompaniesController.handle)

const deleteCompaniesController = new DeleteCompaniesController()
companiesRoutes.delete('/:id/delete', deleteCompaniesController.handle)

// routes.use(auth)
// routes.use(validateAdmin)

// const listCompaniesController = new ListCompaniesController()
// companiesRoutes.get('/', listCompaniesController.handle)
// routes.post('/create', createValidator, RoleController.store)
// routes.put('/:id/update', updateValidator, RoleController.update)
// routes.delete('/:id/delete', RoleController.delete)

export {companiesRoutes}