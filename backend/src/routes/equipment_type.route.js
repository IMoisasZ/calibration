import { Router } from 'express'
import EquipmentTypeController from '../controllers/equipment_type.controller.js'
import {
	createEquipmentTypeValidator,
	updateEquipmentTypeValidator,
	getAllEquipmentTypeValidator,
	getEquipmentTypeValidator,
	updateEquipmentTypeStatusValidator,
} from '../middlewares/equipment_type.middleware.js'

const route = Router()

route.post(
	'/',
	createEquipmentTypeValidator,
	EquipmentTypeController.createEquipmentType
)
route.put(
	'/:id',
	updateEquipmentTypeValidator,
	EquipmentTypeController.updateEquipmentType
)
route.get(
	'/',
	getAllEquipmentTypeValidator,
	EquipmentTypeController.getAllEquipmentType
)
route.get(
	'/:id',
	getEquipmentTypeValidator,
	EquipmentTypeController.getEquipmentType
)
route.patch(
	'/:id',
	updateEquipmentTypeStatusValidator,
	EquipmentTypeController.updateEquipmentTypeStatus
)

export default route
