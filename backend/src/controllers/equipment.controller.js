import EquipmentService from '../services/equipment.service.js'

const routeName = '/equipment'

async function createEquipment(req, res, next) {
	try {
		const equipment = req.body
		const newEquipment = await EquipmentService.createEquipment(equipment)
		res.status(201).send(newEquipment)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			equipment?.identifier
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateEquipment(req, res, next) {
	try {
		const { id } = req.params
		const equipment = req.body
		const equipmentDataToUpdate = await EquipmentService.updateEquipment(
			id,
			equipment
		)
		res.status(200).send(equipmentDataToUpdate)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			equipment?.identifier
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllEquipment(req, res, next) {
	try {
		const { status } = req.query
		const equipment = await EquipmentService.getAllEquipment(status)
		res.status(200).send(equipment)
		const loggerMessage = `GET - ${routeName}?status=${status} - ${
			status !== 'true' ? 'Show all equipment!' : 'Show just equipment enabled!'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getEquipment(req, res, next) {
	try {
		const { id } = req.params
		const equipment = await EquipmentService.getEquipment(id)
		res.status(200).send(equipment)
		const loggerMessage = `GET - ${routeName}/${id} - ${JSON.stringify(
			equipment?.identifier
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getEquipmentByIdentifier(req, res, next) {
	try {
		const { identifier } = req.params
		const equipment = await EquipmentService.getEquipmentByIdentifier(
			identifier
		)
		res.status(200).send(equipment)
		const loggerMessage = `GET - ${routeName}/${identifier} - ${JSON.stringify(
			equipment?.description
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateEquipmentStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const equipment = await EquipmentService.updateEquipmentStatus(id, active)
		res.status(200).send(equipment)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? 'Equipment enabled!' : 'Equipment disabled!'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
