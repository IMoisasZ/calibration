import EquipmentTypeService from '../services/equipment_type.service.js'

const routeName = '/equipment_type'

async function createEquipmentType(req, res, next) {
	try {
		const equipmentType = req.body
		const newEquipmentType = await EquipmentTypeService.createEquipmentType(
			equipmentType
		)
		console.log(newEquipmentType)

		res.status(201).send(newEquipmentType)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			equipmentType
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		console.log({ error })

		next(error)
	}
}

async function updateEquipmentType(req, res, next) {
	try {
		const { id } = req.params
		const equipmentType = req.body
		const equipmentTypeUpdate = await EquipmentTypeService.updateEquipmentType(
			id,
			equipmentType
		)
		res.status(200).send(equipmentTypeUpdate)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			equipmentType
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllEquipmentType(req, res, next) {
	try {
		const { status } = req.query
		const equipmentType = await EquipmentTypeService.getAllEquipmentType(status)
		res.status(200).send(equipmentType)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getEquipmentType(req, res, next) {
	try {
		const { id } = req.params
		const equipmentType = await EquipmentTypeService.getEquipmentType(id)
		res.status(200).send(equipmentType)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateEquipmentTypeStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const equipmentType = await EquipmentTypeService.updateEquipmentTypeStatus(
			id,
			active
		)
		res.status(200).send(equipmentType)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? `Equipment enabled` : `Equipment disabled`
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	getEquipmentType,
	updateEquipmentTypeStatus,
}
