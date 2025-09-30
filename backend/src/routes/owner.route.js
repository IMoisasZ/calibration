import { Router } from 'express'
import OwnerController from '../controllers/owner.controller.js'
import {
	createOwnerValidator,
	updateOwnerValidator,
	getAllOwnerValidator,
	getOwnerValidator,
	updateOwnerStatusValidator,
} from '../middlewares/owner.middleware.js'
const route = Router()

route.post('/', createOwnerValidator, OwnerController.createOwner)
route.put('/:id', updateOwnerValidator, OwnerController.updateOwner)
route.get('/', getAllOwnerValidator, OwnerController.getAllOwner)
route.get('/:id', getOwnerValidator, OwnerController.getOwner)
route.patch(
	'/:id',
	updateOwnerStatusValidator,
	OwnerController.updateOwnerStatus
)

export default route
