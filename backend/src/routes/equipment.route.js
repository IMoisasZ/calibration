import { Router } from 'express'
import EquipmentController from '../controllers/equipment.controller.js'
import {
	createEquipmentValidator,
	updateEquipmentValidator,
	getAllEquipmentValidator,
	getEquipmentValidator,
	getEquipmentByIdentifierValidator,
	updateEquipmentStatus,
} from '../middlewares/equipment.middleware.js'

const route = Router()

route.post('/', createEquipmentValidator, EquipmentController.createEquipment)
route.put('/:id', updateEquipmentValidator, EquipmentController.updateEquipment)
route.get('/', getAllEquipmentValidator, EquipmentController.getAllEquipment)
route.get('/:id', getEquipmentValidator, EquipmentController.getEquipment)
route.get(
	'/by-identifier/:identifier',
	getEquipmentByIdentifierValidator,
	EquipmentController.getEquipmentByIdentifier
)
route.patch(
	'/:id',
	updateEquipmentStatus,
	EquipmentController.updateEquipmentStatus
)

export default route
