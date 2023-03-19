import { Router } from "express"
import { CreateCustomersController } from "../modules/institutes/useCases/createCustomers/CreateCustomersController"
import { DeleteCustomerTeamsController } from "../modules/institutes/useCases/deleteCustomerTeams/DeleteCustomerTeamsController"
import { ListCustomersController } from "../modules/institutes/useCases/listCustomers/ListCustomersController"
import { UpdateCustomersController } from "../modules/institutes/useCases/updateCustomers/UpdateCustomersController"
import { UpdateCustomerTeamsController} from "../modules/institutes/useCases/updateCustomerTeams/UpdateCustomerTeamsController"

const customersRoutes = Router()

const listCustomersController = new ListCustomersController()
customersRoutes.get('/:id', listCustomersController.handle)

const createCustomersController = new CreateCustomersController()
customersRoutes.post('/:id/create', createCustomersController.handle)

const updateCustomersController = new UpdateCustomersController()
customersRoutes.put('/:id/:customerId/update', updateCustomersController.handle)

const updateCustomerTeamsController = new UpdateCustomerTeamsController()
customersRoutes.put('/:id/:customerId/teams/add', updateCustomerTeamsController.handle)

const deleteCustomerTeamsController = new DeleteCustomerTeamsController()
customersRoutes.put('/:id/:customerId/teams/remove', deleteCustomerTeamsController.handle)


export {customersRoutes}